#!/usr/bin/env node
import yargs from 'yargs'
import fs from 'fs'
import path from 'path'
import { exec } from 'child_process'
import getPackages from './lib/getPackages.mjs'

export const bumpVersion = (version, versionType) => {
  const _version = version.split('.').map((v) => parseInt(v))

  if (versionType === 'patch') {
    _version[2]++
  } else if (versionType === 'minor') {
    _version[2] = 0
    _version[1]++
  } else if (versionType === 'major') {
    _version[2] = 0
    _version[1] = 0
    _version[0]++
  }

  return _version.join('.')
}

export const bumpPackage = (packageName, version) =>
  new Promise((res, rej) => {
    const bump = `yarn yarn-bump --dir ./ --package ${packageName} -v ${version}`

    console.log(`*** Bump packages "${packageName}" to version "${version}" ***`)
    exec(bump, (error, stdout, stderr) => {
      if (error) {
        console.error(`*** FAIL => Bump packages "${packageName}" to version "${version}" ***`)
        console.error(error.message)
        rej(error)
        return
      }
      res(stdout)
    })
  })

const bumpPackages = async (packages, version) => {
  const len = packages.length

  for (let i = 0; i < len; i++) {
    await bumpPackage(packages[i].name, version)
  }
}

const getStagedFiles = () =>
  new Promise((res, rej) => {
    exec('git diff --cached --name-only', (error, stdout, stderr) => {
      if (error) {
        console.error(error)
        rej(error)
        return
      }
      return res(stdout.split('\n').filter((f) => f.length > 0))
    })
  })

const getChangedFiles = () =>
  new Promise((res, rej) => {
    exec('git diff --name-only', (error, stdout, stderr) => {
      if (error) {
        console.error(error)
        rej(error)
        return
      }
      return res(stdout.split('\n').filter((f) => f.length > 0))
    })
  })

const check = async () => {
  const stagedFiles = await getStagedFiles()
  const changedFiles = await getChangedFiles()

  if ([...stagedFiles, ...changedFiles].find((f) => f.endsWith('package.json'))) {
    throw new Error(`Commit packages.json files before continue`)
  }
}

const commitChanges = (version, tagMessage) =>
  new Promise((res, rej) => {
    getChangedFiles()
      .then((changedFiles) => changedFiles.filter((f) => f.endsWith('package.json')))
      .then((changedFiles) => {
        if (changedFiles.length > 0) {
          const tagName = `v${version}`
          const commit = `git commit ${changedFiles.join(' ')} -m "${tagName}"`
          const tag = `git tag ${tagName} ${tagMessage ? '-m "' + tagMessage + '"' : ''}`
          const pushTag = `git push origin ${tagName}`
          const pushLastCommit = 'git push origin $(git branch --show-current)~0:$(git branch --show-current)'

          exec(`${commit} && ${tag} && ${pushTag} && ${pushLastCommit}`, (error, stdout, stderr) => {
            if (error) {
              console.error(error)
              rej(error)
              return
            }
            return res()
          })
        }
      })
      .catch(rej)
  })

const packageJsonPath = './package.json'
const main = async () => {
  if (!argv.argv.major && !argv.argv.minor && !argv.argv.patch) {
    argv.getHelp().then((msg) => {
      console.error('\nSelect one of --patch --major --minor \n')
      console.error(msg)
      process.exit(1)
    })
    return
  }
  await check()
  const packageJson = JSON.parse(fs.readFileSync(path.resolve(packageJsonPath)).toString())
  const packagesList = await getPackages()
  const versionType = argv.argv.major ? 'major' : argv.argv.minor ? 'minor' : 'patch'
  const newVersion = bumpVersion(packageJson.version, versionType)

  await bumpPackages(packagesList, newVersion)

  console.log(`*** Bump project to version "${newVersion}" ***`)
  packageJson.version = newVersion

  fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2))

  await commitChanges(newVersion, argv.argv.message)
}

const argv = yargs(process.argv.slice(2))
  .option('patch', {
    type: 'boolean',
  })
  .option('major', {
    type: 'boolean',
  })
  .option('minor', {
    type: 'boolean',
  })
  .option('message', {
    alias: 'm',
    type: 'string',
  })
  .conflicts({
    minor: ['major', 'patch'],
    major: ['minor', 'patch'],
    patch: ['major', 'minor'],
  })

main().catch((e) => {
  console.error('*****************   Fail   *****************')
  console.error(e)
  process.exit(1)
})

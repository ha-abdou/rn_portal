#!/usr/bin/env node
import yargs from 'yargs'
import { exec } from 'child_process'
import getPackages from './lib/getPackages.mjs'

const bump = (versionType) =>
  new Promise((res, rej) => {
    console.log('==>', `yarn bump --${versionType}`)
    exec(`yarn bump --${versionType}`, (error, stdout) => {
      if (error) {
        console.error(`*** FAIL => bump ***`)
        console.error(error.message)
        rej(error)
        return
      }
      res(stdout)
    })
  })
const publishPackage = (packageName) =>
  new Promise((res, rej) => {
    const publish = `yarn workspace ${packageName} publish --access public`

    console.log(`*** Publish package "${packageName}" ***`)
    exec(publish, (error, stdout) => {
      if (error) {
        console.error(`*** FAIL => Publish package "${packageName}" ***`)
        console.error(error.message)
        rej(error)
        return
      }
      res(stdout)
    })
  })
const publishPackages = async (packages) => {
  const len = packages.length

  for (let i = 0; i < len; i++) {
    await publishPackage(packages[i].name)
  }
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
  .conflicts({
    minor: ['major', 'patch'],
    major: ['minor', 'patch'],
    patch: ['major', 'minor'],
  })

const main = async () => {
  if (!argv.argv.major && !argv.argv.minor && !argv.argv.patch) {
    argv.getHelp().then((msg) => {
      console.error('\nSelect one of --patch --major --minor \n')
      console.error(msg)
      process.exit(1)
    })
    return
  }

  const versionType = argv.argv.major ? 'major' : argv.argv.minor ? 'minor' : 'patch'
  const packagesList = await getPackages()

  await bump(versionType)
  await publishPackages(packagesList)
}

main().catch((e) => {
  console.error('****  FAIL to deploy  ****')
  console.error(e)
  process.exit(1)
})

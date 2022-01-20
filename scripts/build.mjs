import { exec } from 'child_process'
import path from 'path'

const getPackages = () =>
  new Promise((res, rej) => {
    exec('yarn workspaces --silent info', (err, stdout) => {
      if (err) {
        rej(err)
        return
      }
      const workspacesInfo = JSON.parse(stdout)
      const packages = []

      for (const name in workspacesInfo) {
        if (!workspacesInfo[name].location.includes('/devtools/')) {
          packages.push({
            name,
            location: workspacesInfo[name].location,
            workspaceDependencies: workspacesInfo[name].workspaceDependencies,
          })
        }
      }
      res(packages)
    })
  })

const rootFolder = process.cwd()
const rollupConfigPath = path.resolve(rootFolder, 'rollup.config.js')
const packagesToBuild = process.argv.splice(2)

const main = async () => {
  try {
    const pkgList = await getPackages()

    packagesToBuild.map((p) => {
      if (!pkgList.find((r) => r.name === p)) {
        console.error(`Package "${p}" do not exist`)
        console.error(`Availible packages to build ${pkgList.map((p) => p.name).join(', ')}`)
        process.exit(1)
      }
    })

    packagesToBuild.map((p) => {
      pkgList.find((pkg) => {
        if (pkg.name === p) {
          const pkgPath = path.resolve(rootFolder, pkg.location)
          const rollup = `yarn rollup -c ${rollupConfigPath}`
          const ts = 'yarn tsc --emitDeclarationOnly --outDir dist --noEmit false --declaration true'

          exec(
            `rimraf dist && ${rollup} && ${ts}`,
            {
              cwd: pkgPath,
            },
            function (error, stdout) {
              if (error) {
                throw error
              }
              console.log(stdout)
            },
          )
          return true
        }
        return false
      })
    })
  } catch (e) {
    console.error('fail to build')
    console.error(e)
    process.exit(1)
  }
}

main()

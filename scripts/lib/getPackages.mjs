import { exec } from 'child_process'

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

export default getPackages

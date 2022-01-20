const { processJsonFile } = require('./util/json')
const logger = require('./util/logger')
const Workspace = require('./workspace')

const DEPENDENCY_TYPES = ['dependencies', 'devDependencies', 'peerDependencies', 'optionalDependencies']

function replaceVersion(depName, newVersion, json) {
  for (type of DEPENDENCY_TYPES) {
    if (json[type] && json[type][depName]) {
      logger.debug(`setting ${depName} to ${newVersion} in ${json.name}'s ${type}`)
      json[type][depName] = newVersion
    }
  }
  return json
}

async function bumpVersion(depName, newVersion, dir) {
  const workspace = new Workspace(dir)
  const workspaceStart = await workspace.workspaceSnapshot

  // Find the dependent packages
  const dependents = Object.keys(workspaceStart.packages).filter((key) => {
    const deps = workspaceStart.packages[key]['workspaceDependencies']
    return deps.indexOf(depName) > -1
  })

  const depPkg = workspaceStart.packageFilepath(depName)
  // Bump the version of the package itself.
  processJsonFile(depPkg, (pkg) => {
    pkg.version = newVersion
    return pkg
  })

  // Bump the dependent versions
  const processing = []
  for (secondName of dependents) {
    const secondPkg = workspaceStart.packageFilepath(secondName)
    processing.push(processJsonFile(secondPkg, (json) => replaceVersion(depName, newVersion, json)))
  }

  await Promise.all(processing)
  return await workspace.workspaceSnapshot
}

exports.bumpVersion = bumpVersion

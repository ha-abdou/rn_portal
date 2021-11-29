const getWorkspaces = require('get-yarn-workspaces')
const path = require('path')

function getConfig(appDir, options = {}) {
  const workspaces = getWorkspaces(appDir)

  const watchFolders = [
    path.resolve(appDir, '../../..', 'node_modules'),
    ...workspaces.filter((workspaceDir) => !(workspaceDir === appDir)),
  ]

  return {
    watchFolders,
    transformer: {
      experimentalImportSupport: false,
      inlineRequires: true,
    },
    resolver: {
      extraNodeModules: {
        'react-native': path.resolve(appDir, 'node_modules', 'react-native'),
        react: path.resolve(appDir, 'node_modules', 'react'),
      },
    },
  }
}

module.exports = getConfig(__dirname)

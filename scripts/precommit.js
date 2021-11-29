/* eslint-disable @typescript-eslint/no-var-requires */
const { execSync } = require('child_process')
const path = require('path')

const stagedFilesString = execSync('git diff --name-only --cached').toString()
const stagedFilesList = stagedFilesString.trim().split('\n')
const hasTsFile = !!stagedFilesList.find((file) => file.endsWith('.ts') || file.endsWith('.tsx'))

if (hasTsFile) {
  try {
    execSync('yarn ts:check', {
      cwd: path.resolve(),
      stdio: 'inherit',
    })
    process.exit(0)
  } catch (e) {
    console.log('tsc failed')
    process.exit(1)
  }
}

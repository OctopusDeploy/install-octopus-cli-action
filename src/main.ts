import {addPath, debug, getInput, setFailed} from '@actions/core'
import {dirname} from 'path'
import {installOctopusCli} from './octopus-cli'

async function run(): Promise<void> {
  try {
    var version = getInput('version') || '*'
    if (version === 'latest') {
      version = '*'
    }
    const octopusCli = await installOctopusCli(version)
    const octopusCliDir = dirname(octopusCli)
    addPath(octopusCliDir)
    debug(`Added ${octopusCliDir} to PATH`)
  } catch (e: unknown) {
    if (e instanceof Error) {
      setFailed(e)
    }
  }
}

run()
  .then()
  .catch(e => {
    if (e instanceof Error) {
      setFailed(e)
    }
  })

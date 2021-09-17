import {addPath, debug, getInput, setFailed} from '@actions/core'
import {dirname} from 'path'
import {installOctopusCli} from './octopus-cli'

async function run(): Promise<void> {
  try {
    const version = getInput('version') || 'latest'
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

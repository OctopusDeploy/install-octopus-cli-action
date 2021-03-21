import * as core from '@actions/core'
import {dirname} from 'path'
import * as installer from './octopus-cli'

async function run(): Promise<void> {
  try {
    const version = core.getInput('version') || 'latest'
    const octopusCli = await installer.installOctopusCli(version)
    const octopusCliDir = dirname(octopusCli)
    core.addPath(octopusCliDir)
    core.debug(`Added ${octopusCliDir} to PATH`)
  } catch (error) {
    core.setFailed(error.message)
  }
}

run()

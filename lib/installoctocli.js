const os = require('os')
const core = require('@actions/core')
const downloadCache = require('@actions/tool-cache')

function downloadOctopus(version) {
    const osDownload = new Map()
    osDownload.set('linux', `https://download.octopusdeploy.com/octopus-tools/${ version }/OctopusTools.${ version }.linux-x64.tar.gz`)
    osDownload.set(`windows`, `https://download.octopusdeploy.com/octopus-tools/${ version }/OctopusTools.${ version }.win-x64.zip`)
    osDownload.set(`darwin`, `https://download.octopusdeploy.com/octopus-tools/${ version }/OctopusTools.${ version }.osx-x64.tar.gz`)

    return osDownload.get(os.platform())
}

async function installOctopus(version) {
    const URL = downloadOctopus(version)
    core.debug('Retrieving ${version}')

    const path = await downloadCache.downloadTool(URL)

    let extractDirectory
    
    if (URL.endsWith('.zip')) {
        extractDirectory = await downloadCache.extractZip(path)
        core.debug('Downloading Octopus CLI version ${version}')
    } else if (URL.endsWith('.gz')) {
        core.debug('Downloading Octopus CLI version ${version}')
        extractDirectory = await downloadCache.extractTar(path)
    }

    core.addPath(extractDirectory)
}

module.exports = installOctopus
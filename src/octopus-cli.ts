import * as os from 'os'
import * as path from 'path'
import {Downloads} from './download'
import * as core from '@actions/core'
import * as tc from '@actions/tool-cache'
import * as httpm from '@actions/http-client'

const osPlatform: string = os.platform()
const platform: string =
  osPlatform === 'win32' ? 'win' : osPlatform === 'darwin' ? 'osx' : 'linux'
const ext: string = osPlatform === 'win32' ? 'zip' : 'tar.gz'
const octopusTools = `https://download.octopusdeploy.com/octopus-tools`
const latestUrl = `${octopusTools}/latest.json`
const http: httpm.HttpClient = new httpm.HttpClient(
  'action-install-octopus-cli',
  undefined,
  {
    keepAlive: false
  }
)

interface OctopusCliDownload {
  version: string
  url: string
}

const getLatest = async (): Promise<Downloads | null> => {
  return (await http.getJson<Downloads>(latestUrl)).result
}

const getDownloadUrl = async (version: string): Promise<OctopusCliDownload> => {
  let versionToDownload: string = version
  if (version === 'latest') {
    try {
      const downloads: Downloads | null = await getLatest()
      if (downloads !== null) {
        versionToDownload = downloads.latest
      }
    } catch (error) {
      core.setFailed(error)
    }
  }

  const downloadUrl = `${octopusTools}/${versionToDownload}/OctopusTools.${versionToDownload}.${platform}-x64.${ext}`

  const statusCode = (await http.head(downloadUrl)).message.statusCode
  if (statusCode !== 200) {
    core.setFailed(`✕ Octopus CLI version not found: ${versionToDownload}`)
    throw new Error(`Octopus CLI version not found: ${versionToDownload}`)
  }

  core.info(`✓ Octopus CLI version found: ${versionToDownload}`)
  return {version: versionToDownload, url: downloadUrl}
}

export async function installOctopusCli(version: string): Promise<string> {
  const octopusCliDownload = await getDownloadUrl(version)

  core.info(`⬇️ Downloading Octopus CLI ${octopusCliDownload.version}...`)
  const downloadPath: string = await tc.downloadTool(octopusCliDownload.url)
  core.debug(`Downloaded to ${downloadPath}`)

  core.info(`📦 Extracting Octopus CLI ${octopusCliDownload.version}...`)
  let extPath = ''
  if (osPlatform === 'win32') {
    extPath = await tc.extractZip(downloadPath)
  } else if (octopusCliDownload.url.endsWith('.gz')) {
    extPath = await tc.extractTar(downloadPath)
  }
  core.debug(`Extracted to ${extPath}`)

  const cachePath: string = await tc.cacheDir(extPath, 'octo', version)
  core.debug(`Cached to ${cachePath}`)

  const exePath: string = path.join(
    cachePath,
    osPlatform === 'win32' ? 'octo.exe' : 'octo'
  )
  core.debug(`Executable path is ${exePath}`)

  core.info(
    `🐙 Octopus CLI ${octopusCliDownload.version} installed successfully`
  )

  return exePath
}

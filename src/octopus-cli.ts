import * as os from 'os'
import {
  cacheDir,
  downloadTool,
  extractTar,
  extractZip
} from '@actions/tool-cache'
import {debug, info, setFailed} from '@actions/core'
import {Downloads} from './download'
import {HttpClient} from '@actions/http-client'
import {join} from 'path'
import {rename} from 'fs'

const osPlatform: string = os.platform()
const platform: string =
  osPlatform === 'win32' ? 'win' : osPlatform === 'darwin' ? 'osx' : 'linux'
const ext: string = osPlatform === 'win32' ? 'zip' : 'tar.gz'
const octopusTools = `https://download.octopusdeploy.com/octopus-tools`
const latestUrl = `${octopusTools}/latest.json`
const http: HttpClient = new HttpClient(
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
    } catch (e: unknown) {
      if (e instanceof Error) {
        setFailed(e)
      }
    }
  }

  const downloadUrl = `${octopusTools}/${versionToDownload}/OctopusTools.${versionToDownload}.${platform}-x64.${ext}`

  const statusCode = (await http.head(downloadUrl)).message.statusCode
  if (statusCode !== 200) {
    setFailed(`✕ Octopus CLI version not found: ${versionToDownload}`)
    throw new Error(`Octopus CLI version not found: ${versionToDownload}`)
  }

  info(`✓ Octopus CLI version found: ${versionToDownload}`)
  return {version: versionToDownload, url: downloadUrl}
}

export async function installOctopusCli(version: string): Promise<string> {
  const octopusCliDownload = await getDownloadUrl(version)

  info(`⬇️ Downloading Octopus CLI ${octopusCliDownload.version}...`)
  const downloadPath: string = await downloadTool(octopusCliDownload.url)
  debug(`Downloaded to ${downloadPath}`)

  await rename(`${downloadPath}`, `${downloadPath}.${ext}`)
  const downloadPathRenamed = `${downloadPath}.${ext}`
  debug(`Added extension ${downloadPathRenamed}`)

  info(`📦 Extracting Octopus CLI ${octopusCliDownload.version}...`)
  let extPath = ''
  if (osPlatform === 'win32') {
    extPath = await extractZip(downloadPathRenamed)
  } else if (octopusCliDownload.url.endsWith('.gz')) {
    extPath = await extractTar(downloadPathRenamed)
  }
  debug(`Extracted to ${extPath}`)

  const cachePath: string = await cacheDir(extPath, 'octo', version)
  debug(`Cached to ${cachePath}`)

  const exePath: string = join(
    cachePath,
    osPlatform === 'win32' ? 'octo.exe' : 'octo'
  )
  debug(`Executable path is ${exePath}`)

  info(`🐙 Octopus CLI ${octopusCliDownload.version} installed successfully`)

  return exePath
}

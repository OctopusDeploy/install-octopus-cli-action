import {debug, info, setFailed} from '@actions/core'
import {HttpClient} from '@actions/http-client'
import {
  cacheDir,
  downloadTool,
  extractTar,
  extractZip
} from '@actions/tool-cache'
import {promises as fs} from 'fs'
import * as os from 'os'
import {dirname, join} from 'path'
import {v4} from 'uuid'
import {OctopusCLIVersionFetcher} from './octopusCLIVersionFetcher'

const osPlatform: string = os.platform()
const ext: string = osPlatform === 'win32' ? 'zip' : 'tar.gz'
const baseUrl = `https://oc.to`
const versionsUrl = `${baseUrl}/OctopusCLIVersions`
const latestToolsUrl = `${baseUrl}/LatestTools`
const http: HttpClient = new HttpClient(
  'action-install-octopus-cli',
  undefined,
  {
    keepAlive: false
  }
)

interface LatestToolsResponse {
  latest: string
  downloads: DownloadOption[]
}

type Primitive = undefined | null | boolean | number | string

interface Dictionary {
  [key: string]: Primitive
}

type DownloadOption = {
  version: string
  template: string
  location: string
  extension: string
  platform?: string
  architecture?: string
}

export interface Endpoint {
  downloadUrl: string
  version: string
}

interface VersionsResponse {
  versions: string[]
}

const getVersions = async (): Promise<VersionsResponse | null> => {
  return (await http.getJson<VersionsResponse>(versionsUrl)).result
}

const getDownloadUrl = async (versionSpec: string): Promise<Endpoint> => {
  if (versionSpec === 'latest') {
    versionSpec = '*'
  }

  const versionsResponse: VersionsResponse | null = await getVersions()
  if (versionsResponse === null) {
    setFailed(`✕ Unable to get versions...`)
    throw new Error(`✕ Unable to get versions...`)
  }

  let version: string | null = versionSpec
  try {
    version = new OctopusCLIVersionFetcher(
      versionsResponse.versions
    ).getVersion(versionSpec)
    info(`Latest version available: ${version}`)
  } catch (e: unknown) {
    if (e instanceof Error) {
      setFailed(e)
    }
  }

  if (version === null) {
    setFailed(
      `✕ The version specified (${version}) is not available to download.`
    )
    throw new Error(
      `✕ The version specified (${version}) is not available to download.`
    )
  }

  debug(`Attempting to find Octopus CLI version ${version}`)

  const latestToolsResponse = await http.getJson<LatestToolsResponse>(
    latestToolsUrl
  )

  if (
    latestToolsResponse.result === null ||
    latestToolsResponse.result === undefined
  ) {
    throw Error(
      `Failed to resolve Octopus CLI version ${version}. Endpoint returned ${latestToolsResponse.statusCode} status code.`
    )
  }

  let platform = 'linux'
  switch (osPlatform) {
    case 'darwin':
      platform = 'osx'
      break
    case 'win32':
      platform = 'win'
      break
  }

  let downloadUrl: string | undefined

  for (const download of latestToolsResponse.result.downloads) {
    if (download.platform === platform) {
      const result = {...download, version}
      downloadUrl = applyTemplate(result, download.template)
    }
  }

  if (downloadUrl === undefined || downloadUrl === null) {
    throw Error(`Failed to resolve endpoint URL to download: ${downloadUrl}`)
  }

  const statusCode = (await http.head(downloadUrl)).message.statusCode
  if (statusCode !== 200) {
    setFailed(`✕ Octopus CLI version not found: ${version}`)
    throw new Error(`Octopus CLI version not found: ${version}`)
  }

  info(`✓ Octopus CLI version found: ${version}`)
  return {downloadUrl, version}
}

function applyTemplate(dictionary: Dictionary, template: string): string {
  return Object.keys(dictionary).reduce(
    (result, key) =>
      result.replace(
        new RegExp(`{${key}}`, 'g'),
        dictionary[key] ? String(dictionary[key]) : ''
      ),
    template
  )
}

export async function installOctopusCli(version: string): Promise<string> {
  const octopusCliDownload = await getDownloadUrl(version)

  info(`⬇️ Downloading Octopus CLI ${octopusCliDownload.version}...`)
  const dest = join(process.env['RUNNER_TEMP'] || '', `${v4()}.${ext}`)
  await fs.mkdir(dirname(dest), {recursive: true})
  const downloadPath: string = await downloadTool(
    octopusCliDownload.downloadUrl,
    dest
  )
  debug(`Downloaded to ${downloadPath}`)

  info(`📦 Extracting Octopus CLI ${octopusCliDownload.version}...`)
  let extPath = ''
  if (osPlatform === 'win32') {
    extPath = await extractZip(downloadPath)
  } else if (octopusCliDownload.downloadUrl.endsWith('.gz')) {
    extPath = await extractTar(downloadPath)
  }
  debug(`Extracted to ${extPath}`)

  const cachePath: string = await cacheDir(
    extPath,
    'octo',
    octopusCliDownload.version
  )
  debug(`Cached to ${cachePath}`)

  const exePath: string = join(
    cachePath,
    osPlatform === 'win32' ? 'octo.exe' : 'octo'
  )
  debug(`Executable path is ${exePath}`)

  info(`🐙 Octopus CLI ${octopusCliDownload.version} installed successfully`)

  return exePath
}

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
const osArch: string = os.arch()
const ext: string = osPlatform === 'win32' ? 'zip' : 'tar.gz'
const releasesUrl = `https://raw.githubusercontent.com/OctopusDeploy/cli/main/releases.json`
const http: HttpClient = new HttpClient(
  'action-install-octopus-cli',
  undefined,
  {
    keepAlive: false
  }
)
const downloadsRegEx = /^.*_(?<version>(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)(?:-((?:0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*)(?:\.(?:0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*))*))?(?:\+([0-9a-zA-Z-]+(?:\.[0-9a-zA-Z-]+)*))?)_(?<platform>linux|macOS|windows)_(?<architecture>arm64|amd64).(?<extension>tar.gz|zip)$/gi

type DownloadOption = {
  version: string
  location: string
  extension: string
  platform?: string
  architecture?: string
}

export interface Endpoint {
  downloadUrl: string
  version: string
  architecture: string
}

interface VersionsResponse {
  versions: string[]
  downloads: DownloadOption[]
}

interface GitHubRelease {
  tag_name: string
  assets: GitHubReleaseAsset[];
}

interface GitHubReleaseAsset {
  version: string
  name: string
  browser_download_url: string
}

const getVersions = async (): Promise<VersionsResponse | null> => {
    const releasesResponse = (await http.getJson<GitHubRelease[]>(releasesUrl)).result
    if (releasesResponse === null) return null

    const downloads = releasesResponse.flatMap(v => v.assets.filter(a => downloadsRegEx.test(a.name)).map(a => {
      const matches = downloadsRegEx.exec(a.name)
      
      return {
        version: matches?.groups?.version || v.tag_name.slice(1),
        location: a.browser_download_url,
        extension: matches?.groups?.extension || `.${ext}`,
        platform: matches?.groups?.platform || undefined,
        architecture: matches?.groups?.architecture || undefined
      }
    }))
    const versions = downloads.map(d => d.version)

    return {
      versions,
      downloads
    }
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

  let platform = 'linux'
  switch (osPlatform) {
    case 'darwin':
      platform = 'macOS'
      break
    case 'win32':
      platform = 'windows'
      break
  }

  let arch = 'amd64'
  switch(osArch) {
    case 'arm':
    case 'arm64':
      arch = 'arm64'
      break
  }

  let downloadUrl: string | undefined

  for (const download of versionsResponse.downloads) {
    if (download.version === version && download.platform === platform && download.architecture === arch) {
      downloadUrl = download.location
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
  return {downloadUrl, version, architecture: arch}
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

  fs.rm(`${extPath}/CHANGELOG.md`, {force: true})
  fs.rm(`${extPath}/README.md`, {force: true})
  fs.rm(`${extPath}/LICENSE`, {force: true})

  debug(`Extracted to ${extPath}`)

  const cachePath: string = await cacheDir(
    extPath,
    'octopus',
    octopusCliDownload.version,
    octopusCliDownload.architecture
  )
  debug(`Cached to ${cachePath}`)

  const exePath: string = join(
    cachePath,
    osPlatform === 'win32' ? 'octopus.exe' : 'octopus'
  )
  debug(`Executable path is ${exePath}`)

  info(`🐙 Octopus CLI ${octopusCliDownload.version} installed successfully`)

  return exePath
}

import {OctopusCLIVersionFetcher} from './octopusCLIVersionFetcher'
import * as os from 'os'
import {HttpClient} from '@actions/http-client'
import {debug} from '@actions/core'

interface LatestResponse {
  latest: string
  downloads: DownloadOption[]
}

interface VersionsResponse {
  versions: string[]
}

type DownloadOption = {
  version: string
  template: string
  location: string
  extension: string
  platform?: string
  architecture?: string
}

type Primitive = undefined | null | boolean | number | string

interface Dictionary {
  [key: string]: Primitive
}

export interface Endpoint {
  downloadUrl?: string
  version: string
}

export class DownloadEndpointRetriever {
  private osPlat: string = os.platform()

  constructor(readonly octopusUrl: string) {}

  async getEndpoint(versionSpec: string): Promise<Endpoint> {
    const http: HttpClient = new HttpClient(
      'action-install-octopus-cli',
      undefined,
      {
        keepAlive: false
      }
    )

    const versionsResponse = await http.getJson<VersionsResponse>(
      `{this.octopusUrl}/OctopusCLIVersions`
    )
    if (
      versionsResponse.result === null ||
      versionsResponse.result === undefined
    ) {
      throw Error(
        `Failed to resolve Octopus CLI versions. Endpoint returned ${versionsResponse.statusCode} status code.`
      )
    }

    const version = new OctopusCLIVersionFetcher(
      versionsResponse.result.versions
    ).getVersion(versionSpec)

    debug(
      `Attempting to contact ${this.octopusUrl} to find Octopus CLI version ${version}`
    )

    const response = await http.getJson<LatestResponse>('LatestTools')

    if (response.result === null || response.result === undefined) {
      throw Error(
        `Failed to resolve Octopus CLI version ${version}. Endpoint returned ${response.statusCode} status code.`
      )
    }

    let platform = 'linux'
    switch (this.osPlat) {
      case 'darwin':
        platform = 'osx'
        break
      case 'win32':
        platform = 'win'
        break
    }

    let downloadUrl: string | undefined

    for (const download of response.result.downloads) {
      if (download.platform === platform) {
        const result = {...download, version}
        downloadUrl = this.applyTemplate(result, download.template)
      }
    }

    return {downloadUrl, version}
  }

  private applyTemplate(dictionary: Dictionary, template: string): string {
    return Object.keys(dictionary).reduce(
      (result, key) =>
        result.replace(
          new RegExp(`{${key}}`, 'g'),
          dictionary[key] ? String(dictionary[key]) : ''
        ),
      template
    )
  }
}

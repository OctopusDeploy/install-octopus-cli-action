import {maxSatisfying, valid} from 'semver'

export class OctopusCLIVersionFetcher {
  constructor(readonly versions: string[]) {}

  getVersion(versionSpec: string): string | null {
    if (versionSpec === '*') {
      return maxSatisfying(this.versions, versionSpec)
    }

    if (valid(versionSpec) === null) {
      const parts = versionSpec.split('.')
      if (parts.length > 3) {
        throw new Error(
          `The '${versionSpec}' is an invalid version, a version needs to be a maximum of three parts.`
        )
      }

      if (parts.length === 1) {
        const majorVersion = parts[0]
        if (Number.isNaN(Number.parseInt(majorVersion))) {
          throw new Error(
            `The '${versionSpec}' version needs to specify a number or '*' for its major part.`
          )
        }
      }

      if (parts.length === 2) {
        const majorVersion = parts[0]
        const minorVersion = parts[1]

        // the major version number must be a number
        if (Number.isNaN(Number.parseInt(majorVersion))) {
          throw new Error(
            `The '${versionSpec}' version needs to specify a number for its major part.`
          )
        }

        if (
          minorVersion !== '*' &&
          Number.isNaN(Number.parseInt(minorVersion))
        ) {
          throw new Error(
            `The '${versionSpec}' version needs to specify a number or '*' for its minor part.`
          )
        }
      }

      if (parts.length === 3) {
        const majorVersion = parts[0]
        const minorVersion = parts[1]
        const patchVersion = parts[2]

        // the major version number must be a number
        if (Number.isNaN(Number.parseInt(majorVersion))) {
          throw new Error(
            `The '${versionSpec}' version needs to specify a number for its major part.`
          )
        }

        // the minor version number must be a number
        if (Number.isNaN(Number.parseInt(minorVersion))) {
          throw new Error(
            `The '${versionSpec}' version needs to specify a number for its minor part.`
          )
        }

        if (
          patchVersion !== '*' &&
          Number.isNaN(Number.parseInt(patchVersion))
        ) {
          throw new Error(
            `The '${versionSpec}' version needs to specify a number or '*' for its patch part.`
          )
        }
      }
    }

    const version = maxSatisfying(this.versions, versionSpec)

    if (!version) {
      throw new Error(
        `A version satisfying '${versionSpec}' could not be found.`
      )
    }

    return version
  }
}

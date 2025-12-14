import * as path from 'path'
import {installOctopusCli} from '../src/octopus-cli'

describe('installer', () => {
  test('fails to acquire a version of Octopus CLI', () => {
    expect.assertions(1)
    return installOctopusCli('0.0.0').catch(e => {
      expect(e.message as Error).toContain(
        'Failed to resolve endpoint URL to download for version'
      )
    })
  }, 100000)

  test('acquires version 0.5.* of Octopus CLI', () => {
    return installOctopusCli('0.5.*').then(data => {
      expect(data).toContain(path.sep + 'octopus' + path.sep)
    })
  }, 100000)

  test('acquires latest version of Octopus CLI', () => {
    return installOctopusCli('latest').then(data => {
      expect(data).toContain(path.sep + 'octopus' + path.sep)
    })
  }, 100000)

  test('acquires latest version of Octopus CLI', () => {
    return installOctopusCli('*').then(data => {
      expect(data).toContain(path.sep + 'octopus' + path.sep)
    })
  }, 100000)
})

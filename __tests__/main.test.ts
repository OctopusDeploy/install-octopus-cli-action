import * as path from 'path'
import {installOctopusCli} from '../src/octopus-cli'

describe('installer', () => {
  test('fails to acquire a version of Octopus CLI', () => {
    expect.assertions(1)
    return installOctopusCli('0.0.0').catch(e => {
      expect(<Error>e.message).toContain('Octopus CLI version not found')
    })
  }, 100000)

  test('fails to acquire a version of Octopus CLI', () => {
    expect.assertions(1)
    return installOctopusCli('0.0.0').catch(e => {
      expect(<Error>e.message).toContain('Octopus CLI version not found')
    })
  }, 100000)

  test('acquires version 8.* of Octopus CLI', () => {
    return installOctopusCli('8.*').then(data => {
      expect(data).toContain(path.sep + 'octo' + path.sep)
    })
  }, 100000)

  test('acquires latest version of Octopus CLI', () => {
    return installOctopusCli('latest').then(data => {
      expect(data).toContain(path.sep + 'octo' + path.sep)
    })
  }, 100000)

  test('acquires latest version of Octopus CLI', () => {
    return installOctopusCli('*').then(data => {
      expect(data).toContain(path.sep + 'octo' + path.sep)
    })
  }, 100000)
})

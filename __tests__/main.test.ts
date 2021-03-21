import * as fs from 'fs'
import * as installer from '../src/octopus-cli'

describe('installer', () => {
  it('fails to acquire a version of Octopus CLI', async () => {
    const octopusCli = await installer.installOctopusCli('0.0.0')
    expect(fs.existsSync(octopusCli)).toBe(false)
  }, 100000)

  it('acquire a version of Octopus CLI', async () => {
    const octopusCli = await installer.installOctopusCli('7.4.3124')
    expect(fs.existsSync(octopusCli)).toBe(true)
  }, 100000)

  it('acquires latest version of Octopus CLI', async () => {
    const octopusCli = await installer.installOctopusCli('latest')
    expect(fs.existsSync(octopusCli)).toBe(true)
  }, 100000)
})

import {downloadsRegEx} from '../src/octopus-cli'

describe('downloadsRegEx tests', () => {
  test('matches amd64 tar.gz filename', () => {
    const filename = 'octopus_2.18.0_linux_amd64.tar.gz'
    const match = downloadsRegEx.exec(filename)

    expect(match).not.toBeNull()
    expect(match?.groups?.version).toBe('2.18.0')
    expect(match?.groups?.platform).toBe('linux')
    expect(match?.groups?.architecture).toBe('amd64')
    expect(match?.groups?.extension).toBe('tar.gz')
  })

  test('matches arm64 tar.gz filename', () => {
    const filename = 'octopus_2.18.0_linux_arm64.tar.gz'
    const match = downloadsRegEx.exec(filename)

    expect(match).not.toBeNull()
    expect(match?.groups?.version).toBe('2.18.0')
    expect(match?.groups?.platform).toBe('linux')
    expect(match?.groups?.architecture).toBe('arm64')
    expect(match?.groups?.extension).toBe('tar.gz')
  })

  test('matches amd64 zip filename', () => {
    const filename = 'octopus_2.18.0_windows_amd64.zip'
    const match = downloadsRegEx.exec(filename)

    expect(match).not.toBeNull()
    expect(match?.groups?.version).toBe('2.18.0')
    expect(match?.groups?.platform).toBe('windows')
    expect(match?.groups?.architecture).toBe('amd64')
    expect(match?.groups?.extension).toBe('zip')
  })

  test('matches arm64 zip filename', () => {
    const filename = 'octopus_2.18.0_windows_arm64.zip'
    const match = downloadsRegEx.exec(filename)

    expect(match).not.toBeNull()
    expect(match?.groups?.version).toBe('2.18.0')
    expect(match?.groups?.platform).toBe('windows')
    expect(match?.groups?.architecture).toBe('arm64')
    expect(match?.groups?.extension).toBe('zip')
  })

  test('matches macOS amd64 filename', () => {
    const filename = 'octopus_2.18.0_macOS_amd64.tar.gz'
    const match = downloadsRegEx.exec(filename)

    expect(match).not.toBeNull()
    expect(match?.groups?.version).toBe('2.18.0')
    expect(match?.groups?.platform).toBe('macOS')
    expect(match?.groups?.architecture).toBe('amd64')
    expect(match?.groups?.extension).toBe('tar.gz')
  })

  test('matches macOS arm64 filename', () => {
    const filename = 'octopus_2.18.0_macOS_arm64.tar.gz'
    const match = downloadsRegEx.exec(filename)

    expect(match).not.toBeNull()
    expect(match?.groups?.version).toBe('2.18.0')
    expect(match?.groups?.platform).toBe('macOS')
    expect(match?.groups?.architecture).toBe('arm64')
    expect(match?.groups?.extension).toBe('tar.gz')
  })
})

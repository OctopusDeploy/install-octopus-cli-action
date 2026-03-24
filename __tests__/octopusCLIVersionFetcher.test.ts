import {OctopusCLIVersionFetcher} from '../src/octopusCLIVersionFetcher'

describe('OctopusCLIVersionFetcher tests', () => {
  test('Gets latest', () => {
    const fetcher = new OctopusCLIVersionFetcher(['1.0.0', '2.0.0', '2.1.0'])

    const version = fetcher.getVersion('*')

    expect(version).toBe('2.1.0')
  })

  test('Fixed returns fixed version', () => {
    const fetcher = new OctopusCLIVersionFetcher(['1.0.0', '2.0.0', '2.1.0'])

    const version = fetcher.getVersion('1.0.0')

    expect(version).toBe('1.0.0')
  })

  test('When version no exists', () => {
    const fetcher = new OctopusCLIVersionFetcher(['1.0.0', '2.0.0', '2.1.0'])

    expect(() => fetcher.getVersion('5.0.0')).toThrow()
  })

  test('Get latest minor', () => {
    const fetcher = new OctopusCLIVersionFetcher([
      '1.0.0',
      '2.0.0',
      '2.1.0',
      '3.0.0'
    ])

    const version = fetcher.getVersion('2.*')

    expect(version).toBe('2.1.0')
  })

  test('Get latest patch', () => {
    const fetcher = new OctopusCLIVersionFetcher([
      '1.0.0',
      '1.0.3',
      '2.1.0',
      '3.0.0'
    ])

    const version = fetcher.getVersion('1.0.*')

    expect(version).toBe('1.0.3')
  })

  test('When version spec if invalid', () => {
    const fetcher = new OctopusCLIVersionFetcher(['1.0.0', '2.0.0', '2.1.0'])

    expect(() => fetcher.getVersion('*.*')).toThrow()

    expect(() => fetcher.getVersion('*.2')).toThrow()

    expect(() => fetcher.getVersion('sdfs')).toThrow()
  })

  test('Get latest major', () => {
    const fetcher = new OctopusCLIVersionFetcher([
      '1.0.0',
      '2.0.0',
      '2.1.0',
      '3.0.0'
    ])

    const version = fetcher.getVersion('2')

    expect(version).toBe('2.1.0')
  })

  test('Get latest not pre-release', () => {
    const fetcher = new OctopusCLIVersionFetcher([
      '1.0.0',
      '1.0.3',
      '2.1.0',
      '3.0.0',
      '4.0.0-pre'
    ])

    const version = fetcher.getVersion('*')

    expect(version).toBe('3.0.0')
  })
})

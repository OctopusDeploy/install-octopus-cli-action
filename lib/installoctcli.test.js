const installoctocli = require('./installoctocli')

test('Installs the octopus CLI', () => {
    let version = '7.4.2'
    expect(installoctocli(version))
})

test('Confirm Linux', () => {
    version = '7.2.4'

    const osDownload = new Map()
    let set = ('linux', `https://download.octopusdeploy.com/octopus-tools/${ version }/OctopusTools.${ version }.linux-x64.tar.gz`)

    expect(set).toContain('linux', `https://download.octopusdeploy.com/octopus-tools/${ version }/OctopusTools.${ version }.linux-x64.tar.gz`)
})

test('Confirm Windows', () => {
    version = '7.2.4'

    const osDownload = new Map()
    let set = (`win32`, `https://download.octopusdeploy.com/octopus-tools/${ version }/OctopusTools.${ version }.win-x64.zip`)
    
    expect(set).toContain((`win32`, `https://download.octopusdeploy.com/octopus-tools/${ version }/OctopusTools.${ version }.win-x64.zip`))
})

test('Confirm MacOS', () => {
    version = '7.2.4'
    
    const osDownload = new Map()
    let set1 = (`darwin`, `https://download.octopusdeploy.com/octopus-tools/${ version }/OctopusTools.${ version }.osx-x64.tar.gz`)
    
    expect(set1).toContain((`darwin`, `https://download.octopusdeploy.com/octopus-tools/${ version }/OctopusTools.${ version }.osx-x64.tar.gz`))
})
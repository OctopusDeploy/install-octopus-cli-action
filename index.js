const core = require('@actions/core')
const octocli = require('./lib/installoctocli')

async function octopuscli() {
    const version = core.getInput('version')

    try {
        await installoctocli(version)
    } catch (e){ 
        core.setFailed(error.message)
    }
}
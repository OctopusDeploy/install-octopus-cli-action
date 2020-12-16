const core = require('@actions/core')
const octocli = require('./lib/installoctocli')

async function octopuscli() {
    const version = core.getInput('version')

    try {
        await octocli(version)
    } catch (e){ 
        core.setFailed(error.message)
    }
}

octopuscli()

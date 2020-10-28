const core = require('@actions/core')
const octocli = require('./lib/installoctocli')

async function octopuscli() {
    try {
        await setup()
    } catch { 
        core.setFailed(error.message)
    }
}
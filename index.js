const core = require('@actions/core')
const octocli = require('./lib/installoctocli')

async function octocli() {
    try {
        await setup()
    } catch { 
        core.setFailed(error.message)
    }
}
# install-octocli

The `OctopusDeploy/installoctocli` Action is a [composite run](https://docs.github.com/en/free-pro-team@latest/actions/creating-actions/creating-a-composite-run-steps-action) used to install the Octopus CLI on GitHub Action runners.

Once you use this Action, you can run [Octopus Deploy CLI](https://octopus.com/docs/octopus-rest-api/octopus-cli) commands directly from GitHub Actions.

## What is the Octopus Deploy CLI?
The Octopus Deploy CLI is a command-line interface that allows you to interact with an Octopus Deploy server via API calls.

You can perform many actions, including:
* Creating releases
* Deploying releases
* Listing deployments
* Listing environments
* Much more...

To see what you can do with the Octopus Deploy, visit the [official documentation](https://octopus.com/docs/octopus-rest-api/octopus-cli)

## Usage
This Action can be run on the following GitHub Action Runner enviroments:
* `windows-latest`
* `macos-latest`
* `ubuntu-latest`

## Examples
To install Octopus Deploy CLI version `7.4.2` on the GitHub Actions Runner:

```yml
steps:
  - name: install Octopus Deploy CLI
    uses: OctopusDeploy/install-octocli@v1
    with:
      version: 7.4.2
```

**Please Note**
Version `7.4.2` is not a requirement, just an example. You can install any version of the Octopus Deploy CLI.

## Inputs
Inputs/parameters/arguments are currently a work in progress. As right now now, you can pass in the following argument:
* Version of the Octopus Deploy CLI that you want to install.


# install-octocli

The `OctopusDeploy/installoctocli` Action is a [composite run](https://docs.github.com/en/free-pro-team@latest/actions/creating-actions/creating-a-composite-run-steps-action) writtin in `Go` used to install the Octopus CLI on GitHub Action runners.

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
To install Octopus Deploy CLI version `latest` on the GitHub Actions Runner:

```yml
steps:
  - name: install Octopus Deploy CLI
    uses: OctopusDeploy/install-octocli@v1
```

To list deployments using after installing the Octopus Deploy CLI:
```yml
      - name: install Octopus Deploy CLI
        uses: OctopusDeploy/install-octocli@v1
          
      - name: list-octopusdeploy-deploymets
        run: octo list-deployments --server=${{ env.serverURL }} --apiKey=${{ secrets.apiKey }}
```

## Inputs
Inputs/parameters/arguments are currently a work in progress. As right now now, there are no inputs. The `Go` code handles which operating system to use and you always get the latest version of the CLI.



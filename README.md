# install-octocli

The `OctopusDeploy/install-octocli` Action is a GitHub Action writtin in `JavaScript` that's used to install the Octopus CLI on GitHub Action runners and self-hosted environments

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
* `self-hosted`

## Examples
To install Octopus Deploy CLI version `7.4.2` on the GitHub Actions Runner:

```yml
    steps:
      - uses: actions/checkout@v2
      
      - name: install Octopus Deploy CLI
        uses: OctopusDeploy/install-octocli@v1
        with:
          version: 7.4.2
```

To list deployments using after installing the Octopus Deploy CLI:
```yml
    steps:
      - uses: actions/checkout@v2
      
      - name: install Octopus Deploy CLI
        uses: OctopusDeploy/install-octocli@v1
        with:
          version: 7.4.2
          
      - name: list-octopusdeploy-deploymets
        run: octo list-deployments --server=${{ env.serverURL }} --apiKey=${{ secrets.apiKey }}
```

## Inputs
Inputs/parameters/arguments are currently a work in progress. There is one input available, which is to specify the version of the Octopus Deploy CLI you wish to use.



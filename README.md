# install-octopus-cli-action

This is a GitHub Action to install the [Octopus CLI](https://octopus.com/docs/octopus-rest-api/octopus-cli) on runners and self-hosted environments. Once installed, the Octopus CLI may be used to issue commands to an instance of Octopus Server or Octopus Cloud.

## What is the Octopus CLI?

The Octopus CLI is a command line tool that builds on top of the [Octopus REST API](https://octopus.com/docs/octopus-rest-api). With the Octopus CLI you can package your applications for deployment as either Zip or NuGet packages, and manage your environments, deployments, channels, projects, and workers.

## Usage

This action can be run on in the following enviroments:

* `windows-latest`
* `macos-latest`
* `ubuntu-latest`
* `self-hosted`

## Examples

To install the latest version of the Octopus CLI:

```yml
steps:
  - uses: actions/checkout@v2
  - name: Install Octopus CLI
    uses: OctopusDeploy/install-octopus-cli-action@v1.1
    with:
      version: latest
```

To install a specific version of the Octopus CLI:

```yml
steps:
  - uses: actions/checkout@v2
  - name: Install Octopus CLI
    uses: OctopusDeploy/install-octopus-cli-action@v1.1
    with:
      version: 7.4.3140
```

To list deployments using after installing the Octopus CLI:

```yml
steps:
  - uses: actions/checkout@v2
  - name: Install Octopus CLI
    uses: OctopusDeploy/install-octopus-cli-action@v1.1
    with:
      version: 7.4.2
  - name: list-octopusdeploy-deployments
    run: octo list-deployments --server=${{ env.serverURL }} --apiKey=${{ secrets.apiKey }}
```

## Inputs

Inputs/parameters/arguments are currently a work in progress. There is one input available, which is to specify the version of the Octopus Deploy CLI you wish to use.
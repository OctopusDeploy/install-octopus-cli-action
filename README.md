This is a GitHub Action install the [Octopus CLI](https://octopus.com/docs/octopus-rest-api/octopus-cli) on runners and self-hosted environments. Once installed, the Octopus CLI may be used to issue commands to [Octopus Deploy](https://octopus.com/). Subsequent actions may use the Octopus CLI, which is cached and available via `PATH`.

## What is the Octopus CLI?

The Octopus CLI is a command line tool that builds on top of the [Octopus REST API](https://octopus.com/docs/octopus-rest-api). It enables you can package applications for deployment and manage your environments, deployments, channels, projects, and workers in Octopus Deploy.

## Examples

To install the latest version of the Octopus CLI:

```yml
steps:
  - uses: actions/checkout@v2
  - name: Install Octopus CLI
    uses: OctopusDeploy/install-octopus-cli-action@v1.1.1
    with:
      version: latest
```

To install a specific version of the Octopus CLI:

```yml
steps:
  - uses: actions/checkout@v2
  - name: Install Octopus CLI
    uses: OctopusDeploy/install-octopus-cli-action@v1.1.1
    with:
      version: 7.4.3140
```

Here's an example of invoking the `list-deployments` command after installing the Octopus CLI:

```yml
steps:
  - uses: actions/checkout@v2
  - name: Install Octopus CLI
    uses: OctopusDeploy/install-octopus-cli-action@v1.1.1
    with:
      version: 7.4.2
  - name: list-octopusdeploy-deployments
    run: >
      octo list-deployments --server=${{ env.serverURL }}
        --apiKey=${{ secrets.apiKey }}
```

## Action Inputs

| Name | Description | Required | Default |
| :- | :- | :-: | :-: |
| `version` | The version number of the Octopus CLI to download and install (i.e. `7.4.3140`). | `false` | `latest` |
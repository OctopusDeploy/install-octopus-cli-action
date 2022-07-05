# install-octopus-cli-action

<img alt= "" src="https://github.com/OctopusDeploy/install-octopus-cli-action/raw/main/assets/github-actions-octopus.png" />

This is a GitHub Action to install the [Octopus CLI](https://octopus.com/docs/octopus-rest-api/octopus-cli) on runners and self-hosted environments. Once installed, the Octopus CLI may be used to issue commands to [Octopus Deploy](https://octopus.com/). Subsequent actions may use the Octopus CLI, which is cached and available via `PATH`.

## What is the Octopus CLI?

The Octopus CLI is a command line tool that builds on top of the [Octopus REST API](https://octopus.com/docs/octopus-rest-api). It enables you to package applications for deployment and manage your environments, deployments, channels, projects, and workers in Octopus Deploy.

## Features

- Download, install, and cache Octopus CLI to be used in workflows
- Supports SemVer-based version numbers with wildcards (i.e. `8.*`) but not ranges

## Examples

To install the latest version (i.e. `*` or `latest`) of the Octopus CLI:

```yml
- name: Install Octopus CLI 🐙
  uses: OctopusDeploy/install-octopus-cli-action@v1
  with:
    version: '*'
```

To install a specific version of the Octopus CLI:

```yml
- name: Install Octopus CLI 🐙
  uses: OctopusDeploy/install-octopus-cli-action@v1
  with:
    version: 9.0.0
```

Here's an example of invoking the `list-deployments` command after installing the Octopus CLI:

```yml
- name: Install Octopus CLI 🐙
  uses: OctopusDeploy/install-octopus-cli-action@v1
  with:
    version: 9.0.0
- name: list-octopusdeploy-deployments
  run: >
    octo list-deployments --server=${{ env.serverURL }}
      --apiKey=${{ secrets.apiKey }}
```

## 📥 Inputs

The following input is optional:

| Name      | Description                                                                      |   Default    |
| :-------- | :------------------------------------------------------------------------------- | :----------: |
| `version` | The version number of the Octopus CLI to download and install (i.e. `7.4.3190`). | `*` (latest) |

## 🤝 Contributions

Contributions are welcome! :heart: Please read our [Contributing Guide](.github/CONTRIBUTING.md) for information about how to get involved in this project.

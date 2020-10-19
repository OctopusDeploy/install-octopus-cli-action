# install-octocli
**README IS STILL IN PROGRESS**

The `OctopusDeploy/install-octocli` action is a Go package ran from a Docker container to install and set up the [Octopus Deploy CLI](https://octopus.com/docs/octopus-rest-api/octopus-cli) to start managing Octopus Deploy from GitHub Actions.

* Install Octopus Deploy on a GitHub virtual environment

## Usage
The `OctopusDeploy/install-octocli` action can be used on `ubuntu-latest` or any other Linux builders.

## Disclaimer
At the time of writing this, Docker-based GitHub Actions are only available on Linux builders. If you're interested in using a GitHub action in a Windows or Mac OS environment, you have to use Node.js.

The disclaimer is just to make you aware, but this won't negatively impact you. If you're a pure Windows shop, you can still use a Linux builder. The `builder` is simply a virtual environment built and maintained by GitHub. Even if you don't know Linux, you can still use the Linux builder because you won't have to interact with the underlying OS.
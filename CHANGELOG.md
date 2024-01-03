# Changelog

## [3.1.1](https://github.com/OctopusDeploy/install-octopus-cli-action/compare/v3.1.0...v3.1.1) (2024-01-03)


### Bug Fixes

* **deps:** update dependency @actions/core to v1.10.1 ([9ef46dd](https://github.com/OctopusDeploy/install-octopus-cli-action/commit/9ef46ddadc1338f89f84ef921a3b90a8962ba8a1))
* **deps:** update dependency uuid to v9.0.1 ([02deaca](https://github.com/OctopusDeploy/install-octopus-cli-action/commit/02deaca4309fc202b3212375169f1aee085777c4))
* force exit when done ([cfb528f](https://github.com/OctopusDeploy/install-octopus-cli-action/commit/cfb528f382414677408075e6474e56caf8356914))
* hanging when after install ([8669ed4](https://github.com/OctopusDeploy/install-octopus-cli-action/commit/8669ed4e3a1bd84b27e7b2686915e222fdb0daa1))
* not awaiting fs.rm ([bdc65fe](https://github.com/OctopusDeploy/install-octopus-cli-action/commit/bdc65fef29c5aa4c7db56420464c463a252c6209))
* not handling run function ([e14e8e1](https://github.com/OctopusDeploy/install-octopus-cli-action/commit/e14e8e1bdc03441d08930cd12668f324268cf14d))
* Updates to latest transitive dependencies to address dependabot alerts ([#413](https://github.com/OctopusDeploy/install-octopus-cli-action/issues/413)) ([2efe771](https://github.com/OctopusDeploy/install-octopus-cli-action/commit/2efe771f0571c855f3545cf363c700cbdf71264e))

## [3.1.0](https://github.com/OctopusDeploy/install-octopus-cli-action/compare/v3.0.1...v3.1.0) (2023-12-14)


### Features

* Upgrade to node 20 ([#404](https://github.com/OctopusDeploy/install-octopus-cli-action/issues/404)) ([1d85b40](https://github.com/OctopusDeploy/install-octopus-cli-action/commit/1d85b409706419cab36c8d310ef7eda9283fcf7d))


### Bug Fixes

* **deps:** pin dependencies ([58213b8](https://github.com/OctopusDeploy/install-octopus-cli-action/commit/58213b8a3d0aad78cc6ee51894a383019ddcdcd6))

## [3.0.1](https://github.com/OctopusDeploy/install-octopus-cli-action/compare/v3.0.0...v3.0.1) (2023-11-16)


### Miscellaneous Chores

* release 3.0.1 ([788b620](https://github.com/OctopusDeploy/install-octopus-cli-action/commit/788b62013ecc14c5ee335caf480d3fe86b1b3931))

## [3.0.0](https://github.com/OctopusDeploy/install-octopus-cli-action/compare/v1.2.1...v3.0.0) (2022-12-13)


### ⚠ BREAKING CHANGES

* Update action to install our new go cli

### Features

* Update action to install our new go cli ([5eb509a](https://github.com/OctopusDeploy/install-octopus-cli-action/commit/5eb509aa6f61be71716c9df9f62821b2f533b996))


### Bug Fixes

* updated dependencies ([820f71c](https://github.com/OctopusDeploy/install-octopus-cli-action/commit/820f71c8fb1246d0c0b0575100700102c715b18b))


### Miscellaneous Chores

* release 3.0.0 ([#384](https://github.com/OctopusDeploy/install-octopus-cli-action/issues/384)) ([3fcc9b1](https://github.com/OctopusDeploy/install-octopus-cli-action/commit/3fcc9b1cdb0067f02416b05b346783d412e65950))

## [1.2.1](https://github.com/OctopusDeploy/install-octopus-cli-action/compare/v1.3.0...v1.2.1) (2022-11-04)


### Features

* bump to node16 ([1c10efb](https://github.com/OctopusDeploy/install-octopus-cli-action/commit/1c10efbb7a40523348339e6c088df19fba0d92b8))
* added download endpoint retriever ([1b210f2](https://github.com/OctopusDeploy/install-octopus-cli-action/commit/1b210f211beead2b82d9b372dbaee142af740a7a))
* added Octopus CLI version fetcher ([767b69f](https://github.com/OctopusDeploy/install-octopus-cli-action/commit/767b69f39f167bbd5cbae3efdce9fbdf888070a2))
* bump dependencies ([d33e561](https://github.com/OctopusDeploy/install-octopus-cli-action/commit/d33e56128dc530bb774c2ecf51b97b7580c6a667))
* incorporated SemVer support ([eba997b](https://github.com/OctopusDeploy/install-octopus-cli-action/commit/eba997bc80d51e2f57e0dc47f5fcd6fd1959c5d8))
* reordered imports and updated info message ([63a0c2e](https://github.com/OctopusDeploy/install-octopus-cli-action/commit/63a0c2e4b1269e98cafb376394a3a3e35568ef6a))
* replace "latest" with wildcard for SemVer support ([393cafc](https://github.com/OctopusDeploy/install-octopus-cli-action/commit/393cafc5529b2dfddcf19756ff19e2afa1f9cd94))
* updated text output ([97295d1](https://github.com/OctopusDeploy/install-octopus-cli-action/commit/97295d1d877ec0b6b775646fac28e2550d62318b))


### Bug Fixes

* bumped version number ([0ef7f7c](https://github.com/OctopusDeploy/install-octopus-cli-action/commit/0ef7f7c34758f15c3ae40d0570ac1c4e4bd5e980))
* Commit dist changes ([86b2e2e](https://github.com/OctopusDeploy/install-octopus-cli-action/commit/86b2e2e03823da0ce870b394a4f5980475f1c17e))
* removed eslint plugin (compatibility) ([03e0e42](https://github.com/OctopusDeploy/install-octopus-cli-action/commit/03e0e42aa2dee5b7db4faa7f0d3c116640686d85))
* Update build pipeline to our new process ([#337](https://github.com/OctopusDeploy/install-octopus-cli-action/issues/337)) ([2580363](https://github.com/OctopusDeploy/install-octopus-cli-action/commit/2580363faf5b17fc792dbbd72fb88b92dbb44bb9))
* updated README ([1aa6329](https://github.com/OctopusDeploy/install-octopus-cli-action/commit/1aa632986ee255da3ec071d8a65b05df9c9b5834))
* updated README to reflect latest version ([d436c34](https://github.com/OctopusDeploy/install-octopus-cli-action/commit/d436c34a61bdba89b6b8ff39ffff009772459240))
* updated semantics to error on null version ([ed9f79d](https://github.com/OctopusDeploy/install-octopus-cli-action/commit/ed9f79d832c291ca2b4da7faf2f7729ee003323b))


### Miscellaneous Chores

* release 1.1.7 ([c58fed5](https://github.com/OctopusDeploy/install-octopus-cli-action/commit/c58fed5e1cf648ea84fe27eae5413c8bf4dec64f))
* release 1.2.1 ([c9a5e70](https://github.com/OctopusDeploy/install-octopus-cli-action/commit/c9a5e708993f267f758582ee062c4499aaa85edd))

## [1.3.0](https://github.com/OctopusDeploy/install-octopus-cli-action/compare/v1.2.0...v1.3.0) (2022-05-25)


### Features

* reordered imports and updated info message ([63a0c2e](https://github.com/OctopusDeploy/install-octopus-cli-action/commit/63a0c2e4b1269e98cafb376394a3a3e35568ef6a))

## [1.2.0](https://github.com/OctopusDeploy/install-octopus-cli-action/compare/v1.1.10...v1.2.0) (2022-05-04)


### Features

* added download endpoint retriever ([1b210f2](https://github.com/OctopusDeploy/install-octopus-cli-action/commit/1b210f211beead2b82d9b372dbaee142af740a7a))
* added Octopus CLI version fetcher ([767b69f](https://github.com/OctopusDeploy/install-octopus-cli-action/commit/767b69f39f167bbd5cbae3efdce9fbdf888070a2))
* incorporated SemVer support ([eba997b](https://github.com/OctopusDeploy/install-octopus-cli-action/commit/eba997bc80d51e2f57e0dc47f5fcd6fd1959c5d8))
* replace "latest" with wildcard for SemVer support ([393cafc](https://github.com/OctopusDeploy/install-octopus-cli-action/commit/393cafc5529b2dfddcf19756ff19e2afa1f9cd94))


### Bug Fixes

* updated semantics to error on null version ([ed9f79d](https://github.com/OctopusDeploy/install-octopus-cli-action/commit/ed9f79d832c291ca2b4da7faf2f7729ee003323b))

### [1.1.10](https://github.com/OctopusDeploy/install-octopus-cli-action/compare/v1.1.9...v1.1.10) (2022-03-13)


### Bug Fixes

* Commit dist changes ([86b2e2e](https://github.com/OctopusDeploy/install-octopus-cli-action/commit/86b2e2e03823da0ce870b394a4f5980475f1c17e))

### [1.1.8](https://www.github.com/OctopusDeploy/install-octopus-cli-action/compare/v1.1.7...v1.1.8) (2021-10-27)


### Bug Fixes

* removed eslint plugin (compatibility) ([03e0e42](https://www.github.com/OctopusDeploy/install-octopus-cli-action/commit/03e0e42aa2dee5b7db4faa7f0d3c116640686d85))

### [1.1.7](https://www.github.com/OctopusDeploy/install-octopus-cli-action/compare/v1.1.6...v1.1.7) (2021-09-18)


### Miscellaneous Chores

* release 1.1.7 ([c58fed5](https://www.github.com/OctopusDeploy/install-octopus-cli-action/commit/c58fed5e1cf648ea84fe27eae5413c8bf4dec64f))

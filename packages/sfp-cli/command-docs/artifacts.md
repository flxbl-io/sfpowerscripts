`@flxbl-io/sfp artifacts`
=========================

Manage artifacts for a project

* [`@flxbl-io/sfp artifacts fetch`](#flxbl-iosfp-artifacts-fetch)
* [`@flxbl-io/sfp artifacts promote`](#flxbl-iosfp-artifacts-promote)
* [`@flxbl-io/sfp artifacts query`](#flxbl-iosfp-artifacts-query)

## `@flxbl-io/sfp artifacts fetch`

Fetch sfp artifacts from a NPM compatible registry using a release definition file

```
USAGE
  $ @flxbl-io/sfp artifacts fetch -d <value> [-p <value>] [--scope <value> [--npm | -f <value>]] [--npmrcpath <value>
    ] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]

FLAGS
  -d, --artifactdir=<value>        (required) [default: artifacts] Directory to save downloaded artifacts
  -f, --scriptpath=<value>         (Optional: no-NPM) Path to script that authenticates and downloads artifacts from the
                                   registry
  -p, --releasedefinition=<value>  Path to YAML file containing map of packages and package versions to download
      --loglevel=<option>          [default: info] logging level for this command invocation
                                   <options: trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL>
      --npm                        Download artifacts from a pre-authenticated private npm registry
      --npmrcpath=<value>          Path to .npmrc file used for authentication to registry. If left blank, defaults to
                                   home directory
      --scope=<value>              (required for NPM) User or Organisation scope of the NPM package

DESCRIPTION
  Fetch sfp artifacts from a NPM compatible registry using a release definition file

EXAMPLES
  $ sfp artifacts:fetch -p myreleasedefinition.yaml -f myscript.sh

  $ sfp artifacts:fetch -p myreleasedefinition.yaml --npm --scope myscope --npmrcpath path/to/.npmrc
```

_See code: [src/commands/artifacts/fetch.ts](https://github.com/flxbl-io/sfp/blob/v37.0.1/src/commands/artifacts/fetch.ts)_

## `@flxbl-io/sfp artifacts promote`

Promotes artifacts predominantly for unlocked packages with code coverage greater than 75%

```
USAGE
  $ @flxbl-io/sfp artifacts promote -v <value> -d <value> [--loglevel
    trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]

FLAGS
  -d, --artifactdir=<value>           (required) [default: artifacts] The directory where artifacts are located
  -v, --targetdevhubusername=<value>  (required) Username or alias of the Dev Hub org.
      --loglevel=<option>             [default: info] logging level for this command invocation
                                      <options: trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL>

DESCRIPTION
  Promotes artifacts predominantly for unlocked packages with code coverage greater than 75%

ALIASES
  $ @flxbl-io/sfp orchestrator promote

EXAMPLES
  $ sfp promote -d path/to/artifacts -v <org>
```

_See code: [src/commands/artifacts/promote.ts](https://github.com/flxbl-io/sfp/blob/v37.0.1/src/commands/artifacts/promote.ts)_

## `@flxbl-io/sfp artifacts query`

Fetch details about artifacts installed in a target org

```
USAGE
  $ @flxbl-io/sfp artifacts query -o <value> [--json] [--loglevel
    trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]

FLAGS
  -o, --targetusername=<value>  (required) Username or alias of the target org.
      --loglevel=<option>       [default: info] logging level for this command invocation
                                <options: trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL>

GLOBAL FLAGS
  --json  Format output as json.

DESCRIPTION
  Fetch details about artifacts installed in a target org

EXAMPLES
  $ sfp artifacts:query -o <target_org>
```

_See code: [src/commands/artifacts/query.ts](https://github.com/flxbl-io/sfp/blob/v37.0.1/src/commands/artifacts/query.ts)_

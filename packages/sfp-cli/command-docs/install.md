`@flxbl-io/sfp install`
=======================

Installs artifact(s) from a given directory to a target org

* [`@flxbl-io/sfp install`](#flxbl-iosfp-install)

## `@flxbl-io/sfp install`

Installs artifact(s) from a given directory to a target org

```
USAGE
  $ @flxbl-io/sfp install -o <value> [--artifactdir <value>] [--waittime <value>] [-t <value>] [-b <value>
    --skipifalreadyed] [-p <value>] [--releaseconfig <value>] [--enablesourcetracking] [-g <value>] [--loglevel
    trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]

FLAGS
  -b, --baselineorg=<value>         The org against which the package skip should be baselined
  -g, --logsgroupsymbol=<value>...  Symbol used by CICD platform to group/collapse logs in the console. Provide an
                                    opening group, and an optional closing group symbol.
  -o, --targetorg=<value>           (required) Username or alias of the target org.
  -p, --artifacts=<value>...        Only install artifacts for the provided packages, use comma separated list of
                                    package names if there are multiple packages
  -t, --tag=<value>                 Tag the deploy with a label, useful for identification in metrics
      --artifactdir=<value>         [default: artifacts] The directory containing artifacts to be deployed
      --enablesourcetracking        Enable source tracking on the packages being deployed to an org
      --loglevel=<option>           [default: info] logging level for this command invocation
                                    <options: trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL>
      --releaseconfig=<value>       Path to the config file which determines how the packages are deployed based on the
                                    filters in release config
      --skipifalreadyinstalled      Skip the package installation if the package is already installed in the org
      --waittime=<value>            [default: 120] Wait time for command to finish in minutes

DESCRIPTION
  Installs artifact(s) from a given directory to a target org

ALIASES
  $ @flxbl-io/sfp orchestrator deploy
  $ @flxbl-io/sfp deploy

EXAMPLES
  $ sfp install -o <username>
```

_See code: [src/commands/install.ts](https://github.com/flxbl-io/sfp/blob/v37.0.1/src/commands/install.ts)_

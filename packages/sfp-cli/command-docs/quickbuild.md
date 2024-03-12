`@flxbl-io/sfp quickbuild`
==========================

Build artifact(s) of your packages in the current project without dependency validation for unlocked packages

* [`@flxbl-io/sfp quickbuild`](#flxbl-iosfp-quickbuild)

## `@flxbl-io/sfp quickbuild`

Build artifact(s) of your packages in the current project without dependency validation for unlocked packages

```
USAGE
  $ @flxbl-io/sfp quickbuild -v <value> --branch <value> [--loglevel
    trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL] [--apiversion <value>] [--diffcheck] [-p
    <value>] [-r <value>] [-f <value>] [--artifactdir <value>] [--waittime <value>] [--buildnumber <value>]
    [--executorcount <value>] [--tag <value>] [--releaseconfig <value>]

FLAGS
  -f, --configfilepath=<value>    [default: config/project-scratch-def.json] Path in the current project directory
                                  containing  config file for the packaging org
  -p, --buildOnly=<value>...      Only build artifacts for the provided package names,use comma separated list of
                                  package names if there are multiple packages
  -r, --repourl=<value>           Custom source repository URL to use in artifact metadata, overrides origin URL defined
                                  in git config
  -v, --devhubalias=<value>       (required) Username or alias of the Dev Hub org.
      --apiversion=<value>        Override the api version used for api requests made by this command
      --artifactdir=<value>       [default: artifacts] The directory where the generated artifact is to be written
      --branch=<value>            (required) [default: main] The git branch that this build is triggered on, Useful for
                                  metrics and general identification purposes
      --buildnumber=<value>       [default: 1] The build number to be used for source packages, Unlocked Packages will
                                  be assigned the buildnumber from Salesforce directly if using .NEXT
      --diffcheck                 Only build the packages which have changed by analyzing previous tags
      --executorcount=<value>     [default: 5] Number of parallel package task schedulors
      --loglevel=<option>         [default: info] logging level for this command invocation
                                  <options: trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL>
      --releaseconfig=<value>...  Path to the release config file(s) to limit packages built by domains
      --tag=<value>               Tag the build with a label, useful to identify in metrics
      --waittime=<value>          [default: 120] Wait time for command to finish in minutes

DESCRIPTION
  Build artifact(s) of your packages in the current project without dependency validation for unlocked packages

ALIASES
  $ @flxbl-io/sfp orchestrator quickbuild
```

_See code: [src/commands/quickbuild.ts](https://github.com/flxbl-io/sfp/blob/v37.0.1/src/commands/quickbuild.ts)_

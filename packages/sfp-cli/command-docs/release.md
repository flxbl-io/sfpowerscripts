`@flxbl-io/sfp release`
=======================

Release a set of artifact(s) as defined by a release definition into a target org

* [`@flxbl-io/sfp release`](#flxbl-iosfp-release)

## `@flxbl-io/sfp release`

Release a set of artifact(s) as defined by a release definition into a target org

```
USAGE
  $ @flxbl-io/sfp release -p <value> -o <value> [--scope <value> [--npm | -f <value>]] [--npmrcpath <value> ]
    [-g <value>] [-t <value>] [--waittime <value>] [--keys <value>] [-d <value>] [-b <value> --generatechangelog] [-v
    <value>] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]

FLAGS
  -b, --branchname=<value>            Repository branch in which the changelog files are located
  -d, --directory=<value>             Relative path to directory to which the changelog should be generated, if the
                                      directory doesnt exist, it will be created
  -f, --scriptpath=<value>            (Optional: no-NPM) Path to script that authenticates and downloads artifacts from
                                      the registry
  -g, --logsgroupsymbol=<value>...    Symbol used by CICD platform to group/collapse logs in the console. Provide an
                                      opening group, and an optional closing group symbol.
  -o, --targetorg=<value>             (required) Username or alias of the target org.
  -p, --releasedefinition=<value>...  (required) Path to release definiton yaml, Multiple paths can be seperated by
                                      commas
  -t, --tag=<value>                   Tag the release with a label, useful for identification in metrics
  -v, --devhubalias=<value>           Username or alias of the Dev Hub org.
      --generatechangelog             Create a release changelog
      --keys=<value>                  Keys to be used while installing any managed package dependencies. Required format
                                      is a string of key-value pairs separated by spaces e.g. packageA:pw123
                                      packageB:pw123 packageC:pw123
      --loglevel=<option>             [default: info] logging level for this command invocation
                                      <options: trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL>
      --npm                           Download artifacts from a pre-authenticated private npm registry
      --npmrcpath=<value>             Path to .npmrc file used for authentication to registry. If left blank, defaults
                                      to home directory
      --scope=<value>                 (required for NPM) User or Organisation scope of the NPM package
      --waittime=<value>              [default: 120] Wait time for package installation

DESCRIPTION
  Release a set of artifact(s) as defined by a release definition into a target org

ALIASES
  $ @flxbl-io/sfp orchestrator release

EXAMPLES
  sfp release -p path/to/releasedefinition.yml -u myorg --npm --scope myscope --generatechangelog
```

_See code: [src/commands/release.ts](https://github.com/flxbl-io/sfp/blob/v37.0.1/src/commands/release.ts)_

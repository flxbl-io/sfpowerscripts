`@flxbl-io/sfp releasedefinition`
=================================

Commands around managing release definition

* [`@flxbl-io/sfp releasedefinition generate`](#flxbl-iosfp-releasedefinition-generate)

## `@flxbl-io/sfp releasedefinition generate`

Generates release definition based on the artifacts at the specified head of source branch/commit ref

```
USAGE
  $ @flxbl-io/sfp releasedefinition generate -c <value> -f <value> -n <value> [-b <value>] [-d <value>] [--nopush] [--forcepush
    ] [-m <value>] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]

FLAGS
  -b, --branchname=<value>   Repository branch in which the release definition files are to be written
  -c, --gitref=<value>       (required) Utilize the tags on the source branch to generate release definition
  -d, --directory=<value>    Relative path to directory to which the release definition file should be generated, if the
                             directory doesnt exist, it will be created
  -f, --configfile=<value>   (required) Path to the release config file which determines how the release definition
                             should be generated
  -m, --metadata=<value>     Additional metadata in json format that needs to be added to the release definition file
  -n, --releasename=<value>  (required) Set a release name on the release definition file created
      --forcepush            Force push changes to the repository branch
      --loglevel=<option>    [default: info] logging level for this command invocation
                             <options: trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL>
      --nopush               Do not push the changelog to a repository to the provided branch

DESCRIPTION
  Generates release definition based on the artifacts at the specified head of source branch/commit ref

EXAMPLES
  $ sfp releasedefinition:generate -n <releaseName> -c <gitref> -f <configfile>
```

_See code: [src/commands/releasedefinition/generate.ts](https://github.com/flxbl-io/sfp/blob/v37.0.1/src/commands/releasedefinition/generate.ts)_

`@flxbl-io/sfp publish`
=======================

Publish packages to a NPM Compatible artifact registry

* [`@flxbl-io/sfp publish`](#flxbl-iosfp-publish)

## `@flxbl-io/sfp publish`

Publish packages to a NPM Compatible artifact registry

```
USAGE
  $ @flxbl-io/sfp publish -d <value> [-p -v <value>] [-t <value>] [--gittag] [--gittaglimit <value>]
    [--gittagage <value>] [--pushgittag] [--scope <value> [--npm | -f <value>]] [--npmtag <value> ] [--npmrcpath <value>
    ] [-g <value>] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]

FLAGS
  -d, --artifactdir=<value>         (required) [default: artifacts] The directory containing artifacts to be published
  -f, --scriptpath=<value>          Path to script that authenticates and uploaded artifacts to the registry
  -g, --logsgroupsymbol=<value>...  Symbol used by CICD platform to group/collapse logs in the console. Provide an
                                    opening group, and an optional closing group symbol.
  -p, --publishpromotedonly         Only publish unlocked packages that have been promoted
  -t, --tag=<value>                 Tag the publish with a label, useful for identification in metrics
  -v, --devhubalias=<value>         Username or alias of the Dev Hub org.
      --gittag                      Tag the current commit ID with an annotated tag containing the package name and
                                    version - does not push tag
      --gittagage=<value>           Specifies the number of days,for a tag to be retained,any tags older the provided
                                    number will be deleted
      --gittaglimit=<value>         Specifies the minimum number of  tags to be retained for a package
      --loglevel=<option>           [default: info] logging level for this command invocation
                                    <options: trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL>
      --npm                         Upload artifacts to a pre-authenticated private npm registry
      --npmrcpath=<value>           Path to .npmrc file used for authentication to registry. If left blank, defaults to
                                    home directory
      --npmtag=<value>              Add an optional distribution tag to NPM packages. If not provided, the 'latest' tag
                                    is set to the published version.
      --pushgittag                  Pushes the git tags created by this command to the repo, ensure you have access to
                                    the repo
      --scope=<value>               (required for NPM) User or Organisation scope of the NPM package

DESCRIPTION
  Publish packages to a NPM Compatible artifact registry

ALIASES
  $ @flxbl-io/sfp orchestrator publish

EXAMPLES
  $ sfp publish --npm
```

_See code: [src/commands/publish.ts](https://github.com/flxbl-io/sfp/blob/v37.0.1/src/commands/publish.ts)_

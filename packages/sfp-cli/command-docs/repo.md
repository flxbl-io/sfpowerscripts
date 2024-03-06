`@flxblio/sfp repo`
===================

Manage your project repository

* [`@flxblio/sfp repo patch`](#flxbliosfp-repo-patch)

## `@flxblio/sfp repo patch`

Generate a dynamic branch with the packages patched to the contents as mentioned in the release config file

```
USAGE
  $ @flxblio/sfp repo patch -p <value> -s <value> -t <value> [--scope <value> [--npm | -f <value>]] [--npmrcpath
    <value> ] [-g <value>] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]

FLAGS
  -f, --scriptpath=<value>             (Optional: no-NPM) Path to script that authenticates and downloads artifacts from
                                       the registry
  -g, --logsgroupsymbol=<value>...     Symbol used by CICD platform to group/collapse logs in the console. Provide an
                                       opening group, and an optional closing group symbol.
  -p, --releasedefinitions=<value>...  (required) Path to release definiton yaml
  -s, --sourcebranchname=<value>       (required) Name of the source branch to be used on which the alignment need to be
                                       applied
  -t, --targetbranchname=<value>       (required) Name of the target branch to be created after the alignment
      --loglevel=<option>              [default: info] logging level for this command invocation
                                       <options: trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL>
      --npm                            Download artifacts from a pre-authenticated private npm registry
      --npmrcpath=<value>              Path to .npmrc file used for authentication to registry. If left blank, defaults
                                       to home directory
      --scope=<value>                  (required for NPM) User or Organisation scope of the NPM package

DESCRIPTION
  Generate a dynamic branch with the packages patched to the contents as mentioned in the release config file

EXAMPLES
  $ sfp repo:patch -n <releaseName>
```

_See code: [src/commands/repo/patch.ts](https://github.com/flxbl-io/sfp)_

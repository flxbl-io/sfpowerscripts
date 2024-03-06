`@flxblio/sfp dependency`
=========================

Manage the dependencies of a project

* [`@flxblio/sfp dependency expand`](#flxbliosfp-dependency-expand)
* [`@flxblio/sfp dependency install`](#flxbliosfp-dependency-install)
* [`@flxblio/sfp dependency shrink`](#flxbliosfp-dependency-shrink)

## `@flxblio/sfp dependency expand`

Expand the dependency list in sfdx-project.json file for each package, fix the gap of dependencies from its dependent packages

```
USAGE
  $ @flxblio/sfp dependency expand -v <value> [-o] [--loglevel
    trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]

FLAGS
  -o, --overwrite                     Flag to overwrite existing sfdx-project.json file
  -v, --targetdevhubusername=<value>  (required) Username or alias of the Dev Hub org.
      --loglevel=<option>             [default: info] logging level for this command invocation
                                      <options: trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL>

DESCRIPTION
  Expand the dependency list in sfdx-project.json file for each package, fix the gap of dependencies from its dependent
  packages
```

_See code: [src/commands/dependency/expand.ts](https://github.com/flxbl-io/sfp)_

## `@flxblio/sfp dependency install`

Install all the external dependencies of a given project

```
USAGE
  $ @flxblio/sfp dependency install -u <value> -v <value> [-k <value>] [--loglevel
    trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]

FLAGS
  -k, --installationkeys=<value>      Installation key for key-protected packages (format is packagename:key -->
                                      core:key nCino:key vlocity:key to allow some packages without installation key)
  -u, --targetusername=<value>        (required) Username or alias of the target org.
  -v, --targetdevhubusername=<value>  (required) Username or alias of the Dev Hub org.
      --loglevel=<option>             [default: info] logging level for this command invocation
                                      <options: trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL>

DESCRIPTION
  Install all the external dependencies of a given project
```

_See code: [src/commands/dependency/install.ts](https://github.com/flxbl-io/sfp)_

## `@flxblio/sfp dependency shrink`

Shrink the dependency list in sfdx-project.json file for each package, remove duplicate dependencies that already exist in its dependent packages

```
USAGE
  $ @flxblio/sfp dependency shrink -v <value> [-o] [--loglevel
    trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]

FLAGS
  -o, --overwrite                     Flag to overwrite existing sfdx-project.json file
  -v, --targetdevhubusername=<value>  (required) Username or alias of the Dev Hub org.
      --loglevel=<option>             [default: info] logging level for this command invocation
                                      <options: trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL>

DESCRIPTION
  Shrink the dependency list in sfdx-project.json file for each package, remove duplicate dependencies that already
  exist in its dependent packages
```

_See code: [src/commands/dependency/shrink.ts](https://github.com/flxbl-io/sfp)_

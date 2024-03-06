`@flxblio/sfp impact`
=====================

Utilities to help you understand the impact of various components in sfp

* [`@flxblio/sfp impact package`](#flxbliosfp-impact-package)
* [`@flxblio/sfp impact releaseconfig`](#flxbliosfp-impact-releaseconfig)

## `@flxblio/sfp impact package`

Figures out impacted packages of a project, due to a change from the last known tags

```
USAGE
  $ @flxblio/sfp impact package --basebranch <value> [--loglevel
    trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]

FLAGS
  --basebranch=<value>  (required) The base branch on which the git tags should be used
  --loglevel=<option>   [default: info] logging level for this command invocation
                        <options: trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL>

DESCRIPTION
  Figures out impacted packages of a project, due to a change from the last known tags
```

_See code: [src/commands/impact/package.ts](https://github.com/flxbl-io/sfp)_

## `@flxblio/sfp impact releaseconfig`

Figures out impacted release configurations of a project, due to a change,from the last known tags

```
USAGE
  $ @flxblio/sfp impact releaseconfig --basebranch <value> [--loglevel
    trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL] [--branch <value>] [--releaseconfig <value>]
    [--explicitDependencyCheck] [--filterBy <value>] [--filterByChangesInBranch]

FLAGS
  --basebranch=<value>       (required) The base branch on which the git tags should be used from
  --branch=<value>           The branch on which the comparison is carried out
  --explicitDependencyCheck  Activate to consider dependencyOn attribut while handling impact
  --filterBy=<value>         Filter by a specific release config name
  --filterByChangesInBranch  Filter packages by changes with the provided branches as opposed to tags
  --loglevel=<option>        [default: info] logging level for this command invocation
                             <options: trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL>
  --releaseconfig=<value>    [default: config] Path to the directory containing release defns

DESCRIPTION
  Figures out impacted release configurations of a project, due to a change,from the last known tags
```

_See code: [src/commands/impact/releaseconfig.ts](https://github.com/flxbl-io/sfp)_

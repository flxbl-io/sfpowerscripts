`@flxbl-io/sfp changelog`
=========================

Track your artifacts & user stories as they progress through different environments, with release changelogs

* [`@flxbl-io/sfp changelog generate`](#flxbl-iosfp-changelog-generate)

## `@flxbl-io/sfp changelog generate`

Generates release changelog, providing a summary of artifact versions, work items and commits introduced in a release. Creates a release definition based on artifacts contained in the artifact directory, and compares it to previous release definition in changelog stored on a source repository

```
USAGE
  $ @flxbl-io/sfp changelog generate -d <value> -n <value> -w <value> [--limit <value>] [--workitemurl <value>]
    [--directory <value>] (--nopush -b <value>) [--showallartifacts] [--loglevel
    trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]

FLAGS
  -b, --branchname=<value>      (required) Repository branch in which the changelog files are located
  -d, --artifactdir=<value>     (required) [default: artifacts] Directory containing sfp artifacts
  -n, --releasename=<value>     (required) Name of the release for which to generate changelog
  -w, --workitemfilter=<value>  (required) Regular expression used to search for work items (user stories) introduced in
                                release
      --directory=<value>       Relative path to directory to which the release definition file should be generated, if
                                the directory doesnt exist, it will be created
      --limit=<value>           limit the number of releases to display in changelog markdown
      --loglevel=<option>       [default: info] logging level for this command invocation
                                <options: trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL>
      --nopush                  Do not push the changelog to a repository to the provided branch
      --showallartifacts        Show all artifacts in changelog markdown, including those that have not changed in the
                                release
      --workitemurl=<value>     Generic URL for work items. Each work item ID will be appended to the URL, providing
                                quick access to work items

DESCRIPTION
  Generates release changelog, providing a summary of artifact versions, work items and commits introduced in a release.
  Creates a release definition based on artifacts contained in the artifact directory, and compares it to previous
  release definition in changelog stored on a source repository

EXAMPLES
  $ sfp changelog:generate -n <releaseName> -d path/to/artifact/directory -w <regexp> -r <repoURL> -b <branchName>
```

_See code: [src/commands/changelog/generate.ts](https://github.com/flxbl-io/sfp/blob/v37.0.1/src/commands/changelog/generate.ts)_

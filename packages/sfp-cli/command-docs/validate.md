`@flxblio/sfp validate`
=======================

Validate a change in your project repository

* [`@flxblio/sfp validate org`](#flxbliosfp-validate-org)
* [`@flxblio/sfp validate pool`](#flxbliosfp-validate-pool)

## `@flxblio/sfp validate org`

Validate a change in your project repository against a provided org

```
USAGE
  $ @flxblio/sfp validate org -u <value> --mode
    individual|fastfeedback|thorough|ff-release-config|thorough-release-config [--releaseconfig <value>]
    [--coveragepercent <value>] [--diffcheck] [--disableartifactupdate] [-g <value>] [--basebranch <value>] [--orginfo]
    [--installdeps] (--disablesourcepkgoverride -v <value>) [--disableparalleltesting] [--loglevel
    trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]

FLAGS
  -g, --logsgroupsymbol=<value>...  Symbol used by CICD platform to group/collapse logs in the console. Provide an
                                    opening group, and an optional closing group symbol.
  -u, --targetorg=<value>           (required) Username or alias of the target org.
  -v, --devhubalias=<value>         (required) Username or alias of the Dev Hub org.
      --basebranch=<value>          The pull request base branch
      --coveragepercent=<value>     [default: 75] Minimum required percentage coverage for validating code coverage of
                                    packages with Apex classes
      --diffcheck                   Only build the packages which have changed by analyzing previous tags
      --disableartifactupdate       Do not update information about deployed artifacts to the org
      --disableparalleltesting      Disable test execution in parallel, this will execute apex tests in serial
      --disablesourcepkgoverride    Disables overriding unlocked package installation as source package installation
                                    during validate
      --installdeps                 Install dependencies during fast feedback
      --loglevel=<option>           [default: info] logging level for this command invocation
                                    <options: trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL>
      --mode=<option>               (required) [default: thorough] validation mode
                                    <options:
                                    individual|fastfeedback|thorough|ff-release-config|thorough-release-config>
      --orginfo                     Display info about the org that is used for validation
      --releaseconfig=<value>...    (Required if the release modes are ff-relese-config or thorough-release-config),
                                    Path to the config file which determines which impacted domains need to be validated

DESCRIPTION
  Validate a change in your project repository against a provided org

ALIASES
  $ @flxblio/sfp orchestrator validateagainstorg
  $ @flxblio/sfp validateagainstorg

EXAMPLES
  $ sfp validateAgainstOrg -u <targetorg>
```

_See code: [src/commands/validate/org.ts](https://github.com/flxbl-io/sfp)_

## `@flxblio/sfp validate pool`

Validate a change in your project repository against a scratch org prepared by the prepare command

```
USAGE
  $ @flxblio/sfp validate pool -p <value> -v <value> --mode
    individual|fastfeedback|thorough|ff-release-config|thorough-release-config [--installdeps] [--releaseconfig <value>]
    [--coveragepercent <value>] [--disablesourcepkgoverride] [-x] [--orginfo] [--keys <value>] [--basebranch <value>]
    [--tag <value>] [--disableparalleltesting] [--disablediffcheck] [--disableartifactupdate] [-g <value>] [--loglevel
    trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]

FLAGS
  -g, --logsgroupsymbol=<value>...    Symbol used by CICD platform to group/collapse logs in the console. Provide an
                                      opening group, and an optional closing group symbol.
  -p, --pools=<value>...              (required) Fetch scratch-org validation environment from one of listed pools,
                                      sequentially
  -v, --targetdevhubusername=<value>  (required) Username or alias of the Dev Hub org.
  -x, --deletescratchorg              Delete scratch-org validation environment, after the command has finished running
      --basebranch=<value>            The pull request base branch
      --coveragepercent=<value>       [default: 75] Minimum required percentage coverage for validating code coverage of
                                      packages with Apex classes
      --disableartifactupdate         Do not update information about deployed artifacts to the org
      --disablediffcheck              Disables diff check while validating, this will validate all the packages in the
                                      repository
      --disableparalleltesting        Disable test execution in parallel, this will execute apex tests in serial
      --disablesourcepkgoverride      Disables overriding unlocked package installation as source package installation
                                      during validate
      --installdeps                   Install dependencies during fast feedback
      --keys=<value>                  Keys to be used while installing any managed package dependencies. Required format
                                      is a string of key-value pairs separated by spaces e.g. packageA:pw123
                                      packageB:pw123 packageC:pw123
      --loglevel=<option>             [default: info] logging level for this command invocation
                                      <options: trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL>
      --mode=<option>                 (required) [default: thorough] validation mode
                                      <options:
                                      individual|fastfeedback|thorough|ff-release-config|thorough-release-config>
      --orginfo                       Display info about the org that is used for validation
      --releaseconfig=<value>...      (Required if the release modes are ff-relese-config or thorough-release-config),
                                      Path to the config file which determines which impacted domains need to be
                                      validated
      --tag=<value>                   Tag the build with a label, useful to identify in metrics

DESCRIPTION
  Validate a change in your project repository against a scratch org prepared by the prepare command

ALIASES
  $ @flxblio/sfp orchestrator validate
  $ @flxblio/sfp validate

EXAMPLES
  $ sfp validate -p "POOL_TAG_1,POOL_TAG_2" -v <devHubUsername>
```

_See code: [src/commands/validate/pool.ts](https://github.com/flxbl-io/sfp)_

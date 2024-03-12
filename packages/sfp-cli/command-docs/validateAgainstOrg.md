`@flxbl-io/sfp validateAgainstOrg`
=================================

Validate a change in your project repository against a provided org

* [`@flxbl-io/sfp validateAgainstOrg`](#flxbliosfp-validateagainstorg)

## `@flxbl-io/sfp validateAgainstOrg`

Validate a change in your project repository against a provided org

```
USAGE
  $ @flxbl-io/sfp validateAgainstOrg -u <value> --mode
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
  $ @flxbl-io/sfp orchestrator validateagainstorg

EXAMPLES
  $ sfp validateAgainstOrg -u <targetorg>
```

_See code: [src/commands/validateAgainstOrg.ts](https://github.com/flxbl-io/sfp)_

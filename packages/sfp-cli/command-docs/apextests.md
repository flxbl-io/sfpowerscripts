`@flxbl-io/sfp apextests`
=========================

Manage apex tests in a package or a org

* [`@flxbl-io/sfp apextests trigger`](#flxbl-iosfp-apextests-trigger)

## `@flxbl-io/sfp apextests trigger`

Triggers Apex unit test in an org. Supports test level RunAllTestsInPackage, which optionally allows validation of individual class code coverage

```
USAGE
  $ @flxbl-io/sfp apextests trigger -o <value> [--loglevel
    trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL] [--apiversion <value>] [-l
    RunSpecifiedTests|RunApexTestSuite|RunLocalTests|RunAllTestsInOrg|RunAllTestsInPackage] [-n <value>] [-c]
    [--validatepackagecoverage] [--specifiedtests <value>] [--apextestsuite <value>] [-p <value>] [-w <value>]

FLAGS
  -c, --validateindividualclasscoverage  Validate that individual classes have a coverage greater than the minimum
                                         required percentage coverage, only available when test level is
                                         RunAllTestsInPackage
  -l, --testlevel=<option>               [default: RunLocalTests] The test level of the test that need to be executed
                                         when the code is to be deployed
                                         <options: RunSpecifiedTests|RunApexTestSuite|RunLocalTests|RunAllTestsInOrg|Run
                                         AllTestsInPackage>
  -n, --package=<value>                  Name of the package to run tests. Required when test level is
                                         RunAllTestsInPackage
  -o, --targetusername=<value>           (required) Username or alias of the target org.
  -p, --coveragepercent=<value>          [default: 75] Minimum required percentage coverage, when validating code
                                         coverage
  -w, --waittime=<value>                 [default: 60] wait time for command to finish in minutes
      --apextestsuite=<value>            comma-separated list of Apex test suite names to run
      --apiversion=<value>               Override the api version used for api requests made by this command
      --loglevel=<option>                [default: info] logging level for this command invocation
                                         <options: trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL>
      --specifiedtests=<value>           comma-separated list of Apex test class names or IDs and, if applicable, test
                                         methods to run
      --validatepackagecoverage          Validate that the package coverage is greater than the minimum required
                                         percentage coverage, only available when test level is RunAllTestsInPackage

DESCRIPTION
  Triggers Apex unit test in an org. Supports test level RunAllTestsInPackage, which optionally allows validation of
  individual class code coverage

EXAMPLES
  $ sfp apextests:trigger -o scratchorg -l RunLocalTests -s

  $ sfp apextests:trigger -o scratchorg -l RunAllTestsInPackage -n <mypackage> -c
```

_See code: [src/commands/apextests/trigger.ts](https://github.com/flxbl-io/sfp/blob/v37.0.1/src/commands/apextests/trigger.ts)_

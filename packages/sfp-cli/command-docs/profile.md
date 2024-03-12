`@flxbl-io/sfp profile`
=======================

Commands to manage profiles in your project or org

* [`@flxbl-io/sfp profile merge`](#flxbl-iosfp-profile-merge)
* [`@flxbl-io/sfp profile reconcile`](#flxbl-iosfp-profile-reconcile)
* [`@flxbl-io/sfp profile retrieve`](#flxbl-iosfp-profile-retrieve)

## `@flxbl-io/sfp profile merge`

Merge changes made in the profile directly in the org to the profile files in the local project

```
USAGE
  $ @flxbl-io/sfp profile merge -o <value> [-f <value>] [-n <value>] [-m <value>] [-d] [--apiversion <value>]
    [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]

FLAGS
  -d, --delete                  set this flag to delete profile files that does not exist in the org.
  -f, --folder=<value>...       comma separated list of folders to scan for profiles. If ommited, the folders in the
                                packageDirectories configuration will be used.
  -m, --metadata=<value>...     comma separated list of metadata for which the permissions will be retrieved.
  -n, --profilelist=<value>...  comma separated list of profiles. If ommited, all the profiles found in the folder(s)
                                will be merged
  -o, --targetorg=<value>       (required) Username or alias of the target org.
      --apiversion=<value>      Override the api version used for api requests made by this command
      --loglevel=<option>       [default: info] logging level for this command invocation
                                <options: trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL>

DESCRIPTION
  Merge changes made in the profile directly in the org to the profile files in the local project

EXAMPLES
  $ sfp profile:merge -o sandbox

  $ sfp profile:merge -f force-app -n "My Profile" -u sandbox

  $ sfp  profile:merge -f "module1, module2, module3" -n "My Profile1, My profile2"  -u sandbox
```

_See code: [src/commands/profile/merge.ts](https://github.com/flxbl-io/sfp/blob/v37.0.1/src/commands/profile/merge.ts)_

## `@flxbl-io/sfp profile reconcile`

Reconcile profiles in the local directory only with the attributes that are available in the target org

```
USAGE
  $ @flxbl-io/sfp profile reconcile -o <value> [-f <value>] [-n <value>] [-d <value>] [-s] [--apiversion <value>]
    [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]

FLAGS
  -d, --destfolder=<value>      the destination folder for reconciled profiles, if omitted existing profiles will be
                                reconciled and will be rewritten in the current location
  -f, --folder=<value>...       path to the folder which contains the profiles to be reconciled,if project contain
                                multiple package directories, please provide a comma seperated list, if omitted, all the
                                package directories will be checked for profiles
  -n, --profilelist=<value>...  list of profiles to be reconciled. If ommited, all the profiles components will be
                                reconciled.
  -o, --targetorg=<value>       (required) Username or alias of the target org.
  -s, --sourceonly              set this flag to reconcile profiles only against component available in the project
                                only. Configure ignored perissions in sfdx-project.json file in the array
                                plugins->sfpowerkit->ignoredPermissions.
      --apiversion=<value>      Override the api version used for api requests made by this command
      --loglevel=<option>       [default: info] logging level for this command invocation
                                <options: trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL>

DESCRIPTION
  Reconcile profiles in the local directory only with the attributes that are available in the target org

EXAMPLES
  $ sfp profile:reconcile  --folder force-app -d destfolder -s

  $ sfp profile:reconcile  --folder force-app,module2,module3 -o sandbox -d destfolder

  $ sfp profile:reconcile  -o myscratchorg -d destfolder
```

_See code: [src/commands/profile/reconcile.ts](https://github.com/flxbl-io/sfp/blob/v37.0.1/src/commands/profile/reconcile.ts)_

## `@flxbl-io/sfp profile retrieve`

Retrieve profiles from the salesforce org with all its associated permissions. Common use case for this command is  to migrate profile changes from a integration environment to other higher environments [overcomes SFDX CLI Profile retrieve issue where it doesnt fetch the full profile unless the entire metadata is present in source], or retrieving profiles from production to lower environments for testing.

```
USAGE
  $ @flxbl-io/sfp profile retrieve -o <value> [-f <value>] [-n <value>] [-d] [--apiversion <value>] [--loglevel
    trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]

FLAGS
  -d, --delete                  set this flag to delete profile files that does not exist in the org, when retrieving in
                                bulk
  -f, --folder=<value>...       retrieve only updated versions of profiles found in this directory, If ignored, all
                                profiles will be retrieved.
  -n, --profilelist=<value>...  comma separated list of profiles to be retrieved. Use it for selectively retrieving an
                                existing profile or retrieving a new profile
  -o, --targetorg=<value>       (required) Username or alias of the target org.
      --apiversion=<value>      Override the api version used for api requests made by this command
      --loglevel=<option>       [default: info] logging level for this command invocation
                                <options: trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL>

DESCRIPTION
  Retrieve profiles from the salesforce org with all its associated permissions. Common use case for this command is  to
  migrate profile changes from a integration environment to other higher environments [overcomes SFDX CLI Profile
  retrieve issue where it doesnt fetch the full profile unless the entire metadata is present in source], or retrieving
  profiles from production to lower environments for testing.

EXAMPLES
  $ sfp profile:retrieve -o prod

  $ sfp profile:retrieve -f force-app -n "My Profile" -o prod

  $ sfp profile:retrieve -f "module1, module2, module3" -n "My Profile1, My profile2"  -o prod
```

_See code: [src/commands/profile/retrieve.ts](https://github.com/flxbl-io/sfp/blob/v37.0.1/src/commands/profile/retrieve.ts)_

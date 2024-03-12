`@flxbl-io/sfp flow`
====================

Manage flows in your org

* [`@flxbl-io/sfp flow activate`](#flxbl-iosfp-flow-activate)
* [`@flxbl-io/sfp flow cleanup`](#flxbl-iosfp-flow-cleanup)
* [`@flxbl-io/sfp flow deactivate`](#flxbl-iosfp-flow-deactivate)

## `@flxbl-io/sfp flow activate`

Activate the flow on a target org

```
USAGE
  $ @flxbl-io/sfp flow activate -o <value> [-f <value>] [-p <value>] [--loglevel
    trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]

FLAGS
  -f, --developername=<value>    The developer name of the flow
  -o, --targetorg=<value>        (required) Username or alias of the target org.
  -p, --namespaceprefix=<value>  Use to specify a specific namespace prefix
      --loglevel=<option>        [default: info] logging level for this command invocation
                                 <options: trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL>

DESCRIPTION
  Activate the flow on a target org
```

_See code: [src/commands/flow/activate.ts](https://github.com/flxbl-io/sfp/blob/v37.0.1/src/commands/flow/activate.ts)_

## `@flxbl-io/sfp flow cleanup`

Cleanup inactive flows on a target org

```
USAGE
  $ @flxbl-io/sfp flow cleanup -o <value> [-f <value>] [-p <value>] [--loglevel
    trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]

FLAGS
  -f, --developername=<value>    The developer name of the flow
  -o, --targetorg=<value>        (required) Username or alias of the target org.
  -p, --namespaceprefix=<value>  Use to specify a specific namespace prefix
      --loglevel=<option>        [default: info] logging level for this command invocation
                                 <options: trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL>

DESCRIPTION
  Cleanup inactive flows on a target org
```

_See code: [src/commands/flow/cleanup.ts](https://github.com/flxbl-io/sfp/blob/v37.0.1/src/commands/flow/cleanup.ts)_

## `@flxbl-io/sfp flow deactivate`

Deactivate the flow on a target org

```
USAGE
  $ @flxbl-io/sfp flow deactivate -o <value> [-f <value>] [-p <value>] [--loglevel
    trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]

FLAGS
  -f, --developername=<value>    The developer name of the flow
  -o, --targetorg=<value>        (required) Username or alias of the target org.
  -p, --namespaceprefix=<value>  Use to specify a specific namespace prefix
      --loglevel=<option>        [default: info] logging level for this command invocation
                                 <options: trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL>

DESCRIPTION
  Deactivate the flow on a target org
```

_See code: [src/commands/flow/deactivate.ts](https://github.com/flxbl-io/sfp/blob/v37.0.1/src/commands/flow/deactivate.ts)_

`@flxbl-io/sfp metrics`
=======================

Report metrics to sfp supported metric providers

* [`@flxbl-io/sfp metrics report`](#flxbl-iosfp-metrics-report)

## `@flxbl-io/sfp metrics report`

Report a custom metric to any sfp supported metric provider

```
USAGE
  $ @flxbl-io/sfp metrics report -m <value> -t gauge|counter|timer [-v <value>] [-g <value>] [--loglevel
    trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]

FLAGS
  -g, --tags=<value>       tags for metric
  -m, --metric=<value>     (required) metrics to publish
  -t, --type=<option>      (required) type of metric
                           <options: gauge|counter|timer>
  -v, --value=<value>      value of metric
      --loglevel=<option>  [default: info] logging level for this command invocation
                           <options: trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL>

DESCRIPTION
  Report a custom metric to any sfp supported metric provider

EXAMPLES
  $ sfp metrics:report -m <metric> -t <type> -v <value>
```

_See code: [src/commands/metrics/report.ts](https://github.com/flxbl-io/sfp/blob/v37.0.1/src/commands/metrics/report.ts)_

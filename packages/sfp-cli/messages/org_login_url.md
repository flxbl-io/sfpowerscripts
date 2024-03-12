# commandDescription

The Salesforce DX authorization URL must have the format "%s". NOTE: The SFDX authorization URL uses the "force" protocol, and not "http" or "https". Also, the "instanceUrl" inside the SFDX authorization URL doesn't include the protocol ("https://").

You have two options when creating the authorization file.

You can create a JSON file that has a top-level property named sfdxAuthUrl whose value is the authorization URL. Finally, you can create a normal text file that includes just the URL and nothing else.

The resulting JSON file contains the URL in the "sfdxAuthUrl" property of the "result" object. You can then reference the file when running this command:

    $ <%= config.bin %> <%= command.id %> --url-file authFile.json

Alternatively, you can pipe the SFDX authorization URL through standard input by using the --url-stdin flag and providing the '-' character as the value.

# flags.url-file.description

Path to a file that contains the Salesforce DX authorization URL.

# flags.url-stdin.description

Specify '-' as this flag's value to pipe the Salesforce DX authorization URL through standard input (stdin).

# flags.set-default-dev-hub.description

Set the authenticated org as the default Dev Hub.

# flags.set-default.description

Set the authenticated org as the default that all org-related commands run against.

# flags.alias.description

Alias for the org.

# authorizeCommandSuccess

Successfully authorized %s with org ID %s

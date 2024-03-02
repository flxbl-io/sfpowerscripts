const Table = require('cli-table');
import SFPLogger, { Logger, LoggerLevel } from '@flxblio/sfp-logger';
import { ZERO_BORDER_TABLE } from './TableConstants';

export default class PackageMetadataPrinter {
    public static printMetadataToDeploy(payload: any, logger: Logger) {
        //If Manifest is null, just return
        if (payload === null || payload === undefined) return;

        const table = new Table({
            head: ['Metadata Type', 'API Name'],
            chars: ZERO_BORDER_TABLE
        });

        const pushTypeMembersIntoTable = (type) => {
            if (type['members'] instanceof Array) {
                for (const member of type['members']) {
                    const item = [type.name, member];
                    table.push(item);
                }
            } else {
                const item = [type.name, type.members];
                table.push(item);
            }
        };

        if (payload['Package']['types'] instanceof Array) {
            for (const type of payload['Package']['types']) {
                pushTypeMembersIntoTable(type);
            }
        } else {
            const type = payload['Package']['types'];
            pushTypeMembersIntoTable(type);
        }
        SFPLogger.log('The following metadata will be deployed:', LoggerLevel.INFO, logger);
        SFPLogger.log(table.toString(), LoggerLevel.INFO, logger);
    }
}

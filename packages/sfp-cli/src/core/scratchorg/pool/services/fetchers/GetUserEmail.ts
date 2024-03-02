import { LoggerLevel, Org } from '@salesforce/core';

const retry = require('async-retry');
import SFPLogger from '@flxblio/sfp-logger';

export async function getUserEmail(username: string, hubOrg: Org) {
    const hubConn = hubOrg.getConnection();

    return retry(
        async (bail) => {
            if (!username) {
                bail(new Error('username cannot be null. provide a valid username'));
                return;
            }
            const query = `SELECT email FROM user WHERE username='${username}'`;

            SFPLogger.log('QUERY:' + query, LoggerLevel.TRACE);
            const results = (await hubConn.query(query)) as any;

            if (results.records.size < 1) {
                bail(new Error(`No user found with username ${username} in devhub.`));
                return;
            }
            return results.records[0].Email;
        },
        { retries: 3, minTimeout: 3000 }
    );
}

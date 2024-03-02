import { Org } from '@salesforce/core';

export default class ScratchOrgLimitsFetcher {
    constructor(private hubOrg: Org) {}

    public async getScratchOrgLimits(): Promise<any> {
        const conn = this.hubOrg.getConnection();
        const apiVersion = await conn.retrieveMaxApiVersion();
        const query_uri = `${conn.instanceUrl}/services/data/v${apiVersion}/limits`;
        const result = await conn.request(query_uri);
        return result;
    }
}

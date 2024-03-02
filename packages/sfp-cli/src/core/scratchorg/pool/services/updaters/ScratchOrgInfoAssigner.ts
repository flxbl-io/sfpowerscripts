import { LoggerLevel, Org } from '@salesforce/core';
const retry = require('async-retry');
import SFPLogger from '@flxblio/sfp-logger';
import ScratchOrgInfoFetcher from '../fetchers/ScratchOrgInfoFetcher';
import ObjectCRUDHelper from '../../../../utils/ObjectCRUDHelper';

export default class ScratchOrgInfoAssigner {
    constructor(private hubOrg: Org) {}

    public async setScratchOrgInfo(soInfo: any): Promise<boolean> {
        const hubConn = this.hubOrg.getConnection();
        const result =  await ObjectCRUDHelper.updateRecord(hubConn,'ScratchOrgInfo',soInfo);
        if(result) return true;
    }

    public async setScratchOrgStatus(username: string, status: 'Allocate' | 'InProgress' | 'Return'): Promise<boolean> {
        const scratchOrgId = await new ScratchOrgInfoFetcher(this.hubOrg).getScratchOrgInfoIdGivenUserName(username);

        return this.setScratchOrgInfo({
            Id: scratchOrgId,
            Allocation_status__c: status,
        });
    }
}

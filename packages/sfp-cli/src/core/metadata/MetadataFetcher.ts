import SFPLogger, { Logger, LoggerLevel } from '@flxblio/sfp-logger';
import SFPOrg from '../org/SFPOrg';
import { delay } from '../utils/Delay';
const fs = require('fs-extra');
import AdmZip = require('adm-zip');
import { Connection } from '@salesforce/core';
import { RetrieveResult } from 'jsforce/lib/api/metadata';
import { makeRandomId } from '../utils/RandomId';

export default class MetadataFetcher {
    constructor(protected logger: Logger) {}

   
    protected async fetchPackageFromOrg(org: SFPOrg, members: any) {
        const connection = org.getConnection();
        const apiversion = await org.getConnection().retrieveMaxApiVersion();

        const retrieveRequest = {
            apiVersion: Number(apiversion),
        };

        retrieveRequest['singlePackage'] = true;
        retrieveRequest['unpackaged'] = members;
        connection.metadata.pollTimeout = 60;
        const retrievedId = await connection.metadata.retrieve(retrieveRequest);
        SFPLogger.log(`Fetching  metadata from ${connection.getUsername()}`, LoggerLevel.DEBUG, this.logger);

        const metadata_retrieve_result = await this.checkRetrievalStatus(connection, retrievedId.id);
        if (!metadata_retrieve_result.zipFile)
            SFPLogger.log('Unable to find the requested metadata', LoggerLevel.ERROR, this.logger);

        const retriveLocation = `.sfpowerscripts/retrieved/${retrievedId.id}`;
        //Extract Security
        const zipFileName = `${retriveLocation}/unpackaged_${makeRandomId(8)}.zip`;
        fs.mkdirpSync(retriveLocation);
        fs.writeFileSync(zipFileName, metadata_retrieve_result.zipFile, {
            encoding: 'base64',
        });
        this.extract(retriveLocation, zipFileName);
       // fs.unlinkSync(zipFileName);
        return {zipLocation:zipFileName,unzippedLocation:retriveLocation};
    }

    private async checkRetrievalStatus(
        conn: Connection,
        retrievedId: string,
        isToBeLoggedToConsole: boolean = true
    ): Promise<RetrieveResult> {
        let metadata_result:RetrieveResult;

        while (true) {
            metadata_result = await conn.metadata.checkRetrieveStatus(retrievedId);

            if (metadata_result.done === false) {
                if (isToBeLoggedToConsole) SFPLogger.log(`Polling for Retrieval Status`, LoggerLevel.INFO, this.logger);
                await delay(5000);
            } else {
                //this.ux.logJson(metadata_result);
                break;
            }
        }
        return metadata_result;
    }

    
    private extract(unzippedDirectory: string, zipFile: string) {
        const zip = new AdmZip(zipFile);
        // Overwrite existing files
        zip.extractAllTo(unzippedDirectory, true);
    }
}

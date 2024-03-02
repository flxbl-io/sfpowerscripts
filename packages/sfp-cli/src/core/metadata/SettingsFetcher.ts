import SFPLogger, { Logger, LoggerLevel } from '@flxblio/sfp-logger';
import SFPOrg from '../org/SFPOrg';
const fs = require('fs-extra');
import { XMLParser } from 'fast-xml-parser';
import MetadataFetcher from './MetadataFetcher';

export default class SettingsFetcher extends MetadataFetcher {
    constructor(logger: Logger) {
        super(logger);
    }

    public async getSetttingMetadata(org: SFPOrg, setting: string) {
        SFPLogger.log(`Fetching ${setting}Settings from Org`, LoggerLevel.INFO, this.logger);
        const retriveLocation = (await this.fetchPackageFromOrg(org, {
            types: { name: 'Settings', members: setting },
        })).unzippedLocation;
        const resultFile = `${retriveLocation}/settings/${setting}.settings`;
        const parser = new XMLParser();
        const parsedSettings = parser.parse(fs.readFileSync(resultFile).toString())[`${setting}Settings`];
        return parsedSettings;
    }
}

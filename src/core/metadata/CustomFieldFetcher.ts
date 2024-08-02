import SFPLogger, { Logger, LoggerLevel } from '@flxbl-io/sfp-logger';
import SFPOrg from '../org/SFPOrg';
const fs = require('fs-extra');
import { XMLParser } from 'fast-xml-parser';
import MetadataFetcher from './MetadataFetcher';
import {
    ComponentSet,
    ComponentSetBuilder,
    MetadataConverter,
    RegistryAccess,
} from '@salesforce/source-deploy-retrieve';
import path from 'path';
import { SfProject } from '@salesforce/core';

export default class CustomFieldFetcher extends MetadataFetcher {
    constructor(logger: Logger) {
        super(logger);
    }

    public async getCustomFields(org: SFPOrg, fields: string[]) {
        SFPLogger.log(`Fetching Custom Fields from Org`, LoggerLevel.INFO, this.logger);
        let retriveLocation = await this.fetchPackageFromOrg(org, {
            types: { name: 'CustomField', members: fields.length > 1 ? fields : fields[0] },
        });
        const sfProjectJson = {
            packageDirectories: [
                {
                    path: 'source',
                    default: true,
                },
            ],
            name: 'retrieve',
            namespace: '',
            sourceApiVersion: await org.retrieveMaxApiVersion()
        };
        fs.mkdirpSync(path.join(retriveLocation.unzippedLocation, 'source'));
        fs.writeFileSync(
            path.join(retriveLocation.unzippedLocation, 'sfdx-project.json'),
            JSON.stringify(sfProjectJson)
        );
        //Write a force ignore file as its required for component set resolution
        fs.writeFileSync(path.resolve(retriveLocation.unzippedLocation, '.forceignore'), '# .forceignore v2');

        let sfProject = await SfProject.resolve(retriveLocation.unzippedLocation);
        let metadataConverter = new MetadataConverter(new RegistryAccess(undefined, sfProject.getPath()));
        let componentSet = await ComponentSetBuilder.build({
            sourcepath: [path.resolve(retriveLocation.unzippedLocation)],
            manifest: undefined,
            metadata:  undefined,
            projectDir: sfProject.getPath(),
        });
        await metadataConverter.convert(componentSet, 'source', {
            type: 'directory',
            outputDirectory: path.join(retriveLocation.unzippedLocation,sfProject.getDefaultPackage().path),
            genUniqueDir: false,
        });
        let sourceBackedComponents = ComponentSet.fromSource(path.resolve(retriveLocation.unzippedLocation, 'source'));
        return {
            components: sourceBackedComponents,
            location: path.join(retriveLocation.unzippedLocation, 'source'),
        };
    }
}

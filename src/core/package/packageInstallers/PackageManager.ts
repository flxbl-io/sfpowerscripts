import SFPLogger, {Logger, LoggerLevel} from "@flxbl-io/sfp-logger";
import {MetadataConverter, MetadataResolver, SourceComponent} from "@salesforce/source-deploy-retrieve";
import path from "path";
const tmp = require('tmp');

export default class PackageManager {

    constructor(protected logger: Logger) {
    }

    public async merge(path1: string, path2: string, projectDir: string): Promise<SourceComponent[]> {
        const componentSet1: SourceComponent[] = new MetadataResolver()
            .getComponentsFromPath(path1);

        const componentSet2: SourceComponent[] = new MetadataResolver()
            .getComponentsFromPath(path2);

        const converter = new MetadataConverter();

        const result = await converter.convert(componentSet1, 'source', {
            type: 'merge',
            mergeWith: componentSet2,
            // If a component can't be merged, put it here by default
            defaultDirectory: path2 + '/default',
            forceIgnoredPaths: new Set([
                path.join(process.cwd(), projectDir, 'forceignores', '.buildignore'),
            ]),
        });

        SFPLogger.log(`Component Set 1 after: ${componentSet1.length}`, LoggerLevel.INFO, this.logger);
        SFPLogger.log(`Component Set 2 after: ${componentSet2.length}`, LoggerLevel.INFO, this.logger);
        SFPLogger.log(`result: ${JSON.stringify(result.converted.length)}`, LoggerLevel.INFO, this.logger);

        return result.converted;
    }

}

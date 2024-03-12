import { Logger } from '@flxbl-io/sfp-logger';
import SfpPackage from '../SfpPackage';

export default interface PropertyFetcher {
    /**
     * Retrieves property from packageDescriptor and adds its to SfpPackage by reference
     * @param packageContents
     * @param packageLogger
     */
    getsfpProperties(packageContents: SfpPackage, packageLogger?: Logger);
}

import SFPLogger from '@flxblio/sfp-logger';
import { Connection, LoggerLevel } from '@salesforce/core';
import _ from 'lodash';
import ExternalPackage2DependencyResolver from '../package/dependencies/ExternalPackage2DependencyResolver';

/**
 * Functions to deal with externalDependencyMap supplied by the user
 * to aid in resolving transitive dependencies
 */
export default class UserDefinedExternalDependencyMap {
   

    public  fetchDependencyEntries(projectConfig: any) {
        if (projectConfig.plugins?.sfp?.externalDependencyMap) {
            const externalDependencyMap = projectConfig.plugins.sfp.externalDependencyMap;
            SFPLogger.log(JSON.stringify(externalDependencyMap), LoggerLevel.DEBUG);
            return externalDependencyMap;
        }
        else
         return {};
    }

    public async addDependencyEntries(projectConfig: any, connToDevHub: Connection) {
        const externalDependencies = [];
        const updatedProjectConfig = await _.cloneDeep(projectConfig);
        const externalPackageResolver = new ExternalPackage2DependencyResolver(connToDevHub, projectConfig, null);

        const externalDependencyMap = this.fetchDependencyEntries(projectConfig);

        const externalPackage2s = await externalPackageResolver.resolveExternalPackage2DependenciesToVersions();

        for (const externalPackage2 of externalPackage2s) {
            externalDependencies.push(externalPackage2.name);
        }
        for (const dependency of externalDependencies) {
            if (!Object.keys(externalDependencyMap).includes(dependency)) {
                externalDependencyMap[dependency] = [{ package: '', versionNumber: '' }];
            }
        }
        updatedProjectConfig.plugins.sfp.externalDependencyMap = externalDependencyMap;
        return updatedProjectConfig;
    }

    public async cleanupEntries(projectConfig: any) {
        const updatedProjectConfig = await _.cloneDeep(projectConfig);
        if (updatedProjectConfig?.plugins?.sfp?.externalDependencyMap) {
            const externalDependencyMap = updatedProjectConfig.plugins.sfp.externalDependencyMap;
            for (const externalPackage of Object.keys(externalDependencyMap)) {
                if (externalDependencyMap[externalPackage][0].package == '') {
                    delete externalDependencyMap[externalPackage];
                } else if (
                    externalDependencyMap[externalPackage][0].package != '' &&
                    externalDependencyMap[externalPackage][0].versionNumber == ''
                ) {
                    delete externalDependencyMap[externalPackage][0].versionNumber;
                }
            }
        }
        return updatedProjectConfig;
    }
}

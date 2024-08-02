import ProjectConfig from '../../project/ProjectConfig';
import { COLOR_HEADER, COLOR_KEY_MESSAGE, COLOR_SUCCESS, COLOR_ERROR } from '@flxbl-io/sfp-logger';
import SFPLogger, { LoggerLevel, Logger } from '@flxbl-io/sfp-logger';
import _ from 'lodash';
import UserDefinedExternalDependencyMap from '../../project/UserDefinedExternalDependency';

export default class TransitiveDependencyResolver {
    constructor(private sfdxProjectConfig: any, private logger?: Logger) {}

    public async resolveTransitiveDependencies(): Promise<Map<string, { package: string; versionNumber?: string }[]>> {
        SFPLogger.log('Validating Project Dependencies...', LoggerLevel.INFO, this.logger);

        let clonedProjectConfig = await _.cloneDeep(this.sfdxProjectConfig);
        clonedProjectConfig = await new UserDefinedExternalDependencyMap().cleanupEntries(clonedProjectConfig);
        let pkgWithDependencies = ProjectConfig.getAllPackagesAndItsDependencies(clonedProjectConfig);
        pkgWithDependencies = this.fillDepsWithUserDefinedExternalDependencyMap(
            pkgWithDependencies,
            new UserDefinedExternalDependencyMap().fetchDependencyEntries(clonedProjectConfig)
        );
        pkgWithDependencies = this.fillDepsTransitively(pkgWithDependencies);
        let sortedPackages = this.topologicalSort(pkgWithDependencies);
        let sortedPkgWithDependencies = new Map<string, { package: string; versionNumber?: string }[]>();

        sortedPackages.forEach(pkg => {
            let dependencies = pkgWithDependencies.get(pkg) || [];
            // Remove duplicates
            let uniqueDependencies = new Map<string, { package: string; versionNumber?: string }>();
            dependencies.forEach(dep => {
                uniqueDependencies.set(dep.package, dep);
            });
            // Sort dependencies according to the topological order
            let sortedDependencies = Array.from(uniqueDependencies.values()).sort((a, b) => sortedPackages.indexOf(a.package) - sortedPackages.indexOf(b.package));
            sortedPkgWithDependencies.set(pkg, sortedDependencies);
        });

        return sortedPkgWithDependencies;
    }

    private fillDepsWithUserDefinedExternalDependencyMap(
        pkgWithDependencies: Map<string, { package: string; versionNumber?: string }[]>,
        externalDependencyMap: any
    ): Map<string, { package: string; versionNumber?: string }[]> {
        if (externalDependencyMap) {
            for (let pkg of Object.keys(externalDependencyMap)) {
                pkgWithDependencies.set(pkg, externalDependencyMap[pkg]);
            }
        }
        return pkgWithDependencies;
    }

    private fillDepsTransitively(
        pkgWithDependencies: Map<string, { package: string; versionNumber?: string }[]>
    ): Map<string, { package: string; versionNumber?: string }[]> {
        let dependencyMap = new Map(pkgWithDependencies);
        const resolveDependencies = (pkg: string) => {
            SFPLogger.log(
                COLOR_HEADER(`fetching dependencies for package:`) + COLOR_KEY_MESSAGE(pkg),
                LoggerLevel.TRACE,
                this.logger
            );
            let dependencies = dependencyMap.get(pkg) || [];
            let allDependencies = new Set(dependencies);
            dependencies.forEach(dep => {
                if (dependencyMap.has(dep.package)) {
                    let transitiveDeps = resolveDependencies(dep.package);
                    transitiveDeps.forEach(td => allDependencies.add(td));
                }
            });
            return Array.from(allDependencies);
        };
    
        for (let pkg of dependencyMap.keys()) {
            let resolvedDeps = resolveDependencies(pkg);
            dependencyMap.set(pkg, resolvedDeps);
        }
        return dependencyMap;
    }
    

    private swapAndDropArrayElement<T>(arr: T[], i: number, j: number): T[] {
        if (i < 0 || i >= arr.length || j < 0 || j >= arr.length) {
          return arr;
        }
        
        let newArr = [...arr];
        [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
        return [...newArr.slice(0, j), ...newArr.slice(j + 1)];
      }
      
      private topologicalSort(
        pkgWithDependencies: Map<string, { package: string; versionNumber?: string }[]>
    ): string[] {
        let visited = new Set<string>();
        let result: string[] = [];
    
        const visit = (pkg: string) => {
            if (!visited.has(pkg)) {
                visited.add(pkg);
                let dependencies = pkgWithDependencies.get(pkg) || [];
                dependencies.forEach(dep => visit(dep.package));
                result.push(pkg);
            }
        };
    
        for (let pkg of pkgWithDependencies.keys()) {
            visit(pkg);
        }
    
        return result;
    }
      
}

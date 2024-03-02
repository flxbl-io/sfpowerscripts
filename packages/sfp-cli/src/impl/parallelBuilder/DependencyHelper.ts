import ProjectConfig from '../../core/project/ProjectConfig';
export default class DependencyHelper {
    static getParentsToBeFullFilled(packagesWithParents: AdjacentList, packages: string[]): any {
        for (const [pkgName, parents] of Object.entries(packagesWithParents)) {
            const fulfilledParents = parents.filter((pkg_name) => packages.includes(pkg_name));
            packagesWithParents[pkgName] = fulfilledParents;
        }

        return packagesWithParents;
    }

    public static getChildsOfAllPackages(projectDirectory: string, filterByPackages?: string[]): AdjacentList {
        const projectConfig = ProjectConfig.getSFDXProjectConfig(projectDirectory);
        const dag: AdjacentList = {};

        for (const sfdx_package of projectConfig['packageDirectories']) {
            if (filterByPackages && !filterByPackages.includes(sfdx_package['package'])) {
                continue;
            }
            const dependents: string[] = [];

            for (const pkg of projectConfig['packageDirectories']) {
                if (pkg['dependencies'] != null) {
                    for (const dependent of pkg['dependencies']) {
                        if (
                            dependent['package'] == sfdx_package['package'] &&
                            filterByPackages &&
                            filterByPackages.includes(pkg['package'])
                        ) {
                            dependents.push(pkg['package']);
                        }
                    }
                }
            }
            dag[sfdx_package['package']] = dependents;
        }
        return dag;
    }

    public static getParentsOfAllPackages(projectDirectory: string, filterByPackages?: string[]): AdjacentList {
        const projectConfig = ProjectConfig.getSFDXProjectConfig(projectDirectory);
        const dag: AdjacentList = {};

        //Get The packages in the project directory
        const packagesInTheProjectDirectoryOnlyByNames: string[] = [];
        projectConfig['packageDirectories'].forEach((pkg) => {
            packagesInTheProjectDirectoryOnlyByNames.push(pkg['package']);
        });

        for (const sfdx_package of projectConfig['packageDirectories']) {
            if (filterByPackages && !filterByPackages.includes(sfdx_package['package'])) {
                continue;
            }

            const parents: string[] = [];
            if (sfdx_package['dependencies'] != null) {
                for (const dependent of sfdx_package['dependencies']) {
                    //See the dependents are a package in the project directory
                    if (
                        packagesInTheProjectDirectoryOnlyByNames.includes(dependent['package']) &&
                        !parents.includes(dependent['package']) &&
                        filterByPackages &&
                        filterByPackages.includes(dependent['package'])
                    )
                        parents.push(dependent['package']);
                }
            }
            dag[sfdx_package['package']] = parents;
        }

        return dag;
    }

    public static getParentsOfAPackage(packageList: AdjacentList, sfdx_package: string) {
        return packageList[sfdx_package];
    }
}
export type AdjacentList = {
    [key: string]: string[];
};

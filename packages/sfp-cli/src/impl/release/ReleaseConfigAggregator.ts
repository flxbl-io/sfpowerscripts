import ReleaseConfigLoader from './ReleaseConfigLoader'; // Assuming this is the file you provided
import { Logger } from '@flxblio/sfp-logger';

export class ReleaseConfigAggregator {

    private releaseConfigLoaders: ReleaseConfigLoader[] = [];

    constructor(private logger: Logger) {}

    public addReleaseConfig(pathToReleaseDefinition: string, isExplicitDependencyCheckEnabled: boolean = false) {
        const releaseConfigLoader = new ReleaseConfigLoader(this.logger, pathToReleaseDefinition, isExplicitDependencyCheckEnabled);
        this.releaseConfigLoaders.push(releaseConfigLoader);
    }

    public addReleaseConfigs(pathsToReleaseDefinitions: string[], isExplicitDependencyCheckEnabled: boolean = false) {
      pathsToReleaseDefinitions.forEach(path => {
          const releaseConfigLoader = new ReleaseConfigLoader(this.logger, path, isExplicitDependencyCheckEnabled);
          this.releaseConfigLoaders.push(releaseConfigLoader);
      });
  }

    public getAllPackages(directory?: string): string[] {
        const allPackages = new Set<string>();

        this.releaseConfigLoaders.forEach(loader => {
            const packages = loader.getPackagesAsPerReleaseConfig(directory);
            packages.forEach(pkg => allPackages.add(pkg));
        });

        return Array.from(allPackages);
    }
}

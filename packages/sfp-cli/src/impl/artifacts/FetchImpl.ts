import * as fs from 'fs-extra';
import Git from '../../core/git/Git';
import GitTags from '../../core/git/GitTags';
import ReleaseDefinition from '../release/ReleaseDefinition';
import FetchArtifactsError from './FetchArtifactsError';
import * as rimraf from 'rimraf';
import FetchArtifactSelector from './FetchArtifactSelector';
import _ from 'lodash';
import path from 'path';
import FileUtils from '../../core/utils/Fileutils';
import SFPLogger, { Logger, LoggerLevel } from '@flxblio/sfp-logger';

export default class FetchImpl {
    constructor(
        private artifactDirectory: string,
        private scriptPath: string,
        private scope: string,
        private npmrcPath: string,
        private logger:Logger
    ) {
        if (!fs.existsSync(artifactDirectory)) fs.mkdirpSync(artifactDirectory);
    }

    public async fetchArtifacts(
        releaseDefinitions: ReleaseDefinition[]
    ): Promise<{
        success: ArtifactVersion[];
        failed: ArtifactVersion[];
    }> {
        const git: Git = await Git.initiateRepo();

        const fetchedArtifacts: { success: ArtifactVersion[]; failed: ArtifactVersion[] } = {
            success: [],
            failed: [],
        };

        const allArtifacts: { name: string; version: string }[] = [];

        
        for (const releaseDefinition of releaseDefinitions) {
            //Each release will be downloaded to specific subfolder inside the provided artifact directory
            //As each release is a collection of artifacts
            
            let revisedArtifactDirectory = path.join(
                this.artifactDirectory,
                releaseDefinition.release.replace(/[/\\?%*:|"<>]/g, '-')
            );
            if(releaseDefinition.releaseConfigName)
            {
                revisedArtifactDirectory = path.join(
                    this.artifactDirectory,
                    releaseDefinition.releaseConfigName.replace(/[/\\?%*:|"<>]/g, '-'),
                    releaseDefinition.release.replace(/[/\\?%*:|"<>]/g, '-')
                );
            }

            rimraf.sync(revisedArtifactDirectory);
            fs.mkdirpSync(revisedArtifactDirectory);

            const artifactsToDownload: { name: string; version: string }[] = [];
            //additional sanity to not  repeat download
            for (const artifactEntry of Object.entries(releaseDefinition.artifacts)) {
                if (!_.includes(allArtifacts, { name: artifactEntry[0], version: artifactEntry[1] }, 0)) {
                    allArtifacts.push({ name: artifactEntry[0], version: artifactEntry[1] });
                    artifactsToDownload.push({ name: artifactEntry[0], version: artifactEntry[1] });
                }
            }

            for (const artifact of artifactsToDownload) {
                try {
                    await this.fetchAnArtifact(
                        artifact,
                        git,
                        this.scriptPath,
                        this.scope,
                        this.npmrcPath,
                        revisedArtifactDirectory
                    );

                    fetchedArtifacts.success.push(artifact);
                } catch (error) {
                    SFPLogger.log(error.message,LoggerLevel.DEBUG,this.logger);
                    fetchedArtifacts.failed.push(artifact);
                }
            }
        }

        return fetchedArtifacts;
    }

    public async fetchArtifactsProvidedVersion(
        artifactVersions: ArtifactVersion[]
    ): Promise<{
        success: ArtifactVersion[];
        failed: ArtifactVersion[];
    }> {
        const git: Git = await Git.initiateRepo();

        const fetchedArtifacts: { success: ArtifactVersion[]; failed: ArtifactVersion[] } = {
            success: [],
            failed: [],
        };

        const allArtifacts: ArtifactVersion[] = _.clone(artifactVersions);
        const revisedArtifactDirectory = path.join(this.artifactDirectory, FileUtils.makefolderid(8));
        rimraf.sync(revisedArtifactDirectory);
        fs.mkdirpSync(revisedArtifactDirectory);

        let i: number;

        for (const artifactVersion of artifactVersions) {
            try {
                await this.fetchAnArtifact(
                    artifactVersion,
                    git,
                    this.scriptPath,
                    this.scope,
                    this.npmrcPath,
                    revisedArtifactDirectory
                );

                fetchedArtifacts.success.push(artifactVersion);
            } catch (error) {
                SFPLogger.log(error.message,LoggerLevel.DEBUG,this.logger);
                fetchedArtifacts.failed.push(artifactVersion);
            }
        }

        return fetchedArtifacts;
    }

    private async fetchAnArtifact(
        artifact: ArtifactVersion,
        git: Git,
        scriptPath: string,
        scope: string,
        npmrcPath: string,
        revisedArtifactDirectory: string
    ) {
        let version: string;
        if (artifact.version === 'LATEST_TAG' || artifact.version === 'LATEST_GIT_TAG') {
            const latestGitTagVersion: GitTags = new GitTags(git, artifact.name);
            version = await latestGitTagVersion.getVersionFromLatestTag();
        } else version = artifact.version;

        const artifactFetcher = new FetchArtifactSelector(scriptPath, scope, npmrcPath).getArtifactFetcher();
        artifactFetcher.fetchArtifact(artifact.name, revisedArtifactDirectory, version, false);
    }
}
export type ArtifactVersion = {
    name: string;
    version: string;
};

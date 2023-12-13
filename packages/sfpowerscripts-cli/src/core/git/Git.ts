import SFPLogger, { Logger, LoggerLevel } from '@flxblio/sfp-logger';
import simplegit, { SimpleGit } from 'simple-git';
import fs = require('fs-extra');
import GitIdentity from './GitIdentity';
const tmp = require('tmp');

//Git Abstraction
export default class Git {
    private _git: SimpleGit;
    private repositoryLocation: string;
    private tempRepoLocation: any;
    private _isATemporaryRepo: boolean = false;

    private constructor(private projectDir?: string, private logger?: Logger) {
        if (this.projectDir) {
            this._git = simplegit(this.projectDir);
            this.repositoryLocation = this.projectDir;
        } else {
            this._git = simplegit();
            this.repositoryLocation = process.cwd();
        }
    }

    async fetch() {
        return this._git.fetch('origin');
    }

    async getHeadCommit(): Promise<string> {
        return this._git.revparse(['HEAD']);
    }

    async show(options: string[]): Promise<string> {
        return this._git.show(options);
    }

    async tag(options: string[]): Promise<string[]> {
        let tagResult = await this._git.tag(options);

        let temp: string[] = tagResult.split('\n');
        temp.pop();

        return temp;
    }

    async diff(options: string[]): Promise<string[]> {
        let diffResult = await this._git.diff(options);

        let temp: string[] = diffResult.split('\n');
        temp.pop();

        return temp;
    }

    async log(options: string[]): Promise<string[]> {
        let gitLogResult = await this._git.log(options);

        return gitLogResult['all'][0]['hash'].split('\n');
    }

    public async getRemoteOriginUrl(overrideOriginURL?: string): Promise<string> {
        let remoteOriginURL;
        if (!overrideOriginURL) {
            remoteOriginURL = (await this._git.getConfig('remote.origin.url')).value;
            if (!remoteOriginURL) {
                remoteOriginURL = (await this._git.getConfig('remote.origin.url')).value;
            }
            SFPLogger.log(`Fetched Remote URL ${remoteOriginURL}`, LoggerLevel.DEBUG);
        } else remoteOriginURL = overrideOriginURL;

        if (!remoteOriginURL) throw new Error('Remote origin must be set in repository');

        return remoteOriginURL;
    }

    public async commitFile(pathToFiles: string[], message = `[skip ci] Autogenerated commit by sfp`) {
        try {
            await new GitIdentity(this._git).setUsernameAndEmail();
            await this._git.add(pathToFiles);
            await this._git.commit(message);
            SFPLogger.log(`Committed File ${pathToFiles}`);
        } catch (error) {
            SFPLogger.log(
                `Unable to commit file, probably due to no change or something else,Please try manually`,
                LoggerLevel.ERROR
            );
            throw error;
        }
    }

    async pushTags(tags?: string[]) {
        if (!tags) await this._git.pushTags();
        else {
            for (let tag of tags) {
                await this._git.push('origin', tag);
            }
        }
    }

    async deleteTags(tags?: string[]) {
        if (tags) await this._git.push('origin', '--delete', tags);
    }

    async addAnnotatedTag(tagName: string, annotation: string, commitId?: string) {
        try {
            await new GitIdentity(this._git).setUsernameAndEmail();
            if (!commitId) {
                await this._git.addAnnotatedTag(tagName, annotation);
            } else {
                const commands = ['tag', tagName, commitId, '-m', annotation];
                await this._git.raw(commands);
            }
        } catch (error) {
            SFPLogger.log(
                `Unable to commit file, probably due to no change or something else,Please try manually`,
                LoggerLevel.ERROR
            );
            throw error;
        }
    }

    public async isBranchExists(branch: string): Promise<boolean> {
        const listOfBranches = await this._git.branch(['-la']);

        return listOfBranches.all.find((elem) => elem.endsWith(branch)) ? true : false;
    }

    static async initiateRepoAtTempLocation(logger: Logger, commitRef?: string, branch?: string): Promise<Git> {
        let locationOfCopiedDirectory = tmp.dirSync({ unsafeCleanup: true });

        SFPLogger.log(`Copying the repository to ${locationOfCopiedDirectory.name}`, LoggerLevel.INFO, logger);
        let repoDir = locationOfCopiedDirectory.name;

        // Copy source directory to temp dir
        fs.copySync(process.cwd(), repoDir);

        //Initiate git on new repo on using the abstracted object
        let git = new Git(repoDir, logger);
        git._isATemporaryRepo = true;
        git.tempRepoLocation = locationOfCopiedDirectory;

        await git.addSafeConfig(repoDir);
        await git.getRemoteOriginUrl();
        await git.fetch();
        if (branch) {
            await git.createBranch(branch);
        }
        if (commitRef) {
            await git.checkout(commitRef, true);
        }

        SFPLogger.log(
            `Successfully created temporary repository at ${repoDir} with commit ${commitRef ? commitRef : 'HEAD'}`,
            LoggerLevel.INFO,
            logger
        );
        return git;
    }

    static async initiateRepo(logger?: Logger, projectDir?: string) {
        let git = new Git(projectDir, logger);
        if (projectDir) await git.addSafeConfig(projectDir);
        else {
            await git.addSafeConfig(process.cwd());
        }
        await git.getRemoteOriginUrl();
        return git;
    }

    public getRepositoryPath() {
        return this.repositoryLocation;
    }

    async deleteTempoRepoIfAny() {
        if (this.tempRepoLocation) this.tempRepoLocation.removeCallback();
    }

    async addSafeConfig(repoDir: string) {
        try
        {
        //add workaround for safe directory (https://github.com/actions/runner/issues/2033)
        await this._git.addConfig('safe.directory', repoDir, false, 'global');
        }catch(error)
        {
            //ignore error
            SFPLogger.log(`Unable to set safe.directory`,LoggerLevel.TRACE)
        }
    }

    async pushToRemote(branch: string, isForce: boolean) {
        if (!branch) branch = (await this._git.branch()).current;
        SFPLogger.log(`Pushing ${branch}`, LoggerLevel.INFO, this.logger);
        if (process.env.sfp_OVERRIDE_ORIGIN_URL) {
            await this._git.removeRemote('origin');
            await this._git.addRemote('origin', process.env.sfp_OVERRIDE_ORIGIN_URL);
        }

        if (isForce) {
            await this._git.push('origin', branch, [`--force`]);
        } else {
            await this._git.push('origin', branch);
        }
    }

    isATemporaryRepo(): boolean {
        return this._isATemporaryRepo;
    }

    async getCurrentCommitId() {
        return this._git.revparse(['HEAD']);
    }

    async checkout(commitRef: string, isForce?: boolean) {
        if (isForce) {
            return this._git.checkout(commitRef, [`--force`]);
        } else return this._git.checkout(commitRef, {});
    }

    async checkoutPath(commitRef: string, path: string, isForce?: boolean) {
        if (isForce) {
            return this._git.checkout(commitRef, [path, `--force`]);
        } else return this._git.checkout(commitRef, [path]);
    }

    async stageChangedFiles(path: string): Promise<boolean> {
        try {
            await this._git.add(path);
            return true;
        } catch (error) {
            SFPLogger.log(`Nothing to add, ignoring`, LoggerLevel.INFO, this.logger);
            return false;
        }
    }
    async createBranch(branch: string) {
        if (await this.isBranchExists(branch)) {
            await this._git.checkout(branch, ['-f']);
            try {
                // For ease-of-use when running locally and local branch exists
                await this._git.merge([`refs/remotes/origin/${branch}`]);
            } catch (error) {
                SFPLogger.log(`Unable to find remote`, LoggerLevel.TRACE, this.logger);
            }
        } else {
            await this._git.checkout(['-b', branch]);
        }
    }
}

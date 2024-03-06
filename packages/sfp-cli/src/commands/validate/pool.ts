import { Messages } from '@salesforce/core';
import SfpCommand from '../../SfpCommand';
import ValidateImpl, { ValidateAgainst, ValidateProps, ValidationMode } from '../../impl/validate/ValidateImpl';
import SFPStatsSender from '../../core/stats/SFPStatsSender';
import SFPLogger, { COLOR_HEADER, COLOR_KEY_MESSAGE } from '@flxblio/sfp-logger';
import ValidateError from '../../errors/ValidateError';
import ValidateResult from '../../impl/validate/ValidateResult';
import * as fs from 'fs-extra';
import { arrayFlagSfdxStyle, loglevel, logsgroupsymbol, targetdevhubusername } from '../../flags/sfdxflags';
import { Flags } from '@oclif/core';
import { LoggerLevel } from '@flxblio/sfp-logger';

Messages.importMessagesDirectory(__dirname);
const messages = Messages.loadMessages('@flxblio/sfp', 'validate');

export default class ValidateAgainstPool extends SfpCommand {
    static aliases = ['orchestrator:validate', 'validate']
    protected static requiresProject = true;

    public static description = messages.getMessage('commandDescription');

    protected static requiresDevhubUsername = true;

    public static examples = [
        `$ sfp validate -p "POOL_TAG_1,POOL_TAG_2" -v <devHubUsername>`,
    ];

   //Fix Typo
    public static flags = {
        pools: arrayFlagSfdxStyle({
            char: 'p',
            description: messages.getMessage('poolsFlagDescription'),
            required: true,
        }),
        targetdevhubusername,
        mode: Flags.string({
            description: 'validation mode',
            default: 'thorough',
            required: true,
            options: ['individual', 'fastfeedback', 'thorough', 'ff-release-config', 'thorough-release-config'],
        }),
        installdeps: Flags.boolean({
            description: messages.getMessage('installDepsFlagDescription'),
            default: false,
        }),
        releaseconfig: arrayFlagSfdxStyle({
            aliases: ['domain'],
            description: messages.getMessage('releaseConfigFileFlagDescription'),
        }),
        coveragepercent: Flags.integer({
            description: messages.getMessage('coveragePercentFlagDescription'),
            default: 75,
        }),
        disablesourcepkgoverride: Flags.boolean({
            description: messages.getMessage('disableSourcePackageOverride'),
            default: false,
        }),
        deletescratchorg: Flags.boolean({
            char: 'x',
            description: messages.getMessage('deleteScratchOrgFlagDescription'),
            default: false,
        }),
        orginfo: Flags.boolean({
            description: messages.getMessage('orgInfoFlagDescription'),
            default: false,
        }),
        keys: Flags.string({
            required: false,
            description: messages.getMessage('keysFlagDescription'),
        }),
        basebranch: Flags.string({
            description: messages.getMessage('baseBranchFlagDescription'),
        }),
        tag: Flags.string({
            description: messages.getMessage('tagFlagDescription'),
        }),
        disableparalleltesting: Flags.boolean({
            description: messages.getMessage('disableParallelTestingFlagDescription'),
            default: false,
        }),
        disablediffcheck: Flags.boolean({
            description: messages.getMessage('disableDiffCheckFlagDescription'),
            default: false,
        }),
        disableartifactupdate: Flags.boolean({
            description: messages.getMessage('disableArtifactUpdateFlagDescription'),
            deprecated: {
                message: "This flag is deprecated, Artifacts used for validation are never recorded in the org "
            },
            default: false,
        }),
        logsgroupsymbol,
        loglevel
    };

    async execute(): Promise<void> {
        let executionStartTime = Date.now();

        await this.hubOrg.refreshAuth();

        let tags: { [p: string]: string };
        tags = {
            tag: this.flags.tag != null ? this.flags.tag : undefined,
            validation_mode: this.flags.mode,
            releaseConfig: this.flags.releaseconfig,
        };

        SFPLogger.log(COLOR_HEADER(`command: ${COLOR_KEY_MESSAGE(`validate`)}`));
        SFPLogger.log(COLOR_HEADER(`Pools being used: ${this.flags.pools}`));
        SFPLogger.log(
            COLOR_HEADER(
                `Validation Mode: ${COLOR_KEY_MESSAGE(
                    `${
                        ValidationMode[
                            Object.keys(ValidationMode)[
                                (Object.values(ValidationMode) as string[]).indexOf(this.flags.mode)
                            ]
                        ]
                    }`
                )}`
            )
        );
        if(this.flags.releaseconfig) {
            SFPLogger.log(COLOR_HEADER(`Domains: ${this.flags.releaseconfig}`));
        }
        if (this.flags.mode != ValidationMode.FAST_FEEDBACK) {
            SFPLogger.log(COLOR_HEADER(`Coverage Percentage: ${this.flags.coveragepercent}`));
        }
       
       

        SFPLogger.printHeaderLine('',COLOR_HEADER,LoggerLevel.INFO);

        let validateResult: ValidateResult;
        try {
            let validateProps: ValidateProps = {
                validateAgainst: ValidateAgainst.PRECREATED_POOL,
                validationMode:
                    ValidationMode[
                        Object.keys(ValidationMode)[
                            (Object.values(ValidationMode) as string[]).indexOf(this.flags.mode)
                        ]
                    ],
                coverageThreshold: this.flags.coveragepercent,
                logsGroupSymbol: this.flags.logsgroupsymbol,
                pools: this.flags.pools,
                hubOrg: this.hubOrg,
                shapeFile: this.flags.shapefile,
                isDeleteScratchOrg: this.flags.deletescratchorg,
                keys: this.flags.keys,
                baseBranch: this.flags.basebranch,
                diffcheck: !this.flags.disablediffcheck,
                disableArtifactCommit: true,
                orgInfo: this.flags.orginfo,
                disableSourcePackageOverride : this.flags.disablesourcepkgoverride,
                disableParallelTestExecution: this.flags.disableparalleltesting,
                installExternalDependencies: this.flags.installdeps,
            };

            setReleaseConfigForReleaseBasedModes(this.flags.releaseconfig,validateProps);

            let validateImpl: ValidateImpl = new ValidateImpl(validateProps);

            validateResult = await validateImpl.exec();

            SFPStatsSender.logCount('validate.succeeded', tags);
        } catch (error) {
            if (error instanceof ValidateError) {
                validateResult = error.data;
            } else SFPLogger.log(error.message);

            SFPStatsSender.logCount('validate.failed', tags);

            process.exitCode = 1;
        } finally {
            let totalElapsedTime: number = Date.now() - executionStartTime;

            SFPStatsSender.logGauge('validate.duration', totalElapsedTime, tags);

            SFPStatsSender.logCount('validate.scheduled', tags);

            if (validateResult) {
                SFPStatsSender.logGauge(
                    'validate.packages.scheduled',
                    validateResult.deploymentResult?.scheduled,
                    tags
                );

                SFPStatsSender.logGauge(
                    'validate.packages.succeeded',
                    validateResult.deploymentResult?.deployed?.length,
                    tags
                );

                SFPStatsSender.logGauge(
                    'validate.packages.failed',
                    validateResult.deploymentResult?.failed?.length,
                    tags
                );
            }
        }

        function setReleaseConfigForReleaseBasedModes(releaseConfigPaths: string[], validateProps: ValidateProps) {
            if (validateProps.validationMode == ValidationMode.FASTFEEDBACK_LIMITED_BY_RELEASE_CONFIG ||
                validateProps.validationMode == ValidationMode.THOROUGH_LIMITED_BY_RELEASE_CONFIG) {
                if (!releaseConfigPaths || releaseConfigPaths.length === 0) {
                    throw new Error(`Release config paths are required when using validation by release config`);
                }
        
                const validPaths = releaseConfigPaths.filter(path => fs.existsSync(path));
        
                if (validPaths.length === 0) {
                    throw new Error(`None of the provided release config paths exist, please check the paths: ${releaseConfigPaths.join(', ')}`);
                }
        
                // Assuming validateProps can handle an array of paths; adjust as per your implementation
                validateProps.releaseConfigPaths = validPaths;
            }
        }
    }
}
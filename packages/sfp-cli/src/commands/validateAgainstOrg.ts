import { LoggerLevel, Messages, Org } from '@salesforce/core';
import SfpCommand from '../SfpCommand';
import ValidateImpl, { ValidateAgainst, ValidateProps, ValidationMode } from '../impl/validate/ValidateImpl';
import SFPStatsSender from '../core/stats/SFPStatsSender';
import SFPLogger, { COLOR_HEADER, COLOR_KEY_MESSAGE } from '@flxblio/sfp-logger';
import * as fs from 'fs-extra';
import ValidateError from '../errors/ValidateError';
import ValidateResult from '../impl/validate/ValidateResult';
import { arrayFlagSfdxStyle, loglevel, logsgroupsymbol, requiredUserNameFlag, targetdevhubusername } from '../flags/sfdxflags';
import { Flags } from '@oclif/core';


Messages.importMessagesDirectory(__dirname);
const messages = Messages.loadMessages('@flxblio/sfp', 'validateAgainstOrg');

export default class ValidateAgainstOrg extends SfpCommand {
    public static description = messages.getMessage('commandDescription');

    public static examples = [`$ sfp validateAgainstOrg -u <targetorg>`];

    public static flags = {
        targetorg: requiredUserNameFlag,
        mode: Flags.string({
            description: 'validation mode',
            default: 'thorough',
            required: true,
            options: ['individual', 'fastfeedback', 'thorough', 'ff-release-config', 'thorough-release-config'],
        }),
        releaseconfig: arrayFlagSfdxStyle({
            aliases: ['domain'],
            description: messages.getMessage('releaseConfigFileFlagDescription'),
        }),
        coveragepercent: Flags.integer({
            description: messages.getMessage('coveragePercentFlagDescription'),
            default: 75,
        }),
        diffcheck: Flags.boolean({
            description: messages.getMessage('diffCheckFlagDescription'),
            default: false,
        }),
        disableartifactupdate: Flags.boolean({
            deprecated: {
              message: "--disableartifactupdate flag is deprecated, Artifacts used for validation are never recorded in the org "
            },
            description: messages.getMessage('disableArtifactUpdateFlagDescription'),
            default: false,
        }),
        logsgroupsymbol,
        basebranch: Flags.string({
            description: messages.getMessage('baseBranchFlagDescription'),
        }),
        orginfo: Flags.boolean({
            description: messages.getMessage('orgInfoFlagDescription'),
            default: false,
        }),
        installdeps: Flags.boolean({
            description: messages.getMessage('installDepsFlagDescription'),
            default: false,
        }),
        devhubalias: targetdevhubusername,
        disablesourcepkgoverride: Flags.boolean({
            description: messages.getMessage('disableSourcePackageOverride'),
            dependsOn:['devhubalias']
        }),
        disableparalleltesting: Flags.boolean({
            description: messages.getMessage('disableParallelTestingFlagDescription'),
            default: false,
        }),
        loglevel
    };

    async execute(): Promise<void> {
        let executionStartTime = Date.now();

        let tags: { [p: string]: string };
        tags = {
            tag: this.flags.tag != null ? this.flags.tag : undefined,
            validation_mode: this.flags.mode,
            releaseConfig: this.flags.releaseconfig,
        };

        SFPLogger.log(COLOR_HEADER(`command: ${COLOR_KEY_MESSAGE(`validateAgainstOrg`)}`));
        SFPLogger.log(COLOR_HEADER(`Target Org: ${this.flags.targetorg}`));
        if(this.flags.releaseconfig){
            SFPLogger.log(COLOR_HEADER(`Domains: ${this.flags.releaseconfig}`));
        }
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
        if (this.flags.mode != ValidationMode.FAST_FEEDBACK) {
            SFPLogger.log(COLOR_HEADER(`Coverage Percentage: ${this.flags.coveragepercent}`));
        }
      

        SFPLogger.printHeaderLine('',COLOR_HEADER,LoggerLevel.INFO);

        
        let validateResult: ValidateResult;
        try {
            let validateProps: ValidateProps = {
                validateAgainst: ValidateAgainst.PROVIDED_ORG,
                validationMode:  ValidationMode[
                    Object.keys(ValidationMode)[
                        (Object.values(ValidationMode) as string[]).indexOf(this.flags.mode)
                    ]
                ],
                coverageThreshold: this.flags.coveragepercent,
                logsGroupSymbol: this.flags.logsgroupsymbol,
                targetOrg: this.flags.targetorg,
                diffcheck: this.flags.diffcheck,
                baseBranch: this.flags.basebranch,
                disableArtifactCommit: true,
                disableSourcePackageOverride: this.flags.disablesourcepkgoverride,
                disableParallelTestExecution: this.flags.disableparalleltesting,
                orgInfo: this.flags.orginfo,
                installExternalDependencies: this.flags.installdeps,
            };


            //Add check for devhub
            if(this.flags.devhubalias)
            {
                validateProps.hubOrg = await Org.create({aliasOrUsername:this.flags.devhubalias});
            }

            setReleaseConfigForReleaseBasedModes(this.flags.releaseconfig,validateProps);
            let validateImpl: ValidateImpl = new ValidateImpl(validateProps);
            validateResult = await validateImpl.exec();
        } catch (error) {
            if (error instanceof ValidateError) {
                validateResult = error.data;
            } 

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

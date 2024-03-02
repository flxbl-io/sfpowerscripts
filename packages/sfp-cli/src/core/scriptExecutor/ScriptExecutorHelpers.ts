import ExecuteCommand from '@flxblio/sfdx-process-wrapper/lib/commandExecutor/ExecuteCommand';
import SFPLogger, { Logger, LoggerLevel } from '@flxblio/sfp-logger';
import defaultShell from '../utils/DefaultShell';

export default class scriptExecutorHelpers {
    static async executeScript(logger: Logger, ...args: string[]) {
        let cmd: string;
        const argStr =args.join(' ');
        if (process.platform !== 'win32') {
            cmd = `${defaultShell()} -e ${argStr}`;
        } else {
            cmd = `cmd.exe /c ${argStr}`;
        }

        SFPLogger.log(`Executing command.. ${cmd}`,LoggerLevel.INFO,logger);
        const scriptExecutor: ExecuteCommand = new ExecuteCommand(logger, LoggerLevel.INFO, true);
        const result = await scriptExecutor.execCommand(cmd, null);
    }
  }

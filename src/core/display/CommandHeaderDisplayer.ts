import SFPLogger, {COLOR_HEADER, COLOR_KEY_MESSAGE, ConsoleLogger, Logger, LoggerLevel} from "@flxbl-io/sfp-logger";

export default class CommandHeaderDisplayer {

    private loggerLevel: LoggerLevel;
    private readonly logger: Logger;

    constructor(logger: Logger = new ConsoleLogger()) {
        this.logger = logger;
    }

    public headerLine(): CommandHeaderDisplayer {
        SFPLogger.printHeaderLine('', COLOR_HEADER, this.loggerLevel, this.logger);
        return this;
    }

    public headerAttribute(attribute, value?): CommandHeaderDisplayer {
        SFPLogger.log(`${COLOR_HEADER(attribute)} : ${value}`, this.loggerLevel, this.logger);
        return this;
    }

    public headerAttributeIf(condition: boolean, attribute, value?): CommandHeaderDisplayer {
        if (condition) {
            SFPLogger.log(`${COLOR_HEADER(attribute)} : ${value}`, this.loggerLevel, this.logger);
        }
        return this;
    }
}

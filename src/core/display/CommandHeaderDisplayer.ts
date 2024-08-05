import SFPLogger, {COLOR_HEADER, COLOR_KEY_MESSAGE, LoggerLevel} from "@flxbl-io/sfp-logger";

export default class CommandHeaderDisplayer {

    private loggerLevel:LoggerLevel;
    constructor() {
        this.loggerLevel = LoggerLevel.INFO;
    }

    public headerLine(): CommandHeaderDisplayer {
        SFPLogger.printHeaderLine('', COLOR_HEADER, this.loggerLevel);
        return this;
    }

    public headerAttribute(attribute, value?): CommandHeaderDisplayer {
        SFPLogger.log(`${COLOR_HEADER(attribute)} : ${value}`);
        return this;
    }

    public headerAttributeIf(condition: boolean, attribute, value?): CommandHeaderDisplayer {
        if (condition){
            SFPLogger.log(`${COLOR_HEADER(attribute)} : ${value}`);
        }
        return this;
    }
}

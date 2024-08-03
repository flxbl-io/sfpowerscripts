import SFPLogger, {COLOR_HEADER, COLOR_KEY_MESSAGE, LoggerLevel} from "@flxbl-io/sfp-logger";

export default class CommandLogger {

    private loggerLevel:LoggerLevel;
    constructor() {
        this.loggerLevel = LoggerLevel.INFO;
    }

    public headerLine(): CommandLogger {
        SFPLogger.printHeaderLine('', COLOR_HEADER, this.loggerLevel);
        return this;
    }

    public logAttribute(attribute, value?): CommandLogger {
        SFPLogger.log(`${COLOR_HEADER(attribute)} : ${value}`);
        return this;
    }

    public logAttributeIf(condition: boolean, attribute, value?): CommandLogger {
        if (condition){
            SFPLogger.log(`${COLOR_HEADER(attribute)} : ${value}`);
        }
        return this;
    }
}

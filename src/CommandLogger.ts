import SFPLogger, {COLOR_HEADER, COLOR_KEY_MESSAGE, LoggerLevel} from "@flxbl-io/sfp-logger";

export default class CommandLogger {
    constructor(LoggerLevel, private topic?, private readonly loggerLevel?) {
        this.loggerLevel = LoggerLevel.INFO;
    }

    public headerLine(): CommandLogger {
        SFPLogger.printHeaderLine('', COLOR_HEADER, this.loggerLevel);
        return this;
    }

    public colored(message, topicOverride?): CommandLogger {
        SFPLogger.log(`${COLOR_HEADER(topicOverride ?? this.topic)} : ${COLOR_KEY_MESSAGE(message)}`);
        return this;
    }

    public coloredIf(condition: boolean, message, topicOverride?): CommandLogger {
        SFPLogger.log(`${COLOR_HEADER(topicOverride ?? this.topic)} : ${COLOR_KEY_MESSAGE(message)}`);
        return this;
    }
}

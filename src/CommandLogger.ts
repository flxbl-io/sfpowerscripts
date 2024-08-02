import SFPLogger, {COLOR_HEADER, COLOR_KEY_MESSAGE, LoggerLevel} from "@flxbl-io/sfp-logger";

export default class CommandLogger {
    constructor(private topic?) {
    }

    public headerLine(): CommandLogger {
        SFPLogger.printHeaderLine('', COLOR_HEADER, LoggerLevel.INFO);
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

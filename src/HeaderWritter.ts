import SFPLogger, {COLOR_HEADER, COLOR_KEY_MESSAGE, LoggerLevel} from "@flxbl-io/sfp-logger";

export default class HeaderWritter {
    constructor() {
    }

    public headerLine(): HeaderWritter {
        SFPLogger.printHeaderLine('', COLOR_HEADER, LoggerLevel.INFO);
        return this;
    }

    public colored(message): HeaderWritter {
        SFPLogger.log(COLOR_KEY_MESSAGE(`Release: ${message}`));
        return this;
    }

    public coloredIf(condition: boolean, message): HeaderWritter {
        SFPLogger.log(COLOR_KEY_MESSAGE(`Release: ${message}`));
        return this;
    }
}

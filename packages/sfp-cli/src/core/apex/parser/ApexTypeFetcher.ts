import * as fs from 'fs-extra';
const path = require('path');
const { globSync } = require('glob');

import ApexTypeListener from './listeners/ApexTypeListener';

import {
    ApexLexer,
    ApexParser,
    ApexParserListener,
    CaseInsensitiveInputStream,
    ThrowingErrorListener,
    CommonTokenStream,
    ParseTreeWalker,
} from 'apex-parser';
import SFPLogger, { LoggerLevel } from '@flxblio/sfp-logger';
import { ApexClasses } from '../../package/SfpPackage';

/**
 * Get Apex type of cls files in a search directory.
 * Sorts files into classes, test classes and interfaces.
 */
export default class ApexTypeFetcher {
    private apexSortedByType: ApexSortedByType = {
        class: [],
        testClass: [],
        interface: [],
        parseError: [],
    };

    constructor(private searchDir: string) {}

    public getClassesClassifiedByType(): ApexSortedByType {
        let clsFiles: string[];
        if (fs.existsSync(this.searchDir)) {
            clsFiles = globSync(`**/*.cls`, {
                cwd: this.searchDir,
                absolute: true,
            });
        } else {
            throw new Error(`Search directory does not exist`);
        }

        for (const clsFile of clsFiles) {
            const clsPayload: string = fs.readFileSync(clsFile, 'utf8');
            const fileDescriptor: FileDescriptor = {
                name: path.basename(clsFile, '.cls'),
                filepath: clsFile,
            };

            // Parse cls file
            let compilationUnitContext;
            try {
                const lexer = new ApexLexer(new CaseInsensitiveInputStream(clsFile, clsPayload));
                const tokens: CommonTokenStream = new CommonTokenStream(lexer);

                const parser = new ApexParser(tokens);
                parser.removeErrorListeners();
                parser.addErrorListener(new ThrowingErrorListener());

                compilationUnitContext = parser.compilationUnit();
            } catch (err) {
                SFPLogger.log(`Failed to parse ${clsFile} in ${this.searchDir}`, LoggerLevel.WARN);
                SFPLogger.log(err.message, LoggerLevel.WARN);

                fileDescriptor.error = err;
                this.apexSortedByType.parseError.push(fileDescriptor);

                continue;
            }

            const apexTypeListener: ApexTypeListener = new ApexTypeListener();

            // Walk parse tree to determine Apex type
            ParseTreeWalker.DEFAULT.walk(apexTypeListener as ApexParserListener, compilationUnitContext);

            const apexType = apexTypeListener.getApexType();

            if (apexType.class) {
                this.apexSortedByType.class.push(fileDescriptor);
                if (apexType.testClass) {
                    this.apexSortedByType.testClass.push(fileDescriptor);
                }
            } else if (apexType.interface) {
                this.apexSortedByType.interface.push(fileDescriptor);
            } else {
                fileDescriptor.error = { message: 'Unknown Apex Type' };
                this.apexSortedByType.parseError.push(fileDescriptor);
            }
        }
        return this.apexSortedByType;
    }

    public getTestClasses(): ApexClasses {
        const testClassNames: ApexClasses = this.apexSortedByType.testClass.map((fileDescriptor) => fileDescriptor.name);
        return testClassNames;
    }

    public getClassesOnlyExcludingTestsAndInterfaces(): ApexClasses {
        let packageClasses: ApexClasses = this.apexSortedByType.class.map((fileDescriptor) => fileDescriptor.name);

        if (packageClasses != null) {
            const testClassesInPackage: ApexClasses = this.apexSortedByType.testClass.map(
                (fileDescriptor) => fileDescriptor.name
            );
            if (testClassesInPackage != null && testClassesInPackage.length > 0)
                packageClasses = packageClasses.filter((item) => !testClassesInPackage.includes(item));

            const interfacesInPackage: ApexClasses = this.apexSortedByType.testClass.map(
                (fileDescriptor) => fileDescriptor.name
            );
            if (interfacesInPackage != null && interfacesInPackage.length > 0)
                packageClasses = packageClasses.filter((item) => !interfacesInPackage.includes(item));

            const parseError: ApexClasses = this.apexSortedByType.parseError.map((fileDescriptor) => fileDescriptor.name);
            if (parseError != null && parseError.length > 0)
                packageClasses = packageClasses.filter((item) => !parseError.includes(item));
        }
        return packageClasses;
    }
}

export type ApexSortedByType = {
    class: FileDescriptor[];
    testClass: FileDescriptor[];
    interface: FileDescriptor[];
    parseError: FileDescriptor[];
};

export type FileDescriptor = {
    name: string;
    filepath: string;
    error?: any;
};

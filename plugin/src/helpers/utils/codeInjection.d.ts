export declare function injectCodeByRegex(fileContent: string, lineRegex: RegExp, snippet: string): string[];
export declare function injectCodeByMultiLineRegex(fileContent: string, lineRegex: RegExp, snippet: string): string;
export declare function injectCodeBeforeMultiLineRegex(fileContent: string, lineRegex: RegExp, snippet: string): string;
export declare function replaceCodeByRegex(fileContent: string, lineRegex: RegExp, snippet: string): string;
export declare function matchRegexExists(fileContent: string, regex: RegExp): boolean;
export declare function injectCodeByMultiLineRegexAndReplaceLine(fileContent: string, lineRegex: RegExp, snippet: string): string;
export declare function injectCodeByLineNumber(fileContent: string, index: number, snippet: string): string;

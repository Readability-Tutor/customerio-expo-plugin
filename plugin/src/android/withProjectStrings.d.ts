import { ConfigPlugin } from '@expo/config-plugins';
/**
 * Adds or updates string resources in Android's strings.xml required by the plugin
 */
export declare const withProjectStrings: ConfigPlugin;
/**
 * Adds or updates multiple string resources in Android's strings.xml
 * @param stringsXml - Parsed strings.xml object
 * @param stringResources - Array of string resources to add or update
 * @returns Updated strings.xml object
 */
export declare function addStringsToXml(stringsXml: any, stringResources: {
    name: string;
    value: string;
}[]): void;

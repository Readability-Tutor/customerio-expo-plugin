/// <reference types="node" />
import { MakeDirectoryOptions } from 'fs';
export declare class FileManagement {
    static read(path: string): Promise<string>;
    static write(path: string, contents: string): Promise<void>;
    static append(path: string, contents: string): Promise<void>;
    static exists(path: string): boolean;
    static copyFile(src: string, dest: string): void;
    static mkdir(path: string, options: MakeDirectoryOptions): void;
    static writeFile(path: string, data: string): void;
    static readFile(path: string): string;
}

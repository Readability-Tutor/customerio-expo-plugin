import { readFile, writeFile, appendFile, existsSync, copyFileSync, mkdirSync, writeFileSync, readFileSync } from 'fs';
export class FileManagement {
  static async read(path) {
    return new Promise((resolve, reject) => {
      readFile(path, 'utf8', (err, data) => {
        if (err || !data) {
          reject(err);
          return;
        }
        resolve(data);
      });
    });
  }
  static async write(path, contents) {
    return new Promise((resolve, reject) => {
      writeFile(path, contents, 'utf8', err => {
        if (err) {
          reject(err);
          return;
        }
        resolve();
      });
    });
  }
  static async append(path, contents) {
    return new Promise((resolve, reject) => {
      appendFile(path, contents, 'utf8', err => {
        if (err) {
          reject(err);
          return;
        }
        resolve();
      });
    });
  }
  static exists(path) {
    return existsSync(path);
  }
  static copyFile(src, dest) {
    try {
      copyFileSync(src, dest);
    } catch (err) {
      console.log(`Error copying file from ${src} to ${dest}: `, err);
    }
  }
  static mkdir(path, options) {
    try {
      mkdirSync(path, options);
    } catch (err) {
      console.log(`Error creating directory ${path}: `, err);
    }
  }
  static writeFile(path, data) {
    try {
      writeFileSync(path, data);
    } catch (err) {
      console.log(`Error writing to file ${path}: `, err);
    }
  }
  static readFile(path) {
    try {
      return readFileSync(path, 'utf-8');
    } catch (err) {
      console.log(`Error reading file ${path}: `, err);
    }
    return '';
  }
}
//# sourceMappingURL=fileManagement.js.map
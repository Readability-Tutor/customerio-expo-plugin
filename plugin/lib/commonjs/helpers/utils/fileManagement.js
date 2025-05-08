"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FileManagement = void 0;
var _fs = require("fs");
class FileManagement {
  static async read(path) {
    return new Promise((resolve, reject) => {
      (0, _fs.readFile)(path, 'utf8', (err, data) => {
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
      (0, _fs.writeFile)(path, contents, 'utf8', err => {
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
      (0, _fs.appendFile)(path, contents, 'utf8', err => {
        if (err) {
          reject(err);
          return;
        }
        resolve();
      });
    });
  }
  static exists(path) {
    return (0, _fs.existsSync)(path);
  }
  static copyFile(src, dest) {
    try {
      (0, _fs.copyFileSync)(src, dest);
    } catch (err) {
      console.log(`Error copying file from ${src} to ${dest}: `, err);
    }
  }
  static mkdir(path, options) {
    try {
      (0, _fs.mkdirSync)(path, options);
    } catch (err) {
      console.log(`Error creating directory ${path}: `, err);
    }
  }
  static writeFile(path, data) {
    try {
      (0, _fs.writeFileSync)(path, data);
    } catch (err) {
      console.log(`Error writing to file ${path}: `, err);
    }
  }
  static readFile(path) {
    try {
      return (0, _fs.readFileSync)(path, 'utf-8');
    } catch (err) {
      console.log(`Error reading file ${path}: `, err);
    }
    return '';
  }
}
exports.FileManagement = FileManagement;
//# sourceMappingURL=fileManagement.js.map
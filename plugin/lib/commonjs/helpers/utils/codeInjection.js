"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.injectCodeBeforeMultiLineRegex = injectCodeBeforeMultiLineRegex;
exports.injectCodeByLineNumber = injectCodeByLineNumber;
exports.injectCodeByMultiLineRegex = injectCodeByMultiLineRegex;
exports.injectCodeByMultiLineRegexAndReplaceLine = injectCodeByMultiLineRegexAndReplaceLine;
exports.injectCodeByRegex = injectCodeByRegex;
exports.matchRegexExists = matchRegexExists;
exports.replaceCodeByRegex = replaceCodeByRegex;
function injectCodeByRegex(fileContent, lineRegex, snippet) {
  const lines = fileContent.split('\n');
  const index = lines.findIndex(line => lineRegex.test(line));
  let content = lines;
  if (index > -1) {
    content = [...lines.slice(0, index), snippet, ...lines.slice(index)];
  }
  return content;
}
function injectCodeByMultiLineRegex(fileContent, lineRegex, snippet) {
  return fileContent.replace(lineRegex, `$&\n${snippet}`);
}
function injectCodeBeforeMultiLineRegex(fileContent, lineRegex, snippet) {
  return fileContent.replace(lineRegex, `${snippet}\n$&`);
}
function replaceCodeByRegex(fileContent, lineRegex, snippet) {
  return fileContent.replace(lineRegex, snippet);
}
function matchRegexExists(fileContent, regex) {
  return regex.test(fileContent);
}
function injectCodeByMultiLineRegexAndReplaceLine(fileContent, lineRegex, snippet) {
  return fileContent.replace(lineRegex, `${snippet}`);
}
function injectCodeByLineNumber(fileContent, index, snippet) {
  const lines = fileContent.split('\n');
  let content = lines;
  if (index > -1) {
    content = [...lines.slice(0, index), snippet, ...lines.slice(index)];
  }
  return content.join('\n');
}
//# sourceMappingURL=codeInjection.js.map
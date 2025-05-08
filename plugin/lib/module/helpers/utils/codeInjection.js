export function injectCodeByRegex(fileContent, lineRegex, snippet) {
  const lines = fileContent.split('\n');
  const index = lines.findIndex(line => lineRegex.test(line));
  let content = lines;
  if (index > -1) {
    content = [...lines.slice(0, index), snippet, ...lines.slice(index)];
  }
  return content;
}
export function injectCodeByMultiLineRegex(fileContent, lineRegex, snippet) {
  return fileContent.replace(lineRegex, `$&\n${snippet}`);
}
export function injectCodeBeforeMultiLineRegex(fileContent, lineRegex, snippet) {
  return fileContent.replace(lineRegex, `${snippet}\n$&`);
}
export function replaceCodeByRegex(fileContent, lineRegex, snippet) {
  return fileContent.replace(lineRegex, snippet);
}
export function matchRegexExists(fileContent, regex) {
  return regex.test(fileContent);
}
export function injectCodeByMultiLineRegexAndReplaceLine(fileContent, lineRegex, snippet) {
  return fileContent.replace(lineRegex, `${snippet}`);
}
export function injectCodeByLineNumber(fileContent, index, snippet) {
  const lines = fileContent.split('\n');
  let content = lines;
  if (index > -1) {
    content = [...lines.slice(0, index), snippet, ...lines.slice(index)];
  }
  return content.join('\n');
}
//# sourceMappingURL=codeInjection.js.map
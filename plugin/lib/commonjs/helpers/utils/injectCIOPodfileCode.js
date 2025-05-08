"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.injectCIONotificationPodfileCode = injectCIONotificationPodfileCode;
exports.injectCIOPodfileCode = injectCIOPodfileCode;
var _ios = require("../constants/ios");
var _codeInjection = require("./codeInjection");
var _fileManagement = require("./fileManagement");
async function injectCIOPodfileCode(iosPath, isFcmPushProvider) {
  const blockStart = '# --- CustomerIO Host App START ---';
  const blockEnd = '# --- CustomerIO Host App END ---';
  const filename = `${iosPath}/Podfile`;
  const podfile = await _fileManagement.FileManagement.read(filename);
  const matches = podfile.match(new RegExp(blockStart));
  if (!matches) {
    // We need to decide what line of code in the Podfile to insert our native code.
    // The "post_install" line is always present in an Expo project Podfile so it's reliable.
    // Find that line in the Podfile and then we will insert our code above that line.
    const lineInPodfileToInjectSnippetBefore = /post_install do \|installer\|/;
    const snippetToInjectInPodfile = `
${blockStart}
  pod 'customerio-reactnative/${isFcmPushProvider ? "fcm" : "apn"}', :path => '${(0, _ios.getRelativePathToRNSDK)(iosPath)}'
${blockEnd}
`.trim();
    _fileManagement.FileManagement.write(filename, (0, _codeInjection.injectCodeByRegex)(podfile, lineInPodfileToInjectSnippetBefore, snippetToInjectInPodfile).join('\n'));
  } else {
    console.log('CustomerIO Podfile snippets already exists. Skipping...');
  }
}
async function injectCIONotificationPodfileCode(iosPath, useFrameworks, isFcmPushProvider) {
  const filename = `${iosPath}/Podfile`;
  const podfile = await _fileManagement.FileManagement.read(filename);
  const blockStart = '# --- CustomerIO Notification START ---';
  const blockEnd = '# --- CustomerIO Notification END ---';
  const matches = podfile.match(new RegExp(blockStart));
  if (!matches) {
    const snippetToInjectInPodfile = `
${blockStart}
target 'NotificationService' do
  ${useFrameworks === 'static' ? 'use_frameworks! :linkage => :static' : ''}
  pod 'customerio-reactnative-richpush/${isFcmPushProvider ? "fcm" : "apn"}', :path => '${(0, _ios.getRelativePathToRNSDK)(iosPath)}'
end
${blockEnd}
`.trim();
    _fileManagement.FileManagement.append(filename, snippetToInjectInPodfile);
  }
}
//# sourceMappingURL=injectCIOPodfileCode.js.map
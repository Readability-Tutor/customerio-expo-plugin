"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.withAppDelegateSwiftModifications = void 0;
var _configPlugins = require("@expo/config-plugins");
var _ios = require("../helpers/constants/ios");
var _codeInjection = require("../helpers/utils/codeInjection");
const withAppDelegateSwiftModifications = (configOuter, _) => {
  return (0, _configPlugins.withAppDelegate)(configOuter, async config => {
    let stringContents = config.modResults.contents;
    const regex = new RegExp(_ios.CIO_APP_PUSH_NOTIFICATIONS_HANDLER_SNIPPET);
    const match = stringContents.match(regex);
    if (!match) {
      stringContents = (0, _codeInjection.injectCodeByMultiLineRegex)(stringContents, _ios.CIO_APP_PUSH_NOTIFICATIONS_HANDLER_REGEX, _ios.CIO_APP_PUSH_NOTIFICATIONS_HANDLER_SNIPPET);
      stringContents = (0, _codeInjection.injectCodeByMultiLineRegex)(stringContents, _ios.CIO_INITIALIZE_SDK_REGEX, _ios.CIO_INITIALIZE_SDK_SNIPPET);
      stringContents = (0, _codeInjection.injectCodeBeforeMultiLineRegex)(stringContents, _ios.CIO_OVERRIDE_REMOTE_NOTIFICATION_REGEX, _ios.CIO_OVERRIDE_REMOTE_NOTIFICATION_SNIPPET);
      config.modResults.contents = stringContents;
    } else {
      console.log('Customerio AppDelegate changes already exist. Skipping...');
    }
    return config;
  });
};
exports.withAppDelegateSwiftModifications = withAppDelegateSwiftModifications;
//# sourceMappingURL=withAppDelegateSwiftModifications.js.map
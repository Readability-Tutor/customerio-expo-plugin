"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.withAppDelegateModifications = void 0;
var _configPlugins = require("@expo/config-plugins");
var _Paths = require("@expo/config-plugins/build/ios/Paths");
var _ios = require("../helpers/constants/ios");
var _codeInjection = require("../helpers/utils/codeInjection");
var _fileManagement = require("../helpers/utils/fileManagement");
var _utils = require("./utils");
const addImport = (stringContents, appName) => {
  const importRegex = /^(#import .*)\n/gm;
  const addedImport = getImportSnippet(appName);
  const match = stringContents.match(importRegex);
  let endOfMatchIndex;
  if (!match || match.index === undefined) {
    // No imports found, just add to start of file:
    endOfMatchIndex = 0;
  } else {
    // Add after first import:
    endOfMatchIndex = match.index + match[0].length;
  }
  stringContents = (0, _codeInjection.injectCodeByLineNumber)(stringContents, endOfMatchIndex, addedImport);
  return stringContents;
};
const addNotificationHandlerDeclaration = stringContents => {
  stringContents = (0, _codeInjection.injectCodeByMultiLineRegex)(stringContents, _ios.CIO_APPDELEGATEDECLARATION_REGEX, _ios.CIO_PUSHNOTIFICATIONHANDLERDECLARATION_SNIPPET);
  return stringContents;
};
const addNotificationConfiguration = stringContents => {
  stringContents = (0, _codeInjection.injectCodeBeforeMultiLineRegex)(stringContents, _ios.CIO_DIDFINISHLAUNCHINGMETHOD_REGEX, _ios.CIO_CONFIGURECIOSDKPUSHNOTIFICATION_SNIPPET);
  return stringContents;
};
const addInitializeNativeCioSdk = stringContents => {
  stringContents = (0, _codeInjection.injectCodeBeforeMultiLineRegex)(stringContents, _ios.CIO_DIDFINISHLAUNCHINGMETHOD_REGEX, _ios.CIO_INITIALIZECIOSDK_SNIPPET);
  return stringContents;
};
const addHandleDeeplinkInKilledStateConfiguration = (stringContents, regex) => {
  stringContents = (0, _codeInjection.injectCodeBeforeMultiLineRegex)(stringContents, regex, _ios.CIO_CONFIGUREDEEPLINK_KILLEDSTATE_SNIPPET);
  return stringContents;
};
const addDidFailToRegisterForRemoteNotificationsWithError = stringContents => {
  stringContents = (0, _codeInjection.injectCodeByMultiLineRegexAndReplaceLine)(stringContents, _ios.CIO_DIDFAILTOREGISTERFORREMOTENOTIFICATIONSWITHERROR_REGEX, _ios.CIO_DIDFAILTOREGISTERFORREMOTENOTIFICATIONSWITHERROR_SNIPPET);
  return stringContents;
};
const addDidRegisterForRemoteNotificationsWithDeviceToken = stringContents => {
  stringContents = (0, _codeInjection.injectCodeByMultiLineRegexAndReplaceLine)(stringContents, _ios.CIO_DIDREGISTERFORREMOTENOTIFICATIONSWITHDEVICETOKEN_REGEX, _ios.CIO_DIDREGISTERFORREMOTENOTIFICATIONSWITHDEVICETOKEN_SNIPPET);
  return stringContents;
};
// Adds required import for Expo Notifications package in AppDelegate.
// Required to call functions from the package.
const addExpoNotificationsHeaderModification = stringContents => {
  stringContents = (0, _codeInjection.injectCodeByLineNumber)(stringContents, 0, `
#if __has_include(<EXNotifications/EXNotificationCenterDelegate.h>)
#import <EXNotifications/EXNotificationCenterDelegate.h>
#endif
`);
  return stringContents;
};
const addFirebaseDelegateForwardDeclarationIfNeeded = stringContents => {
  stringContents = (0, _codeInjection.injectCodeByLineNumber)(stringContents, 0, '@protocol FIRMessagingDelegate;');
  return stringContents;
};
const addAppdelegateHeaderModification = stringContents => {
  // Add UNUserNotificationCenterDelegate if needed
  stringContents = stringContents.replace(_ios.CIO_APPDELEGATEHEADER_REGEX, (match, interfaceDeclaration, _groupedDelegates, existingDelegates) => {
    if (existingDelegates && existingDelegates.includes(_ios.CIO_APPDELEGATEHEADER_USER_NOTIFICATION_CENTER_SNIPPET)) {
      // The AppDelegate declaration already includes UNUserNotificationCenterDelegate, so we don't need to modify it
      return match;
    } else if (existingDelegates) {
      // Other delegates exist, append ours
      return `${_ios.CIO_APPDELEGATEHEADER_IMPORT_SNIPPET}
${interfaceDeclaration}<${existingDelegates}, ${_ios.CIO_APPDELEGATEHEADER_USER_NOTIFICATION_CENTER_SNIPPET}>
`;
    } else {
      // No delegates exist, add ours
      return `${_ios.CIO_APPDELEGATEHEADER_IMPORT_SNIPPET}
${interfaceDeclaration.trim()} <${_ios.CIO_APPDELEGATEHEADER_USER_NOTIFICATION_CENTER_SNIPPET}>
`;
    }
  });
  return stringContents;
};
const addHandleDeeplinkInKilledState = stringContents => {
  // Find if the deep link code snippet is already present
  if ((0, _codeInjection.matchRegexExists)(stringContents, _ios.CIO_DEEPLINK_COMMENT_REGEX)) {
    return stringContents;
  }
  // Check if the app delegate is using RCTBridge or LaunchOptions
  let snippet = undefined;
  let regex = _ios.CIO_LAUNCHOPTIONS_DEEPLINK_MODIFIEDOPTIONS_REGEX;
  if ((0, _codeInjection.matchRegexExists)(stringContents, _ios.CIO_RCTBRIDGE_DEEPLINK_MODIFIEDOPTIONS_REGEX)) {
    snippet = _ios.CIO_RCTBRIDGE_DEEPLINK_MODIFIEDOPTIONS_SNIPPET;
    regex = _ios.CIO_RCTBRIDGE_DEEPLINK_MODIFIEDOPTIONS_REGEX;
  } else if ((0, _codeInjection.matchRegexExists)(stringContents, _ios.CIO_LAUNCHOPTIONS_DEEPLINK_MODIFIEDOPTIONS_REGEX)) {
    snippet = _ios.CIO_LAUNCHOPTIONS_MODIFIEDOPTIONS_SNIPPET;
  }
  // Add code only if the app delegate is using RCTBridge or LaunchOptions
  if (snippet !== undefined) {
    stringContents = addHandleDeeplinkInKilledStateConfiguration(stringContents, regex);
    stringContents = (0, _codeInjection.replaceCodeByRegex)(stringContents, regex, snippet);
  }
  return stringContents;
};
const withAppDelegateModifications = (configOuter, props) => {
  return (0, _configPlugins.withAppDelegate)(configOuter, async config => {
    let stringContents = config.modResults.contents;
    const regex = new RegExp(`#import <${config.modRequest.projectName}-Swift.h>`);
    const match = stringContents.match(regex);
    if (!match) {
      var _props$pushNotificati, _props$pushNotificati2;
      const headerPath = (0, _Paths.getAppDelegateHeaderFilePath)(config.modRequest.projectRoot);
      let headerContent = await _fileManagement.FileManagement.read(headerPath);
      headerContent = addAppdelegateHeaderModification(headerContent);
      _fileManagement.FileManagement.write(headerPath, headerContent);
      stringContents = addImport(stringContents, config.modRequest.projectName);
      stringContents = addNotificationHandlerDeclaration(stringContents);
      // unless this property is explicity set to true, push notification
      // registration will be added to the AppDelegate
      if (((_props$pushNotificati = props.pushNotification) === null || _props$pushNotificati === void 0 ? void 0 : _props$pushNotificati.disableNotificationRegistration) !== true) {
        stringContents = addNotificationConfiguration(stringContents);
      }
      stringContents = addInitializeNativeCioSdk(stringContents);
      if (((_props$pushNotificati2 = props.pushNotification) === null || _props$pushNotificati2 === void 0 ? void 0 : _props$pushNotificati2.handleDeeplinkInKilledState) === true) {
        stringContents = addHandleDeeplinkInKilledState(stringContents);
      }
      stringContents = addDidFailToRegisterForRemoteNotificationsWithError(stringContents);
      stringContents = addDidRegisterForRemoteNotificationsWithDeviceToken(stringContents);
      if ((0, _utils.isFcmPushProvider)(props)) {
        stringContents = addFirebaseDelegateForwardDeclarationIfNeeded(stringContents);
      }
      stringContents = addExpoNotificationsHeaderModification(stringContents);
      config.modResults.contents = stringContents;
    } else {
      console.log('Customerio AppDelegate changes already exist. Skipping...');
    }
    return config;
  });
};
exports.withAppDelegateModifications = withAppDelegateModifications;
function getImportSnippet(appName) {
  return `
// Add swift bridge imports
#import <ExpoModulesCore-Swift.h>
#import <${appName}-Swift.h>
  `;
}
//# sourceMappingURL=withAppDelegateModifications.js.mapmap
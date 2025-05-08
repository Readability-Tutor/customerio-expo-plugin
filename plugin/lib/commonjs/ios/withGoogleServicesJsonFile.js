"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.withGoogleServicesJsonFile = void 0;
var _configPlugins = require("@expo/config-plugins");
var _fileManagement = require("./../helpers/utils/fileManagement");
var _utils = require("./utils");
const withGoogleServicesJsonFile = (config, cioProps) => {
  return (0, _configPlugins.withXcodeProject)(config, async props => {
    var _cioProps$pushNotific;
    const useFcm = (0, _utils.isFcmPushProvider)(cioProps);
    if (!useFcm) {
      // Nothing to do, for providers other than FCM, the Google services JSON file isn't needed
      return props;
    }
    console.log('Only specify Customer.io ios.pushNotification.googleServicesFile config if you are not already including' + ' GoogleService-Info.plist as part of Firebase integration');
    // googleServicesFile
    const iosPath = props.modRequest.platformProjectRoot;
    const googleServicesFile = (_cioProps$pushNotific = cioProps.pushNotification) === null || _cioProps$pushNotific === void 0 ? void 0 : _cioProps$pushNotific.googleServicesFile;
    const appName = props.modRequest.projectName;
    if (_fileManagement.FileManagement.exists(`${iosPath}/GoogleService-Info.plist`)) {
      console.log(`File already exists: ${iosPath}/GoogleService-Info.plist. Skipping...`);
      return props;
    }
    if (_fileManagement.FileManagement.exists(`${iosPath}/${appName}/GoogleService-Info.plist`)) {
      // This is where RN Firebase potentially copies GoogleService-Info.plist
      // Do not copy if it's already done by Firebase to avoid conflict in Resources
      console.log(`File already exists: ${iosPath}/${appName}/GoogleService-Info.plist. Skipping...`);
      return props;
    }
    if (googleServicesFile && _fileManagement.FileManagement.exists(googleServicesFile)) {
      var _config$ios;
      if ((_config$ios = config.ios) !== null && _config$ios !== void 0 && _config$ios.googleServicesFile) {
        console.warn('Specifying both Expo ios.googleServicesFile and Customer.io ios.pushNotification.googleServicesFile can cause a conflict' + ' duplicating GoogleService-Info.plist in the iOS project resources. Please remove Customer.io ios.pushNotification.googleServicesFile');
      }
      try {
        _fileManagement.FileManagement.copyFile(googleServicesFile, `${iosPath}/GoogleService-Info.plist`);
        addFileToXcodeProject(props.modResults, 'GoogleService-Info.plist');
      } catch (e) {
        console.error(`There was an error copying your GoogleService-Info.plist file. You can copy it manually into ${iosPath}/GoogleService-Info.plist`);
      }
    } else {
      console.error(`The Google Services file provided in ${googleServicesFile} doesn't seem to exist. You can copy it manually into ${iosPath}/GoogleService-Info.plist`);
    }
    return props;
  });
};
exports.withGoogleServicesJsonFile = withGoogleServicesJsonFile;
function addFileToXcodeProject(project, fileName) {
  const groupName = 'Resources';
  const filepath = fileName;
  if (!_configPlugins.IOSConfig.XcodeUtils.ensureGroupRecursively(project, groupName)) {
    console.error(`Error copying GoogleService-Info.plist. Failed to find or create '${groupName}' group in Xcode.`);
    return;
  }
  // Add GoogleService-Info.plist to the Xcode project
  _configPlugins.IOSConfig.XcodeUtils.addResourceFileToGroup({
    project,
    filepath,
    groupName,
    isBuildFile: true
  });
}
//# sourceMappingURL=withGoogleServicesJsonFile.js.mapap
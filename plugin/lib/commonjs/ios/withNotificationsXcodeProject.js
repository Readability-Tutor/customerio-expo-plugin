"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.withCioNotificationsXcodeProject = void 0;
var _configPlugins = require("@expo/config-plugins");
var _ios = require("../helpers/constants/ios");
var _codeInjection = require("../helpers/utils/codeInjection");
var _injectCIOPodfileCode = require("../helpers/utils/injectCIOPodfileCode");
var _fileManagement = require("./../helpers/utils/fileManagement");
var _utils = require("./utils");
const PLIST_FILENAME = `${_ios.CIO_NOTIFICATION_TARGET_NAME}-Info.plist`;
const ENV_FILENAME = 'Env.swift';
const TARGETED_DEVICE_FAMILY = `"1,2"`;
const addNotificationServiceExtension = async (options, xcodeProject) => {
  try {
    var _options$pushNotifica;
    if (options.pushNotification) {
      await addPushNotificationFile(options, xcodeProject);
    }
    if (((_options$pushNotifica = options.pushNotification) === null || _options$pushNotifica === void 0 ? void 0 : _options$pushNotifica.useRichPush) === true) {
      await addRichPushXcodeProj(options, xcodeProject);
    }
    return xcodeProject;
  } catch (error) {
    console.error(error);
    return null;
  }
};
const withCioNotificationsXcodeProject = (configOuter, props) => {
  return (0, _configPlugins.withXcodeProject)(configOuter, async config => {
    const {
      modRequest,
      ios,
      version: bundleShortVersion
    } = config;
    const {
      appleTeamId,
      iosDeploymentTarget,
      useFrameworks
    } = props;
    if (ios === undefined) throw new Error('Adding NotificationServiceExtension failed: ios config missing from app.config.js or app.json.');
    // projectName and platformProjectRoot translates to appName and iosPath in addNotificationServiceExtension()
    const {
      projectName,
      platformProjectRoot
    } = modRequest;
    const {
      bundleIdentifier,
      buildNumber
    } = ios;
    if (bundleShortVersion === undefined) {
      throw new Error('Adding NotificationServiceExtension failed: version missing from app.config.js or app.json');
    }
    if (bundleIdentifier === undefined) {
      throw new Error('Adding NotificationServiceExtension failed: ios.bundleIdentifier missing from app.config.js or app.json');
    }
    if (projectName === undefined) {
      throw new Error('Adding NotificationServiceExtension failed: name missing from app.config.js or app.json');
    }
    const options = {
      ...props,
      appleTeamId,
      bundleIdentifier,
      bundleShortVersion,
      bundleVersion: buildNumber || _ios.DEFAULT_BUNDLE_VERSION,
      iosPath: platformProjectRoot,
      appName: projectName,
      useFrameworks,
      iosDeploymentTarget
    };
    const modifiedProjectFile = await addNotificationServiceExtension(options, config.modResults);
    if (modifiedProjectFile) {
      config.modResults = modifiedProjectFile;
    }
    return config;
  });
};
exports.withCioNotificationsXcodeProject = withCioNotificationsXcodeProject;
const addRichPushXcodeProj = async (options, xcodeProject) => {
  const {
    appleTeamId,
    bundleIdentifier,
    bundleShortVersion,
    bundleVersion,
    iosPath,
    iosDeploymentTarget,
    useFrameworks
  } = options;
  const isFcmProvider = (0, _utils.isFcmPushProvider)(options);
  await (0, _injectCIOPodfileCode.injectCIONotificationPodfileCode)(iosPath, useFrameworks, isFcmProvider);
  // Check if `CIO_NOTIFICATION_TARGET_NAME` group already exist in the project
  // If true then skip creating a new group to avoid duplicate folders
  if (xcodeProject.pbxTargetByName(_ios.CIO_NOTIFICATION_TARGET_NAME)) {
    console.warn(`${_ios.CIO_NOTIFICATION_TARGET_NAME} already exists in project. Skipping...`);
    return;
  }
  const nsePath = `${iosPath}/${_ios.CIO_NOTIFICATION_TARGET_NAME}`;
  _fileManagement.FileManagement.mkdir(nsePath, {
    recursive: true
  });
  const platformSpecificFiles = ['NotificationService.swift'];
  const commonFiles = [PLIST_FILENAME, 'NotificationService.h', 'NotificationService.m', ENV_FILENAME];
  const getTargetFile = filename => `${nsePath}/${filename}`;
  // Copy platform-specific files
  platformSpecificFiles.forEach(filename => {
    const targetFile = getTargetFile(filename);
    _fileManagement.FileManagement.copyFile(`${_ios.LOCAL_PATH_TO_CIO_NSE_FILES}/${isFcmProvider ? 'fcm' : 'apn'}/${filename}`, targetFile);
  });
  // Copy common files
  commonFiles.forEach(filename => {
    const targetFile = getTargetFile(filename);
    _fileManagement.FileManagement.copyFile(`${_ios.LOCAL_PATH_TO_CIO_NSE_FILES}/common/${filename}`, targetFile);
  });
  /* MODIFY COPIED EXTENSION FILES */
  const infoPlistTargetFile = getTargetFile(PLIST_FILENAME);
  updateNseInfoPlist({
    bundleVersion,
    bundleShortVersion,
    infoPlistTargetFile
  });
  updateNseEnv(options, getTargetFile(ENV_FILENAME));
  // Create new PBXGroup for the extension
  const extGroup = xcodeProject.addPbxGroup([...platformSpecificFiles, ...commonFiles],
  // Combine platform-specific and common files,
  _ios.CIO_NOTIFICATION_TARGET_NAME, _ios.CIO_NOTIFICATION_TARGET_NAME);
  // Add the new PBXGroup to the top level group. This makes the
  // files / folder appear in the file explorer in Xcode.
  const groups = xcodeProject.hash.project.objects['PBXGroup'];
  Object.keys(groups).forEach(key => {
    if (groups[key].name === undefined && groups[key].path === undefined) {
      xcodeProject.addToPbxGroup(extGroup.uuid, key);
    }
  });
  // WORK AROUND for codeProject.addTarget BUG
  // Xcode projects don't contain these if there is only one target
  // An upstream fix should be made to the code referenced in this link:
  //   - https://github.com/apache/cordova-node-xcode/blob/8b98cabc5978359db88dc9ff2d4c015cba40f150/lib/pbxProject.js#L860
  const projObjects = xcodeProject.hash.project.objects;
  projObjects['PBXTargetDependency'] = projObjects['PBXTargetDependency'] || {};
  projObjects['PBXContainerItemProxy'] = projObjects['PBXTargetDependency'] || {};
  if (xcodeProject.pbxTargetByName(_ios.CIO_NOTIFICATION_TARGET_NAME)) {
    console.warn(`${_ios.CIO_NOTIFICATION_TARGET_NAME} already exists in project. Skipping...`);
    return;
  }
  // Add the NSE target
  // This also adds PBXTargetDependency and PBXContainerItemProxy
  const nseTarget = xcodeProject.addTarget(_ios.CIO_NOTIFICATION_TARGET_NAME, 'app_extension', _ios.CIO_NOTIFICATION_TARGET_NAME, `${bundleIdentifier}.richpush`);
  // Add build phases to the new target
  xcodeProject.addBuildPhase(['NotificationService.m', 'NotificationService.swift', 'Env.swift'], 'PBXSourcesBuildPhase', 'Sources', nseTarget.uuid);
  xcodeProject.addBuildPhase([], 'PBXResourcesBuildPhase', 'Resources', nseTarget.uuid);
  xcodeProject.addBuildPhase([], 'PBXFrameworksBuildPhase', 'Frameworks', nseTarget.uuid);
  // Edit the Deployment info of the target
  const configurations = xcodeProject.pbxXCBuildConfigurationSection();
  for (const key in configurations) {
    if (typeof configurations[key].buildSettings !== 'undefined' && configurations[key].buildSettings.PRODUCT_NAME === `"${_ios.CIO_NOTIFICATION_TARGET_NAME}"`) {
      const buildSettingsObj = configurations[key].buildSettings;
      buildSettingsObj.DEVELOPMENT_TEAM = appleTeamId;
      buildSettingsObj.IPHONEOS_DEPLOYMENT_TARGET = iosDeploymentTarget || '15.1';
      buildSettingsObj.TARGETED_DEVICE_FAMILY = TARGETED_DEVICE_FAMILY;
      buildSettingsObj.CODE_SIGN_STYLE = 'Automatic';
      buildSettingsObj.SWIFT_VERSION = 4.2;
    }
  }
  // Add development team to the target & the main
  xcodeProject.addTargetAttribute('DevelopmentTeam', appleTeamId, nseTarget);
  xcodeProject.addTargetAttribute('DevelopmentTeam', appleTeamId);
};
const updateNseInfoPlist = payload => {
  const BUNDLE_SHORT_VERSION_RE = /\{\{BUNDLE_SHORT_VERSION\}\}/;
  const BUNDLE_VERSION_RE = /\{\{BUNDLE_VERSION\}\}/;
  let plistFileString = _fileManagement.FileManagement.readFile(payload.infoPlistTargetFile);
  if (payload.bundleVersion) {
    plistFileString = (0, _codeInjection.replaceCodeByRegex)(plistFileString, BUNDLE_VERSION_RE, payload.bundleVersion);
  }
  if (payload.bundleShortVersion) {
    plistFileString = (0, _codeInjection.replaceCodeByRegex)(plistFileString, BUNDLE_SHORT_VERSION_RE, payload.bundleShortVersion);
  }
  _fileManagement.FileManagement.writeFile(payload.infoPlistTargetFile, plistFileString);
};
const updateNseEnv = (options, envFileName) => {
  var _options$pushNotifica2;
  const CDP_API_KEY_RE = /\{\{CDP_API_KEY\}\}/;
  const REGION_RE = /\{\{REGION\}\}/;
  let envFileContent = _fileManagement.FileManagement.readFile(envFileName);
  const {
    cdpApiKey,
    region
  } = ((_options$pushNotifica2 = options.pushNotification) === null || _options$pushNotifica2 === void 0 ? void 0 : _options$pushNotifica2.env) || {
    cdpApiKey: undefined,
    region: undefined
  };
  if (!cdpApiKey) {
    throw new Error('Adding NotificationServiceExtension failed: ios.pushNotification.env.cdpApiKey is missing from app.config.js or app.json.');
  }
  envFileContent = (0, _codeInjection.replaceCodeByRegex)(envFileContent, CDP_API_KEY_RE, cdpApiKey);
  if (region) {
    const regionMap = {
      us: 'Region.US',
      eu: 'Region.EU'
    };
    const mappedRegion = regionMap[region.toLowerCase()] || '';
    if (!mappedRegion) {
      console.warn(`${region} is an invalid region. Please use the values from the docs: https://customer.io/docs/sdk/expo/getting-started/#configure-the-plugin`);
    } else {
      envFileContent = (0, _codeInjection.replaceCodeByRegex)(envFileContent, REGION_RE, mappedRegion);
    }
  }
  _fileManagement.FileManagement.writeFile(envFileName, envFileContent);
};
async function addPushNotificationFile(options, xcodeProject) {
  // Maybe copy a different file with FCM config based on config
  const {
    iosPath,
    appName
  } = options;
  const isFcmProvider = (0, _utils.isFcmPushProvider)(options);
  // PushService.swift is platform-specific and always lives in the platform folder
  const sourceFile = `${isFcmProvider ? 'fcm' : 'apn'}/PushService.swift`;
  const targetFileName = 'PushService.swift';
  const appPath = `${iosPath}/${appName}`;
  const getTargetFile = filename => `${appPath}/${filename}`;
  const targetFile = getTargetFile(targetFileName);
  // Check whether {file} exists in the project. If false, then add the file
  // If {file} exists then skip and return
  if (!_fileManagement.FileManagement.exists(getTargetFile(targetFileName))) {
    _fileManagement.FileManagement.mkdir(appPath, {
      recursive: true
    });
    _fileManagement.FileManagement.copyFile(`${_ios.LOCAL_PATH_TO_CIO_NSE_FILES}/${sourceFile}`, targetFile);
  } else {
    console.log(`${getTargetFile(targetFileName)} already exists. Skipping...`);
    return;
  }
  updatePushFile(options, targetFile);
  const group = xcodeProject.pbxCreateGroup('CustomerIONotifications');
  const classesKey = xcodeProject.findPBXGroupKey({
    name: `${appName}`
  });
  xcodeProject.addToPbxGroup(group, classesKey);
  xcodeProject.addSourceFile(`${appName}/${targetFileName}`, null, group);
}
const updatePushFile = (options, envFileName) => {
  var _options$pushNotifica3, _options$pushNotifica4, _options$pushNotifica5, _options$pushNotifica6, _options$pushNotifica7;
  const REGISTER_RE = /\{\{REGISTER_SNIPPET\}\}/;
  let envFileContent = _fileManagement.FileManagement.readFile(envFileName);
  const disableNotificationRegistration = (_options$pushNotifica3 = options.pushNotification) === null || _options$pushNotifica3 === void 0 ? void 0 : _options$pushNotifica3.disableNotificationRegistration;
  const {
    cdpApiKey,
    region
  } = ((_options$pushNotifica4 = options.pushNotification) === null || _options$pushNotifica4 === void 0 ? void 0 : _options$pushNotifica4.env) || {
    cdpApiKey: undefined,
    region: undefined
  };
  if (!cdpApiKey) {
    throw new Error('Adding NotificationServiceExtension failed: ios.pushNotification.env.cdpApiKey is missing from app.config.js or app.json.');
  }
  let snippet = '';
  // unless this property is explicity set to true, push notification
  // registration will be added to the AppDelegate
  if (disableNotificationRegistration !== true) {
    snippet = _ios.CIO_REGISTER_PUSHNOTIFICATION_SNIPPET;
  }
  envFileContent = (0, _codeInjection.replaceCodeByRegex)(envFileContent, REGISTER_RE, snippet);
  envFileContent = (0, _codeInjection.replaceCodeByRegex)(envFileContent, /\{\{CDP_API_KEY\}\}/, cdpApiKey);
  if (region) {
    envFileContent = (0, _codeInjection.replaceCodeByRegex)(envFileContent, /\{\{REGION\}\}/, region.toUpperCase());
  }
  const autoTrackPushEvents = ((_options$pushNotifica5 = options.pushNotification) === null || _options$pushNotifica5 === void 0 ? void 0 : _options$pushNotifica5.autoTrackPushEvents) !== false;
  envFileContent = (0, _codeInjection.replaceCodeByRegex)(envFileContent, /\{\{AUTO_TRACK_PUSH_EVENTS\}\}/, autoTrackPushEvents.toString());
  const autoFetchDeviceToken = ((_options$pushNotifica6 = options.pushNotification) === null || _options$pushNotifica6 === void 0 ? void 0 : _options$pushNotifica6.autoFetchDeviceToken) !== false;
  envFileContent = (0, _codeInjection.replaceCodeByRegex)(envFileContent, /\{\{AUTO_FETCH_DEVICE_TOKEN\}\}/, autoFetchDeviceToken.toString());
  const showPushAppInForeground = ((_options$pushNotifica7 = options.pushNotification) === null || _options$pushNotifica7 === void 0 ? void 0 : _options$pushNotifica7.showPushAppInForeground) !== false;
  envFileContent = (0, _codeInjection.replaceCodeByRegex)(envFileContent, /\{\{SHOW_PUSH_APP_IN_FOREGROUND\}\}/, showPushAppInForeground.toString());
  _fileManagement.FileManagement.writeFile(envFileName, envFileContent);
};
//# sourceMappingURL=withNotificationsXcodeProject.js.mapoject.js.map
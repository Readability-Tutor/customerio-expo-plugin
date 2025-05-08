"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.withGoogleServicesJSON = void 0;
var _configPlugins = require("@expo/config-plugins");
var _fileManagement = require("./../helpers/utils/fileManagement");
const withGoogleServicesJSON = (configOuter, cioProps) => {
  return (0, _configPlugins.withProjectBuildGradle)(configOuter, props => {
    const options = {
      androidPath: props.modRequest.platformProjectRoot,
      googleServicesFile: cioProps === null || cioProps === void 0 ? void 0 : cioProps.googleServicesFile
    };
    const {
      androidPath,
      googleServicesFile
    } = options;
    if (!_fileManagement.FileManagement.exists(`${androidPath}/app/google-services.json`)) {
      if (googleServicesFile && _fileManagement.FileManagement.exists(googleServicesFile)) {
        try {
          _fileManagement.FileManagement.copyFile(googleServicesFile, `${androidPath}/app/google-services.json`);
        } catch (e) {
          console.log(`There was an error copying your google-services.json file. You can copy it manually into ${androidPath}/app/google-services.json`);
        }
      } else {
        console.log(`The Google Services file provided in ${googleServicesFile} doesn't seem to exist. You can copy it manually into ${androidPath}/app/google-services.json`);
      }
    } else {
      console.log(`File already exists: ${androidPath}/app/google-services.json. Skipping...`);
    }
    return props;
  });
};
exports.withGoogleServicesJSON = withGoogleServicesJSON;
//# sourceMappingURL=withGoogleServicesJSON.js.map
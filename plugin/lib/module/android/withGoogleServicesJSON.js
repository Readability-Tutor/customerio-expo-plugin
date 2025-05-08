import { withProjectBuildGradle } from '@expo/config-plugins';
import { FileManagement } from './../helpers/utils/fileManagement';
export const withGoogleServicesJSON = (configOuter, cioProps) => {
  return withProjectBuildGradle(configOuter, props => {
    const options = {
      androidPath: props.modRequest.platformProjectRoot,
      googleServicesFile: cioProps === null || cioProps === void 0 ? void 0 : cioProps.googleServicesFile
    };
    const {
      androidPath,
      googleServicesFile
    } = options;
    if (!FileManagement.exists(`${androidPath}/app/google-services.json`)) {
      if (googleServicesFile && FileManagement.exists(googleServicesFile)) {
        try {
          FileManagement.copyFile(googleServicesFile, `${androidPath}/app/google-services.json`);
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
//# sourceMappingURL=withGoogleServicesJSON.js.map
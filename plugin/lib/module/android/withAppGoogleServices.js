import { withAppBuildGradle } from '@expo/config-plugins';
import { CIO_APP_APPLY_REGEX, CIO_APP_GOOGLE_SNIPPET } from '../helpers/constants/android';
export const withAppGoogleServices = configOuter => {
  return withAppBuildGradle(configOuter, props => {
    const regex = new RegExp(CIO_APP_GOOGLE_SNIPPET);
    const match = props.modResults.contents.match(regex);
    if (!match) {
      props.modResults.contents = props.modResults.contents.replace(CIO_APP_APPLY_REGEX, `$1\n${CIO_APP_GOOGLE_SNIPPET}`);
    } else {
      console.log('app/build.gradle snippet already exists. Skipping...');
    }
    return props;
  });
};
//# sourceMappingURL=withAppGoogleServices.js.map
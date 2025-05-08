"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.withAppGoogleServices = void 0;
var _configPlugins = require("@expo/config-plugins");
var _android = require("../helpers/constants/android");
const withAppGoogleServices = configOuter => {
  return (0, _configPlugins.withAppBuildGradle)(configOuter, props => {
    const regex = new RegExp(_android.CIO_APP_GOOGLE_SNIPPET);
    const match = props.modResults.contents.match(regex);
    if (!match) {
      props.modResults.contents = props.modResults.contents.replace(_android.CIO_APP_APPLY_REGEX, `$1\n${_android.CIO_APP_GOOGLE_SNIPPET}`);
    } else {
      console.log('app/build.gradle snippet already exists. Skipping...');
    }
    return props;
  });
};
exports.withAppGoogleServices = withAppGoogleServices;
//# sourceMappingURL=withAppGoogleServices.js.map
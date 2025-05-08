"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.withProjectGoogleServices = void 0;
var _configPlugins = require("@expo/config-plugins");
var _android = require("./../helpers/constants/android");
const withProjectGoogleServices = configOuter => {
  return (0, _configPlugins.withProjectBuildGradle)(configOuter, props => {
    const regex = new RegExp(_android.CIO_PROJECT_GOOGLE_SNIPPET);
    const match = props.modResults.contents.match(regex);
    if (!match) {
      props.modResults.contents = props.modResults.contents.replace(_android.CIO_PROJECT_BUILDSCRIPTS_REGEX, `$1\n${_android.CIO_PROJECT_GOOGLE_SNIPPET}`);
    }
    return props;
  });
};
exports.withProjectGoogleServices = withProjectGoogleServices;
//# sourceMappingURL=withProjectGoogleServices.js.map
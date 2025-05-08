"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.withGistMavenRepository = void 0;
var _configPlugins = require("@expo/config-plugins");
var _android = require("../helpers/constants/android");
const withGistMavenRepository = configOuter => {
  return (0, _configPlugins.withProjectBuildGradle)(configOuter, props => {
    const targetMatch = props.modResults.contents.match(_android.CIO_GIST_MAVEN_REGEX);
    if (!targetMatch) {
      props.modResults.contents = props.modResults.contents.replace(_android.CIO_PROJECT_ALLPROJECTS_REGEX, `$1\n${_android.CIO_PROJECT_GIST_MAVEN_SNIPPET}`);
    } else {
      console.log('build.gradle snippet alreade exists. Skipping...');
    }
    return props;
  });
};
exports.withGistMavenRepository = withGistMavenRepository;
//# sourceMappingURL=withGistMavenRepository.js.map
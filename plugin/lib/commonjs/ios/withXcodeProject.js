"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.withCioXcodeProject = void 0;
var _configPlugins = require("@expo/config-plugins");
var _utils = require("./utils");
var _injectCIOPodfileCode = require("../helpers/utils/injectCIOPodfileCode");
const withCioXcodeProject = (config, cioProps) => {
  return (0, _configPlugins.withXcodeProject)(config, async props => {
    const iosPath = props.modRequest.platformProjectRoot;
    await (0, _injectCIOPodfileCode.injectCIOPodfileCode)(iosPath, (0, _utils.isFcmPushProvider)(cioProps));
    return props;
  });
};
exports.withCioXcodeProject = withCioXcodeProject;
//# sourceMappingURL=withXcodeProject.js.map
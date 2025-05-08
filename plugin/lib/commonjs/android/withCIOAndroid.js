"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.withCIOAndroid = withCIOAndroid;
var _withAndroidManifestUpdates = require("./withAndroidManifestUpdates");
var _withAppGoogleServices = require("./withAppGoogleServices");
var _withGistMavenRepository = require("./withGistMavenRepository");
var _withGoogleServicesJSON = require("./withGoogleServicesJSON");
var _withProjectGoogleServices = require("./withProjectGoogleServices");
var _withProjectStrings = require("./withProjectStrings");
function withCIOAndroid(config, props) {
  config = (0, _withGistMavenRepository.withGistMavenRepository)(config, props);
  config = (0, _withProjectGoogleServices.withProjectGoogleServices)(config, props);
  config = (0, _withAppGoogleServices.withAppGoogleServices)(config, props);
  config = (0, _withGoogleServicesJSON.withGoogleServicesJSON)(config, props);
  config = (0, _withProjectStrings.withProjectStrings)(config);
  if (props.setHighPriorityPushHandler) {
    config = (0, _withAndroidManifestUpdates.withAndroidManifestUpdates)(config, props);
  }
  return config;
}
//# sourceMappingURL=withCIOAndroid.js.map
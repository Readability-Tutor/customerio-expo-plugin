"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.withAndroidManifestUpdates = void 0;
var _configPlugins = require("@expo/config-plugins");
const withAndroidManifestUpdates = configOuter => {
  return (0, _configPlugins.withAndroidManifest)(configOuter, props => {
    const application = props.modResults.manifest.application;
    const customerIOMessagingpush = 'io.customer.messagingpush.CustomerIOFirebaseMessagingService';
    if (!application[0]['service']) {
      application[0]['service'] = [];
    }
    const hasService = application[0]['service'].some(service => service['$']['android:name'] === customerIOMessagingpush);
    if (!hasService) {
      application[0]['service'].push({
        '$': {
          'android:name': customerIOMessagingpush,
          'android:exported': 'false'
        },
        'intent-filter': [{
          action: [{
            $: {
              'android:name': 'com.google.firebase.MESSAGING_EVENT'
            }
          }]
        }]
      });
      console.log('Successfully set CustomerIO push handler as priority in AndroidManifest.xml');
    }
    props.modResults.manifest.application = application;
    return props;
  });
};
exports.withAndroidManifestUpdates = withAndroidManifestUpdates;
//# sourceMappingURL=withAndroidManifestUpdates.js.map
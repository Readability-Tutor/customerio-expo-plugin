"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isFcmPushProvider = void 0;
/**
 * Returns t
 * @param iosOptions The plugin iOS configuration options
 * @returns true if FCM is configured to be used as push provider
 */
const isFcmPushProvider = iosOptions => {
  var _iosOptions$pushNotif;
  return (iosOptions === null || iosOptions === void 0 || (_iosOptions$pushNotif = iosOptions.pushNotification) === null || _iosOptions$pushNotif === void 0 ? void 0 : _iosOptions$pushNotif.provider) === "fcm";
};
exports.isFcmPushProvider = isFcmPushProvider;
//# sourceMappingURL=utils.js.map
/**
 * Returns t
 * @param iosOptions The plugin iOS configuration options
 * @returns true if FCM is configured to be used as push provider
 */
export const isFcmPushProvider = iosOptions => {
  var _iosOptions$pushNotif;
  return (iosOptions === null || iosOptions === void 0 || (_iosOptions$pushNotif = iosOptions.pushNotification) === null || _iosOptions$pushNotif === void 0 ? void 0 : _iosOptions$pushNotif.provider) === "fcm";
};
//# sourceMappingURL=utils.js.map
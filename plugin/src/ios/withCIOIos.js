// import { withAppDelegateModifications } from './withAppDelegateModifications';
import { withAppDelegateSwiftModifications } from './withAppDelegateSwiftModifications';
import { withCioXcodeProject } from './withXcodeProject';
import { withCioNotificationsXcodeProject } from './withNotificationsXcodeProject';
import { withGoogleServicesJsonFile } from './withGoogleServicesJsonFile';
export function withCIOIos(config, props) {
    const cioProps = mergeDeprecatedPropertiesAndLogWarnings(props);
    if (cioProps.pushNotification) {
        // config = withAppDelegateModifications(config, cioProps);
        config = withAppDelegateSwiftModifications(config, cioProps);
        config = withCioNotificationsXcodeProject(config, cioProps);
        config = withCioXcodeProject(config, cioProps);
        config = withGoogleServicesJsonFile(config, cioProps);
    }
    return config;
}
/**  The basic purpose of this function is to centralize where we handle the deprecation
  by merging the deprecated properties into the new ios.pushNotification.* properties
  and logging a warning if they are set. This way, we can remove the deprecated properties
  from the top level of the ios object in the future, and update this function
  while the rest of the plugin code remains unchanged.
*/
const mergeDeprecatedPropertiesAndLogWarnings = (props) => {
    // The deprecatedTopLevelProperties maps the top level properties
    // that are deprecated to the new ios.pushNotification.* properties
    // that should be used instead. The deprecated properties are
    // still available for backwards compatibility, but they will
    // be removed in the future.
    const deprecatedTopLevelProperties = {
        showPushAppInForeground: props.showPushAppInForeground,
        autoTrackPushEvents: props.autoTrackPushEvents,
        handleDeeplinkInKilledState: props.handleDeeplinkInKilledState,
        disableNotificationRegistration: props.disableNotificationRegistration,
        autoFetchDeviceToken: props.autoFetchDeviceToken,
    };
    // loop over all the deprecated properties and log a warning if they are set
    Object.entries(deprecatedTopLevelProperties).forEach(([key, value]) => {
        if (value !== undefined) {
            console.warn(`The ios.${key} property is deprecated. Please use ios.pushNotification.${key} instead.`);
            if (props.pushNotification === undefined) {
                props.pushNotification = {};
            }
            const propKey = key;
            if (props.pushNotification[propKey] === undefined) {
                props.pushNotification = {
                    ...props.pushNotification,
                    [propKey]: value,
                };
            }
            else {
                console.warn(`The ios.${key} property is deprecated. Since the value of ios.pushNotification.${key} is set, it will be used.`);
            }
        }
    });
    return props;
};

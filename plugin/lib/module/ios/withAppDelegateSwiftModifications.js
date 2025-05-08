import { withAppDelegate } from '@expo/config-plugins';
import { CIO_OVERRIDE_REMOTE_NOTIFICATION_SNIPPET, CIO_APP_PUSH_NOTIFICATIONS_HANDLER_SNIPPET, CIO_INITIALIZE_SDK_SNIPPET, CIO_APP_PUSH_NOTIFICATIONS_HANDLER_REGEX, CIO_INITIALIZE_SDK_REGEX, CIO_OVERRIDE_REMOTE_NOTIFICATION_REGEX } from '../helpers/constants/ios';
import { injectCodeByMultiLineRegex, injectCodeBeforeMultiLineRegex } from '../helpers/utils/codeInjection';
export const withAppDelegateSwiftModifications = (configOuter, _) => {
  return withAppDelegate(configOuter, async config => {
    let stringContents = config.modResults.contents;
    const regex = new RegExp(CIO_APP_PUSH_NOTIFICATIONS_HANDLER_SNIPPET);
    const match = stringContents.match(regex);
    if (!match) {
      stringContents = injectCodeByMultiLineRegex(stringContents, CIO_APP_PUSH_NOTIFICATIONS_HANDLER_REGEX, CIO_APP_PUSH_NOTIFICATIONS_HANDLER_SNIPPET);
      stringContents = injectCodeByMultiLineRegex(stringContents, CIO_INITIALIZE_SDK_REGEX, CIO_INITIALIZE_SDK_SNIPPET);
      stringContents = injectCodeBeforeMultiLineRegex(stringContents, CIO_OVERRIDE_REMOTE_NOTIFICATION_REGEX, CIO_OVERRIDE_REMOTE_NOTIFICATION_SNIPPET);
      config.modResults.contents = stringContents;
    } else {
      console.log('Customerio AppDelegate changes already exist. Skipping...');
    }
    return config;
  });
};
//# sourceMappingURL=withAppDelegateSwiftModifications.js.map
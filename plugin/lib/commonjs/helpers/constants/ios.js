"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LOCAL_PATH_TO_CIO_NSE_FILES = exports.IOS_DEPLOYMENT_TARGET = exports.GROUP_IDENTIFIER_TEMPLATE_REGEX = exports.DEFAULT_BUNDLE_VERSION = exports.DEFAULT_BUNDLE_SHORT_VERSION = exports.CIO_TARGET_NAME = exports.CIO_REGISTER_PUSHNOTIFICATION_SNIPPET = exports.CIO_RCTBRIDGE_DEEPLINK_MODIFIEDOPTIONS_SNIPPET = exports.CIO_RCTBRIDGE_DEEPLINK_MODIFIEDOPTIONS_REGEX = exports.CIO_PUSHNOTIFICATIONHANDLERDECLARATION_SNIPPET = exports.CIO_OVERRIDE_REMOTE_NOTIFICATION_SNIPPET = exports.CIO_OVERRIDE_REMOTE_NOTIFICATION_REGEX = exports.CIO_NOTIFICATION_TARGET_NAME = exports.CIO_LAUNCHOPTIONS_MODIFIEDOPTIONS_SNIPPET = exports.CIO_LAUNCHOPTIONS_DEEPLINK_MODIFIEDOPTIONS_REGEX = exports.CIO_INITIALIZE_SDK_SNIPPET = exports.CIO_INITIALIZE_SDK_REGEX = exports.CIO_INITIALIZECIOSDK_SNIPPET = exports.CIO_DIDREGISTERFORREMOTENOTIFICATIONSWITHDEVICETOKEN_SNIPPET = exports.CIO_DIDREGISTERFORREMOTENOTIFICATIONSWITHDEVICETOKEN_REGEX = exports.CIO_DIDFINISHLAUNCHINGMETHOD_REGEX = exports.CIO_DIDFAILTOREGISTERFORREMOTENOTIFICATIONSWITHERROR_SNIPPET = exports.CIO_DIDFAILTOREGISTERFORREMOTENOTIFICATIONSWITHERROR_REGEX = exports.CIO_DIDFAILTOREGISTERFORREMOTENOTIFICATIONSWITHERRORFULL_REGEX = exports.CIO_DEEPLINK_COMMENT_REGEX = exports.CIO_CONFIGUREDEEPLINK_KILLEDSTATE_SNIPPET = exports.CIO_CONFIGURECIOSDKPUSHNOTIFICATION_SNIPPET = exports.CIO_APP_PUSH_NOTIFICATIONS_HANDLER_SNIPPET = exports.CIO_APP_PUSH_NOTIFICATIONS_HANDLER_REGEX = exports.CIO_APPDELEGATEHEADER_USER_NOTIFICATION_CENTER_SNIPPET = exports.CIO_APPDELEGATEHEADER_REGEX = exports.CIO_APPDELEGATEHEADER_IMPORT_SNIPPET = exports.CIO_APPDELEGATEDECLARATION_REGEX = exports.BUNDLE_VERSION_TEMPLATE_REGEX = exports.BUNDLE_SHORT_VERSION_TEMPLATE_REGEX = void 0;
exports.getRelativePathToRNSDK = getRelativePathToRNSDK;
const finder = require('find-package-json');
const path = require('path');
const resolveFrom = require('resolve-from');
const f = finder(__dirname);
let pluginPackageRoot = f.next().filename;
// This is the path to the root of the customerio-expo-plugin package
pluginPackageRoot = path.dirname(pluginPackageRoot);
const LOCAL_PATH_TO_CIO_NSE_FILES = exports.LOCAL_PATH_TO_CIO_NSE_FILES = path.join(pluginPackageRoot, 'plugin/src/helpers/native-files/ios');
function getRelativePathToRNSDK(iosPath) {
  // Root path of the Expo project
  const rootAppPath = path.dirname(iosPath);
  // Path of the cio RN package.json file. Example: test-app/node_modules/customerio-reactnative/package.json
  const pluginPackageJsonPath = resolveFrom.silent(rootAppPath, `customerio-reactnative/package.json`);
  // Example: ../node_modules/customerio-reactnative
  return path.relative(iosPath, path.dirname(pluginPackageJsonPath));
}
const IOS_DEPLOYMENT_TARGET = exports.IOS_DEPLOYMENT_TARGET = '13.0';
const GROUP_IDENTIFIER_TEMPLATE_REGEX = exports.GROUP_IDENTIFIER_TEMPLATE_REGEX = /{{GROUP_IDENTIFIER}}/gm;
const BUNDLE_SHORT_VERSION_TEMPLATE_REGEX = exports.BUNDLE_SHORT_VERSION_TEMPLATE_REGEX = /{{BUNDLE_SHORT_VERSION}}/gm;
const BUNDLE_VERSION_TEMPLATE_REGEX = exports.BUNDLE_VERSION_TEMPLATE_REGEX = /{{BUNDLE_VERSION}}/gm;
const CIO_DIDFINISHLAUNCHINGMETHOD_REGEX = exports.CIO_DIDFINISHLAUNCHINGMETHOD_REGEX = /.*\[super(\s)application:application(\s)didFinishLaunchingWithOptions:launchOptions\];/;
const CIO_DIDFAILTOREGISTERFORREMOTENOTIFICATIONSWITHERROR_REGEX = exports.CIO_DIDFAILTOREGISTERFORREMOTENOTIFICATIONSWITHERROR_REGEX = /return \[super application:application didFailToRegisterForRemoteNotificationsWithError:error\];/;
const CIO_DIDFAILTOREGISTERFORREMOTENOTIFICATIONSWITHERRORFULL_REGEX = exports.CIO_DIDFAILTOREGISTERFORREMOTENOTIFICATIONSWITHERRORFULL_REGEX = /(- \(void\)application:\(UIApplication \*\)application didFailToRegisterForRemoteNotificationsWithError:\(NSError \*\)error(\s|\n)*?\{)(.|\n){2}.*\n\}/;
const CIO_DIDREGISTERFORREMOTENOTIFICATIONSWITHDEVICETOKEN_REGEX = exports.CIO_DIDREGISTERFORREMOTENOTIFICATIONSWITHDEVICETOKEN_REGEX = /return \[super application:application didRegisterForRemoteNotificationsWithDeviceToken:deviceToken\];/;
const CIO_APPDELEGATEDECLARATION_REGEX = exports.CIO_APPDELEGATEDECLARATION_REGEX = /@implementation AppDelegate(.|\n)/;
const CIO_APPDELEGATEHEADER_REGEX = exports.CIO_APPDELEGATEHEADER_REGEX = /(@interface AppDelegate\s*:\s*EXAppDelegateWrapper\s*)(<([^>]+)>)?/;
const CIO_RCTBRIDGE_DEEPLINK_MODIFIEDOPTIONS_REGEX = exports.CIO_RCTBRIDGE_DEEPLINK_MODIFIEDOPTIONS_REGEX = /^\s*RCTBridge\s*\*\s*\w+\s*=\s*\[\s*self\.reactDelegate\s+createBridgeWithDelegate:self\s+launchOptions:launchOptions\s*\];\s*$/gm;
const CIO_LAUNCHOPTIONS_DEEPLINK_MODIFIEDOPTIONS_REGEX = exports.CIO_LAUNCHOPTIONS_DEEPLINK_MODIFIEDOPTIONS_REGEX = /^\s*return\s\[\s*super\s*application:\s*application\s*didFinishLaunchingWithOptions\s*:\s*launchOptions\s*\];/gm;
const CIO_DEEPLINK_COMMENT_REGEX = exports.CIO_DEEPLINK_COMMENT_REGEX = /\sDeep link workaround for app killed state start/gm;
const DEFAULT_BUNDLE_VERSION = exports.DEFAULT_BUNDLE_VERSION = '1';
const DEFAULT_BUNDLE_SHORT_VERSION = exports.DEFAULT_BUNDLE_SHORT_VERSION = '1.0';
const CIO_TARGET_NAME = exports.CIO_TARGET_NAME = 'CustomerIOSDK';
const CIO_NOTIFICATION_TARGET_NAME = exports.CIO_NOTIFICATION_TARGET_NAME = 'NotificationService';
const CIO_APPDELEGATEHEADER_IMPORT_SNIPPET = exports.CIO_APPDELEGATEHEADER_IMPORT_SNIPPET = `#import <UserNotifications/UserNotifications.h>`;
const CIO_APPDELEGATEHEADER_USER_NOTIFICATION_CENTER_SNIPPET = exports.CIO_APPDELEGATEHEADER_USER_NOTIFICATION_CENTER_SNIPPET = 'UNUserNotificationCenterDelegate';
const CIO_PUSHNOTIFICATIONHANDLERDECLARATION_SNIPPET = exports.CIO_PUSHNOTIFICATIONHANDLERDECLARATION_SNIPPET = `
CIOAppPushNotificationsHandler* pnHandlerObj = [[CIOAppPushNotificationsHandler alloc] init];
`;
const CIO_RCTBRIDGE_DEEPLINK_MODIFIEDOPTIONS_SNIPPET = exports.CIO_RCTBRIDGE_DEEPLINK_MODIFIEDOPTIONS_SNIPPET = `
RCTBridge *bridge = [self.reactDelegate createBridgeWithDelegate:self launchOptions:modifiedLaunchOptions];
`;
const CIO_LAUNCHOPTIONS_MODIFIEDOPTIONS_SNIPPET = exports.CIO_LAUNCHOPTIONS_MODIFIEDOPTIONS_SNIPPET = `
return [super application:application didFinishLaunchingWithOptions:modifiedLaunchOptions];`;
const CIO_DIDFAILTOREGISTERFORREMOTENOTIFICATIONSWITHERROR_SNIPPET = exports.CIO_DIDFAILTOREGISTERFORREMOTENOTIFICATIONSWITHERROR_SNIPPET = `
  [super application:application didFailToRegisterForRemoteNotificationsWithError:error];
  [pnHandlerObj application:application error:error];
`;
const CIO_DIDREGISTERFORREMOTENOTIFICATIONSWITHDEVICETOKEN_SNIPPET = exports.CIO_DIDREGISTERFORREMOTENOTIFICATIONSWITHDEVICETOKEN_SNIPPET = `
  [super application:application didRegisterForRemoteNotificationsWithDeviceToken:deviceToken];
  return [pnHandlerObj application:application deviceToken:deviceToken];
`;
const CIO_CONFIGURECIOSDKPUSHNOTIFICATION_SNIPPET = exports.CIO_CONFIGURECIOSDKPUSHNOTIFICATION_SNIPPET = `
  // Register for push notifications
  [pnHandlerObj registerPushNotification];
`;
const CIO_INITIALIZECIOSDK_SNIPPET = exports.CIO_INITIALIZECIOSDK_SNIPPET = `  
  [pnHandlerObj initializeCioSdk];

// Code to make the CIO SDK compatible with expo-notifications package.
// 
// The CIO SDK and expo-notifications both need to handle when a push gets clicked. However, iOS only allows one click handler to be set per app.
// To get around this limitation, we set the CIO SDK as the click handler. The CIO SDK sets itself up so that when another SDK or host iOS app 
// sets itself as the click handler, the CIO SDK will still be able to handle when the push gets clicked, even though it's not the designated 
// click handler in iOS at runtime. 
// 
// This should work for most SDKs. However, expo-notifications is unique in it's implementation. It will not setup push click handling it if detects 
// that another SDK or host iOS app has already set itself as the click handler:
// https://github.com/expo/expo/blob/1b29637bec0b9888e8bc8c310476293a3e2d9786/packages/expo-notifications/ios/EXNotifications/Notifications/EXNotificationCenterDelegate.m#L31-L37
// ...to get around this, we must manually set it as the click handler after the CIO SDK. That's what this code block does.
//
// Note: Initialize the native iOS SDK and setup SDK push click handling before running this code. 
# if __has_include(<EXNotifications/EXNotificationCenterDelegate.h>)
  // Creating a new instance, as the comments in expo-notifications suggests, does not work. With this code, if you send a CIO push to device and click on it,
  // no push metrics reporting will occur.
  // EXNotificationCenterDelegate *notificationCenterDelegate = [[EXNotificationCenterDelegate alloc] init];

  // ...instead, get the singleton reference from Expo. 
  id<UNUserNotificationCenterDelegate> notificationCenterDelegate = (id<UNUserNotificationCenterDelegate>) [EXModuleRegistryProvider getSingletonModuleForClass:[EXNotificationCenterDelegate class]];
  UNUserNotificationCenter *center = [UNUserNotificationCenter currentNotificationCenter];
  center.delegate = notificationCenterDelegate;
# endif
`;
const CIO_CONFIGUREDEEPLINK_KILLEDSTATE_SNIPPET = exports.CIO_CONFIGUREDEEPLINK_KILLEDSTATE_SNIPPET = `
// Deep link workaround for app killed state start
NSMutableDictionary *modifiedLaunchOptions = [NSMutableDictionary dictionaryWithDictionary:launchOptions];
  if (launchOptions[UIApplicationLaunchOptionsRemoteNotificationKey]) {
      NSDictionary *pushContent = launchOptions[UIApplicationLaunchOptionsRemoteNotificationKey];
      if (pushContent[@"CIO"] && pushContent[@"CIO"][@"push"] && pushContent[@"CIO"][@"push"][@"link"]) {
        NSString *initialURL = pushContent[@"CIO"][@"push"][@"link"];
          if (!launchOptions[UIApplicationLaunchOptionsURLKey]) {
              modifiedLaunchOptions[UIApplicationLaunchOptionsURLKey] = [NSURL URLWithString:initialURL];
          }
      }
  }
//Deep link workaround for app killed state ends
`;
const CIO_REGISTER_PUSHNOTIFICATION_SNIPPET = exports.CIO_REGISTER_PUSHNOTIFICATION_SNIPPET = `
@objc(registerPushNotification)
  public func registerPushNotification() {

    let center  = UNUserNotificationCenter.current()
    center.requestAuthorization(options: [.sound, .alert, .badge]) { (granted, error) in
      if error == nil{
        DispatchQueue.main.async {
          UIApplication.shared.registerForRemoteNotifications()
        }
      }
    }
  }`;
const CIO_APP_PUSH_NOTIFICATIONS_HANDLER_REGEX = exports.CIO_APP_PUSH_NOTIFICATIONS_HANDLER_REGEX = /var reactNativeFactory: RCTReactNativeFactory\?/;
const CIO_APP_PUSH_NOTIFICATIONS_HANDLER_SNIPPET = exports.CIO_APP_PUSH_NOTIFICATIONS_HANDLER_SNIPPET = 'var pnHandlerObj = CIOAppPushNotificationsHandler()';
const CIO_INITIALIZE_SDK_REGEX = exports.CIO_INITIALIZE_SDK_REGEX = /FirebaseApp\.configure\(\)/;
const CIO_INITIALIZE_SDK_SNIPPET = exports.CIO_INITIALIZE_SDK_SNIPPET = `
    pnHandlerObj.registerPushNotification()
    pnHandlerObj.initializeCioSdk()
    
    
#if canImport(EXNotifications)
    // Creating a new instance, as the comments in expo-notifications suggest, does not work.
    // With this code, if you send a CIO push to device and click on it,
    // no push metrics reporting will occur.
    // let notificationCenterDelegate = EXNotificationCenterDelegate()

    // …instead, get the singleton reference from Expo.
    if let notificationCenterDelegate =  Expo.ModuleRegistryProvider
      .getSingletonModule(for: Expo.UNUserNotificationCenterDelegate.self)
        as? UNUserNotificationCenterDelegate
    {
        let center = UNUserNotificationCenter.current()
        center.delegate = notificationCenterDelegate
    }
#endif`;
const CIO_OVERRIDE_REMOTE_NOTIFICATION_REGEX = exports.CIO_OVERRIDE_REMOTE_NOTIFICATION_REGEX = /\/\/ Universal Links/;
const CIO_OVERRIDE_REMOTE_NOTIFICATION_SNIPPET = exports.CIO_OVERRIDE_REMOTE_NOTIFICATION_SNIPPET = `
  public override func application(_ application: UIApplication,
                            didRegisterForRemoteNotificationsWithDeviceToken deviceToken: Data) {
      super.application(application, didRegisterForRemoteNotificationsWithDeviceToken: deviceToken)
    pnHandlerObj.application(application, didRegisterForRemoteNotificationsWithDeviceToken: deviceToken)
  }
 
  public override func application(_ application: UIApplication,
                            didFailToRegisterForRemoteNotificationsWithError error: Error) {
      super.application(application, didFailToRegisterForRemoteNotificationsWithError: error)
    pnHandlerObj.application(application, didFailToRegisterForRemoteNotificationsWithError: error)
  }
  
  // Explicitly define remote notification delegates to ensure compatibility with some third-party libraries
  public override func application(_ application: UIApplication,
                            didReceiveRemoteNotification userInfo: [AnyHashable: Any],
                            fetchCompletionHandler completionHandler: @escaping (UIBackgroundFetchResult) -> Void) {
      super.application(application,
                        didReceiveRemoteNotification: userInfo,
                        fetchCompletionHandler: completionHandler)
  }`;
//# sourceMappingURL=ios.js.mapap
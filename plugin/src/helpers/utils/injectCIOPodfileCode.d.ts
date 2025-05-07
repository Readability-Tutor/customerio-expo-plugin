import type { CustomerIOPluginOptionsIOS } from '../../types/cio-types';
export declare function injectCIOPodfileCode(iosPath: string, isFcmPushProvider: boolean): Promise<void>;
export declare function injectCIONotificationPodfileCode(iosPath: string, useFrameworks: CustomerIOPluginOptionsIOS['useFrameworks'], isFcmPushProvider: boolean): Promise<void>;

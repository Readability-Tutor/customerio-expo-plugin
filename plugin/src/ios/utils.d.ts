import type { CustomerIOPluginOptionsIOS } from '../types/cio-types';
/**
 * Returns t
 * @param iosOptions The plugin iOS configuration options
 * @returns true if FCM is configured to be used as push provider
 */
export declare const isFcmPushProvider: (iosOptions?: CustomerIOPluginOptionsIOS) => boolean;

import { withXcodeProject } from '@expo/config-plugins';
import { isFcmPushProvider } from './utils';
import { injectCIOPodfileCode } from '../helpers/utils/injectCIOPodfileCode';
export const withCioXcodeProject = (config, cioProps) => {
  return withXcodeProject(config, async props => {
    const iosPath = props.modRequest.platformProjectRoot;
    await injectCIOPodfileCode(iosPath, isFcmPushProvider(cioProps));
    return props;
  });
};
//# sourceMappingURL=withXcodeProject.js.map
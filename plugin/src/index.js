import { withCIOAndroid } from './android/withCIOAndroid';
import { withCIOIos } from './ios/withCIOIos';
// Entry point for config plugin
function withCustomerIOPlugin(config, props) {
    if (props.ios) {
        config = withCIOIos(config, props.ios);
    }
    if (props.android) {
        config = withCIOAndroid(config, props.android);
    }
    return config;
}
export default withCustomerIOPlugin;

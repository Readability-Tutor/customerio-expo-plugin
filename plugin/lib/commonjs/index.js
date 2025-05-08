"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _withCIOAndroid = require("./android/withCIOAndroid");
var _withCIOIos = require("./ios/withCIOIos");
// Entry point for config plugin
function withCustomerIOPlugin(config, props) {
  if (props.ios) {
    config = (0, _withCIOIos.withCIOIos)(config, props.ios);
  }
  if (props.android) {
    config = (0, _withCIOAndroid.withCIOAndroid)(config, props.android);
  }
  return config;
}
var _default = exports.default = withCustomerIOPlugin;
//# sourceMappingURL=index.js.map
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getPluginVersion = void 0;
var _fs = _interopRequireDefault(require("fs"));
var _path = _interopRequireDefault(require("path"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
/**
 * Reads the version of the plugin from its `package.json` and returns it as a string.
 */
const getPluginVersion = () => {
  // Always resolves relative to the utility file's location
  const packageJsonPath = _path.default.resolve(__dirname, '../../../../../package.json');
  if (!_fs.default.existsSync(packageJsonPath)) {
    throw new Error(`package.json not found at ${packageJsonPath}`);
  }
  const packageJson = JSON.parse(_fs.default.readFileSync(packageJsonPath, 'utf8'));
  if (!packageJson.version) {
    throw new Error(`"version" field is missing in ${packageJsonPath}`);
  }
  return packageJson.version;
};
exports.getPluginVersion = getPluginVersion;
//# sourceMappingURL=pluginUtils.js.map
const { testAppPath } = require("../../utils");
const fs = require("fs-extra");
const path = require("path");

const testProjectPath = testAppPath();
const iosPath = path.join(testProjectPath, "ios");
const notificationServiceInfoPlistPath = path.join(iosPath, "NotificationService/NotificationService-Info.plist");

test("Plugin creates expected NotificationService-Info.plist", async () => {
  const content = await fs.readFile(notificationServiceInfoPlistPath, "utf8");

  expect(content).toMatchSnapshot();
});

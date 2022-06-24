import isNpmOrYarn from './isNpmOrYarn';
import hasNewVersion from './hasNewVersion';
import { IUpdate } from './types';

const simpleUpdateNotifier = async (args: IUpdate) => {
  if (!process.stdout.isTTY || (isNpmOrYarn && !args.shouldNotifyInNpmScript)) {
    return;
  }

  try {
    const latestVersion = await hasNewVersion(args);
    if (latestVersion) {
      const dash = '_'.repeat(27 + args.pkg.name.length);
      console.log(`${dash}
New version of ${args.pkg.name} available!
Current Version: ${args.pkg.version}
Latest Version: ${latestVersion}
${dash}`);
    }
  } catch {
    // Catch any network errors or cache writing errors so module doesn't cause a crash
  }
};

export default simpleUpdateNotifier;

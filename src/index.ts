import getDistVersion from './getDistVersion';
import isNpmOrYarn from './isNpmOrYarn';
import { createConfigDir, getLastUpdate, saveLastUpdate } from './cache';

interface IUpdate {
  pkg: { name: string; version: string };
  updateCheckInterval?: number;
  shouldNotifyInNpmScript?: boolean;
  distTag?: string;
  alwaysRun?: boolean;
}

// Currently doesn't handle "-" versions
const isVersionNewer = (oldVersion: string, newVersion: string) => {
  const oldVersionArray = oldVersion.split('.');
  const newVersionArray = newVersion.split('.');
  for (let i = 0; i < oldVersionArray.length; i++) {
    if (Number(oldVersionArray[i]) < Number(newVersionArray[i])) {
      return true;
    } else if (Number(oldVersionArray[i]) > Number(newVersionArray[i])) {
      return false;
    }
  }
  return false;
};

export const hasNewVersion = async ({
  pkg,
  updateCheckInterval = 1000 * 60 * 60 * 24,
  distTag = 'latest',
  alwaysRun,
}: IUpdate) => {
  createConfigDir();
  const lastUpdateCheck = getLastUpdate(pkg.name);
  if (
    alwaysRun ||
    !lastUpdateCheck ||
    lastUpdateCheck < new Date().getTime() - updateCheckInterval
  ) {
    const latestVersion = await getDistVersion(pkg.name, distTag);
    if (isVersionNewer(pkg.version, latestVersion)) {
      return latestVersion;
    }
    saveLastUpdate(pkg.name);
    return false;
  } else {
    return false;
  }
};

const simpleUpdateNotifier = async (args: IUpdate) => {
  if (!process.stdout.isTTY || (isNpmOrYarn && !args.shouldNotifyInNpmScript)) {
    return;
  }

  const latestVersion = await hasNewVersion(args);
  if (latestVersion) {
    console.log(
      `New version of ${args.pkg.name} available!\nCurrent Version: ${args.pkg.version}\nLatest Version: ${latestVersion}`
    );
  }
};

export default simpleUpdateNotifier;

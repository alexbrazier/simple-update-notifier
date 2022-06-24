import { createConfigDir, getLastUpdate, saveLastUpdate } from './cache';
import getDistVersion from './getDistVersion';
import { IUpdate } from './types';

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

const hasNewVersion = async ({
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
    saveLastUpdate(pkg.name);
    if (isVersionNewer(pkg.version, latestVersion)) {
      return latestVersion;
    }
    return false;
  } else {
    return false;
  }
};

export default hasNewVersion;

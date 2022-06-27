import { createConfigDir, getLastUpdate, saveLastUpdate } from './cache';
import getDistVersion from './getDistVersion';
import { IUpdate } from './types';

export const isVersionNewer = (oldVersion: string, newVersion: string) => {
  const vOld = oldVersion.split('-');
  const vNew = newVersion.split('-');
  const oldVersionArray = vOld[0].split('.');
  const newVersionArray = vNew[0].split('.');
  for (let i = 0; i < oldVersionArray.length; i++) {
    if (Number(oldVersionArray[i]) < Number(newVersionArray[i])) {
      return true;
    } else if (Number(oldVersionArray[i]) > Number(newVersionArray[i])) {
      return false;
    }
  }
  const preOldArray = (vOld[1] || '').split('.')
  const preNewArray = (vNew[1] || '').split('.')
  const preOld = preOldArray[1] || preOldArray[0]
  const preNew = preNewArray[1] || preNewArray[0]
  if ((vOld[1] && !vNew[1]) || (Number(preOld) < Number(preNew))) {
    return true;
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

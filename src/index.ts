import os from 'os';
import path from 'path';
import fs from 'fs';
import getDistVersion from './getDistVersion';
import isNpmOrYarn from './isNpmOrYarn';

interface IUpdate {
  pkg: { name: string; version: string };
  updateCheckInterval?: number;
  shouldNotifyInNpmScript?: boolean;
  distTag?: string;
  alwaysRun?: boolean;
}

const homeDirectory = os.homedir();
const configDir =
  process.env.XDG_CONFIG_HOME ||
  path.join(homeDirectory, '.config', 'simple-update-notifier');

const createConfigDir = () => {
  fs.mkdirSync(configDir, { recursive: true });
};

const getLastUpdate = (configFile: string) => {
  try {
    if (!fs.existsSync(configFile)) {
      return undefined;
    }
    const file = JSON.parse(fs.readFileSync(configFile, 'utf8'));
    return file.lastUpdateCheck;
  } catch {
    return undefined;
  }
};

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
  const configFile = path.join(configDir, `${pkg.name}.json`);
  const lastUpdateCheck = getLastUpdate(configFile);
  if (
    alwaysRun ||
    !lastUpdateCheck ||
    lastUpdateCheck < new Date().getTime() - updateCheckInterval
  ) {
    const latestVersion = await getDistVersion(pkg.name, distTag);
    console.log(latestVersion);
    if (isVersionNewer(pkg.version, latestVersion)) {
      return latestVersion;
    }
    fs.writeFileSync(
      configFile,
      JSON.stringify({ lastUpdateCheck: new Date().getTime() })
    );
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

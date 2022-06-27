import hasNewVersion, { isVersionNewer } from './hasNewVersion';
import { getLastUpdate } from './cache';
import getDistVersion from './getDistVersion';

jest.mock('./getDistVersion', () => jest.fn().mockReturnValue('1.0.0'));
jest.mock('./cache', () => ({
  getLastUpdate: jest.fn().mockReturnValue(undefined),
  createConfigDir: jest.fn(),
  saveLastUpdate: jest.fn(),
}));

const pkg = { name: 'test', version: '1.0.0' };

afterEach(() => jest.clearAllMocks());

test('it should not trigger update for same version', async () => {
  const newVersion = await hasNewVersion({
    pkg,
    shouldNotifyInNpmScript: true,
    alwaysRun: true,
  });

  expect(newVersion).toBe(false);
});

test('it should trigger update for patch version bump', async () => {
  (getDistVersion as jest.Mock).mockReturnValue('1.0.1');

  const newVersion = await hasNewVersion({
    pkg,
    shouldNotifyInNpmScript: true,
    alwaysRun: true,
  });

  expect(newVersion).toBe('1.0.1');
});

test('it should trigger update for minor version bump', async () => {
  (getDistVersion as jest.Mock).mockReturnValue('1.1.0');

  const newVersion = await hasNewVersion({
    pkg,
    shouldNotifyInNpmScript: true,
    alwaysRun: true,
  });

  expect(newVersion).toBe('1.1.0');
});

test('it should trigger update for major version bump', async () => {
  (getDistVersion as jest.Mock).mockReturnValue('2.0.0');

  const newVersion = await hasNewVersion({
    pkg,
    shouldNotifyInNpmScript: true,
    alwaysRun: true,
  });

  expect(newVersion).toBe('2.0.0');
});

test('it should not trigger update if version is lower', async () => {
  (getDistVersion as jest.Mock).mockReturnValue('0.0.9');

  const newVersion = await hasNewVersion({
    pkg,
    shouldNotifyInNpmScript: true,
    alwaysRun: true,
  });

  expect(newVersion).toBe(false);
});

it('should trigger update check if last update older than config', async () => {
  const TWO_WEEKS = new Date().getTime() - 1000 * 60 * 60 * 24 * 14;
  (getLastUpdate as jest.Mock).mockReturnValue(TWO_WEEKS);
  const newVersion = await hasNewVersion({
    pkg,
    shouldNotifyInNpmScript: true,
  });

  expect(newVersion).toBe(false);
  expect(getDistVersion).toHaveBeenCalled();
});

it('should not trigger update check if last update is too recent', async () => {
  const TWELVE_HOURS = new Date().getTime() - 1000 * 60 * 60 * 12;
  (getLastUpdate as jest.Mock).mockReturnValue(TWELVE_HOURS);
  const newVersion = await hasNewVersion({
    pkg,
    shouldNotifyInNpmScript: true,
  });

  expect(newVersion).toBe(false);
  expect(getDistVersion).not.toHaveBeenCalled();
});

describe('isVersionNewer', () => {
  test('returns true for patch increase', () => {
    expect(isVersionNewer('1.0.0', '1.0.1')).toBe(true);
  });
  test('returns true for minor increase', () => {
    expect(isVersionNewer('1.0.0', '1.1.0')).toBe(true);
  });
  test('returns true for major increase', () => {
    expect(isVersionNewer('1.0.0', '2.0.0')).toBe(true);
  });
  test('returns true for patch increase ignoring prerelease flag', () => {
    expect(isVersionNewer('1.0.0-development', '1.0.1')).toBe(true);
  });
  test('returns false for same version', () => {
    expect(isVersionNewer('1.0.0', '1.0.0')).toBe(false);
  });
  test('returns false for same version ignoring prerelease flag', () => {
    expect(isVersionNewer('1.0.0-development', '1.0.0')).toBe(false);
  });
  test('returns false for lower patch version', () => {
    expect(isVersionNewer('1.0.1', '1.0.0')).toBe(false);
  });
  test('returns false for lower minor version', () => {
    expect(isVersionNewer('1.1.0', '1.0.0')).toBe(false);
  });
  test('returns false for lower minor version', () => {
    expect(isVersionNewer('2.0.0', '1.0.0')).toBe(false);
  });
});

import { hasNewVersion } from '.';
import getDistVersion from './getDistVersion';

jest.mock('./getDistVersion', () => jest.fn().mockReturnValue('1.0.0'));

test('it should not trigger update for same version', async () => {
  const newVersion = await hasNewVersion({
    pkg: {
      name: 'test',
      version: '1.0.0',
    },
    shouldNotifyInNpmScript: true,
    alwaysRun: true,
  });

  expect(newVersion).toBe(false);
});

test('it should trigger update for patch version bump', async () => {
  (getDistVersion as jest.Mock).mockReturnValue('1.0.1');

  const newVersion = await hasNewVersion({
    pkg: {
      name: 'test',
      version: '1.0.0',
    },
    shouldNotifyInNpmScript: true,
    alwaysRun: true,
  });

  expect(newVersion).toBe('1.0.1');
});

test('it should trigger update for minor version bump', async () => {
  (getDistVersion as jest.Mock).mockReturnValue('1.1.0');

  const newVersion = await hasNewVersion({
    pkg: {
      name: 'test',
      version: '1.0.0',
    },
    shouldNotifyInNpmScript: true,
    alwaysRun: true,
  });

  expect(newVersion).toBe('1.1.0');
});

test('it should trigger update for major version bump', async () => {
  (getDistVersion as jest.Mock).mockReturnValue('2.0.0');

  const newVersion = await hasNewVersion({
    pkg: {
      name: 'test',
      version: '1.0.0',
    },
    shouldNotifyInNpmScript: true,
    alwaysRun: true,
  });

  expect(newVersion).toBe('2.0.0');
});

test('it should not trigger update if version is lower', async () => {
  (getDistVersion as jest.Mock).mockReturnValue('0.0.9');

  const newVersion = await hasNewVersion({
    pkg: {
      name: 'test',
      version: '1.0.0',
    },
    shouldNotifyInNpmScript: true,
    alwaysRun: true,
  });

  expect(newVersion).toBe(false);
});

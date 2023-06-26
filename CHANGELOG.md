# [2.0.0](https://github.com/alexbrazier/simple-update-notifier/compare/v1.1.0...v2.0.0) (2023-06-26)

## BREAKING CHANGES

- Bump semver version to avoid audit errors for users of the library (#19)
  - Min node version is now >= 10
  - If you already use a higher version of node then you can safely upgrade

## Other Updates

- chore(deps): bump ua-parser-js from 1.0.2 to 1.0.33 (#17)
- chore(deps): bump json5 from 2.2.1 to 2.2.3 (#18)
- Update dev dependencies to latest (#21)
- Force semver to latest version in for dev deps (#22)

# [1.1.0](https://github.com/alexbrazier/simple-update-notifier/compare/v1.0.8...v1.1.0) (2022-11-24)

Add debug flag to simpleUpdateNotifier() (#15)
Use stderr, not stdout, for notification (#16)

## [1.0.8](https://github.com/alexbrazier/simple-update-notifier/compare/v1.0.7...v1.0.8) (2022-11-23)

Adds support for vendor prefixed packages (#12)

## [1.0.7](https://github.com/alexbrazier/simple-update-notifier/compare/v1.0.6...v1.0.7) (2022-06-28)

Downgrade semver to `7.0.0` to continue to support node 8

## [1.0.6](https://github.com/alexbrazier/simple-update-notifier/compare/v1.0.5...v1.0.6) (2022-06-27)

Switch to using [semver](https://github.com/npm/node-semver)

## [1.0.5](https://github.com/alexbrazier/simple-update-notifier/compare/v1.0.4...v1.0.5) (2022-06-27)

Handle prerelease versions

## [1.0.4](https://github.com/alexbrazier/simple-update-notifier/compare/v1.0.3...v1.0.4) (2022-06-26)

Handle invalid version response and prerelease versions

## [1.0.3](https://github.com/alexbrazier/simple-update-notifier/compare/v1.0.2...v1.0.3) (2022-06-26)

Add support for node 8

## [1.0.2](https://github.com/alexbrazier/simple-update-notifier/compare/v1.0.1...v1.0.2) (2022-06-24)

Add bordered box around update notification

## [1.0.1](https://github.com/alexbrazier/simple-update-notifier/compare/v1.0.0...v1.0.1) (2022-06-24)

Fix writing to cache and build for cjs

# 1.0.0 (2022-06-23)

Initial Release

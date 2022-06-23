# simple-update-notifier

Simple update notifier to check for npm updates for cli applications with zero dependencies.

## Install

```bash
npm install simple-update-notifier
OR
yarn add simple-update-notifier
```

## Usage

```js
import updateNotifier from 'update-notifier';
import packageJson from './package.json' assert { type: 'json' };

updateNotifier({ pkg: packageJson });
```

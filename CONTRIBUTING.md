# Contributing

We want this community to be friendly and respectful to each other. Please follow it in all your interactions with the project.

## Development workflow

To get started with the project, run `yarn` in the root directory to install the required dependencies

Make sure your code passes TypeScript and ESLint. Run the following to verify:

```sh
yarn build
yarn lint
```

To fix formatting errors, run the following:

```sh
yarn prettier
```

Remember to add tests for your change if possible. Run the unit tests by:

```sh
yarn test
```

### Linting and tests

[ESLint](https://eslint.org/), [Prettier](https://prettier.io/), [TypeScript](https://www.typescriptlang.org/)

We use [TypeScript](https://www.typescriptlang.org/) for type checking, [ESLint](https://eslint.org/) with [Prettier](https://prettier.io/) for linting and formatting the code, and [Jest](https://jestjs.io/) for testing.

### Scripts

The `package.json` file contains various scripts for common tasks:

- `yarn lint`: lint files with ESLint.
- `yarn test`: run unit tests with Jest.
- `yarn build`: build the code for release.

### Sending a pull request

> **Working on your first pull request?** You can learn how from this _free_ series: [How to Contribute to an Open Source Project on GitHub](https://egghead.io/series/how-to-contribute-to-an-open-source-project-on-github).

When you're sending a pull request:

- Prefer small pull requests focused on one change.
- Verify that linters and tests are passing.
- Review the documentation to make sure it looks good.
- Follow the pull request template when opening a pull request.
- For pull requests that change the API or implementation, discuss with maintainers first by opening an issue.

### Releasing

> Maintainers only

- Run `yarn release`
- Update the changelog if required and follow the prompts

# ui

This library provides the primary UI components for the app.

## Running unit tests

Run `nx test ui` to execute the unit tests via [Jest](https://jestjs.io).

## Running storybook

Run `nx run ui:storybook` to execute the storybook via [Storybook](https://storybook.js.org).

### Runtime issue

There seems to be an issue with OpenSSL. Will result in running storybook to
print out the following:

```bash
Error: error:0308010C:digital envelope routines::unsupported
```

Then run:

```bash
export NODE_OPTIONS=--openssl-legacy-provider
```

## Running lint

Run `nx run ui:lint` to execute the lint via [ESLint](https://eslint.org).

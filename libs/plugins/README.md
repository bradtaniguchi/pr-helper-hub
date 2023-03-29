# plugins

This library holds all generators for future projects. Generators can be used to
generate common files and folders for a project that follow the usual way of building projects.

## Building

Run `nx build plugins` to build the library.

## Running unit tests

Run `nx test plugins` to execute the unit tests via [Jest](https://jestjs.io).

## Creating another generator

To create a new generator use the following:

```bash
nx generate @nrwl/nx-plugin:generator <generator-name> --project=plugins
```

**note** the `--project=plugins` is required to ensure the generator is created in this project, which holds
all generators.

ref: <https://nx.dev/recipes/generators/local-generators>

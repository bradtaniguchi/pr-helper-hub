# pr-helper-hub

This template repository is a re-build of the [nx-workspace-template](https://github.com/bradtaniguchi/nx-workspace-template), which focuses on Angular development. This version will focus on React development, and a straight forward CI/CD pipeline.

## Notes

When running with node 18, there may be an issue related to SSL:

```text
Error: error:0308010C:digital envelope routines::unsupported
```

To fix this run the following for Linux:

```bash
export NODE_OPTIONS=--openssl-legacy-provider
```

## License

[MIT](./LICENSE.md)

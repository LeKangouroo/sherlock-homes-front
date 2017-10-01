# Dependencies

* [NodeJS](https://nodejs.org) (v8.x)


# Available commands

To start development mode:

```shell
$> npm run dev
```

To build the distributable version:

```shell
$> npm run build:preprod
$> npm run build:prod
```

To remove build files

```shell
$> npm run clean # removes tmp/ directory
$> npm run fclean # removes tmp/ and dist/ directories
```

To create a tarball (.tar.gz) of the dist/ directory

```shell
$> npm run zip
```

To send release email

```shell
$> npm run email
```

To generate todo based on comments in the code

```shell
$> npm run todos # creates a TODO.md file in tmp/ directory
```

To run tests

```shell
$> npm test # all tests
$> npm run test:instrumented # instrumented tests only
$> npm run test:unit # unit tests only
```

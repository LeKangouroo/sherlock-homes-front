# Dependencies

* [NodeJS](https://nodejs.org) (v6.7.x LTS)


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

To deploy dist on an FTP server (after npm run build)
duplicate config/tasks/ftp.json.example and remove .example extension then:

```shell
$> npm run deploy:preprod
$> npm run deploy:prod
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

To get Git changelog

```shell
$> npm run changelog -- --start=<commit-id>
```

To send release email

```shell
$> npm run email -- --changelog-start=<commit-id>
```

To generate todo based on comments in the code

```shell
$> npm run todos # creates a TODO.md file in tmp/ directory
```

To run tests

```shell
$> npm run tests # all tests
$> npm run tests:instrumented # instrumented tests only
$> npm run tests:unit # unit tests only
```

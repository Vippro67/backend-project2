## Description

Backend cho ứng dụng mạng xã hội cho người nuôi thú cưng

## Installation

```bash
$ npm install
```

## To set up the data source

```bash
$ npm run typeorm -d dist/db/data-source.js
```

## To run migrations
```bash
$ npm run migration:generate
$ npm run migration:run
$ npm run migration:revert

```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```


# NestJS GraphQL Boilerplate codes
* Boiler plate code for NestJS with Node20x
* Deployment with AWS Serverless on Api Gateway and Lambda
* Deployment with AWS on ECS
* Deployment with Google Cloud
* Reference: https://github.com/nestjs/docs.nestjs.com/issues/96

## Description
* On local, REST API and GraphQL can both be exposed at the same time on: `localhost:3000` and `localhost:3000/graphql`
* On AWS, API Gateway will need to be configured to point to <LambdaURL> or <LambdaURL/graphql>

## Installation

```bash
$ npm install
```

## Creating nest resource
* Tours REST endpoint will be deployed on root <LambdaURL> or <localhost:3000>
`nest g resource tours` and setup REST Api endpoint for tours CRUD
* Books GraphQL endpoint will be deployed on <LambdaURL/graphql> or <localhost:3000/graphql>
`nest g rosource books` and setup GraphQL Api endpoint for books CRUD

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

## References
* [Scalfolding Nest](https://docs.nestjs.com/)
`npm i -g @nestjs/cli` and `nest new project-name`
* [Quickstart with NestJS GraphQL](https://docs.nestjs.com/graphql/quick-start):
`npm i @nestjs/graphql @nestjs/apollo @apollo/server graphql`
* Install [Nest ConfigService](https://docs.nestjs.com/techniques/configuration#using-the-configservice) to be used parsing env files:
`npm i @nestjs/config`
* Using [Joi](https://joi.dev) and Class Validator for configs and DTO. Alternatives are [validator](https://www.npmjs.com/package/validator)
* Logger with [Pino](https://www.npmjs.com/package/nestjs-pino?activeTab=readme):
`npm i pino-http pino-pretty nestjs-pino`
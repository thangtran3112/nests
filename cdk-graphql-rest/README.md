# CDK solution for `api-graphql-rest`

- This would require the api-graphql-rest/build on the sibbling folder.
- [Understand CORS setup with Api gateway](https://dev.to/aws-builders/your-complete-api-gateway-and-cors-guide-11jb)

## Reference

https://medium.com/nextfaze/deploying-serverless-api-with-nestjs-and-aws-cdk-3d41063543e0
https://github.com/NextFaze/awesome-serverless-api

## Installation

`cdk init app --language typescript`
`npm i`

## Deployment

- Adjust the `account` and `region` under ./bin/cdk-graphql-rest.ts
- Note: No need to do `npm run build`, the command `cdk deploy` should be enough
  `npx cdk bootstrap`
  `npx cdk deploy -- --profile <profileName>`
  `npx cdk deploy` to use default profile
  `npx cdk destroy` to clean up the stack

## Useful commands

- `npm run build` compile typescript to js
- `npm run watch` watch for changes and compile
- `npm run test` perform the jest unit tests
- `npx cdk deploy` deploy this stack to your default AWS account/region
- `npx cdk diff` compare deployed stack with current state
- `npx cdk synth` emits the synthesized CloudFormation template

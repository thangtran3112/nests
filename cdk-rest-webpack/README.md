# CDK solution

## Installation

- Navigate to ./api and run `npm run build-lambda`
- Edit ./bin/cdk-graphql-rest.ts to change account and region
- Make sure to `aws configure` and set up credentials before running `npx cdk deploy`

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

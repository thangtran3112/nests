# CDK solution

- If deployment on Appsync as a Http datasource with IAM authentication. [Follow this guideline](https://advancedweb.hu/use-the-http-data-source-to-interact-with-http-apis-directly-from-appsync/)
- Create an Appsync role to allow Appsync invoke Lambda Url. [See sample here](./lib/appsync/service.role.md)
- Edit [http.json](./lib/appsync/http.json) with the right lambdaUrl
- Upload `http.json` to your targeted aws account, using your appsync apiId and service role arn
- [Command to upload](https://docs.aws.amazon.com/appsync/latest/devguide/tutorial-http-resolvers-js.html#invoking-aws-services-js) in case of using CLI, or by using AWS CloudShell:

```bash
$ aws appsync create-data-source --api-id <APPSYNC_API_ID> \
                               --name LambdaUrlSource1 \
                               --type HTTP \
                               --http-config file://http.json \
                               --service-role-arn <SERVICE_ROLE_ARN>
```

- See JS Resolver for `getBooks` query, and VTL resolver for `createBooks` mutation
- It is also possible to use JS Resolver for `createBooks`
- We may need to forward `idToken` from Cognito, if authed by Cognito. Enabled `Allowed Headers` in Lambda
- ![Configure Lambda Function Url](./lib/appsync/lamba-function-url-config.png)

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

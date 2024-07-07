/* eslint-disable @typescript-eslint/no-unused-vars */
import { resolve } from 'path';
import { Construct } from 'constructs';
import { Cors, LambdaIntegration, RestApi } from 'aws-cdk-lib/aws-apigateway';
import {
  Code,
  LayerVersion,
  Runtime,
  Function as LambdaFunction,
} from 'aws-cdk-lib/aws-lambda';
import { IUserPool } from 'aws-cdk-lib/aws-cognito';
import { Duration } from 'aws-cdk-lib';

export interface ApiConstructProps {
  userPool: IUserPool;
}
const EXPRESS_BUILD_FOLDER = resolve(__dirname, '../api/build');

export class ApiConstruct extends Construct {
  //Option to create Lambda from a Full zip file
  private createLambda(scope: Construct, id: string) {
    // add handler to respond to all our api requests
    return new LambdaFunction(this, `${id}Handler`, {
      code: Code.fromAsset(EXPRESS_BUILD_FOLDER),
      memorySize: 1024,
      timeout: Duration.seconds(30),
      handler: 'handler.handler',
      runtime: Runtime.NODEJS_20_X,
      environment: {
        NODE_ENV: 'production',
      },
    });
  }

  constructor(scope: Construct, id: string) {
    super(scope, id);

    // add handler to respond to all our api requests. Serverless way of deployment (WORKING)
    const lambdaFunction = this.createLambda(this, id);

    // Esbuild bundling deployment (NOT YET WORKING)
    // const lambdaFunction = this.createLambdaWithLayer(this, id);

    const api = new RestApi(this, `${id}-webpack-rest`, {
      defaultCorsPreflightOptions: {
        allowOrigins: Cors.ALL_ORIGINS,
        allowMethods: Cors.ALL_METHODS,
        allowHeaders: Cors.DEFAULT_HEADERS,
        allowCredentials: true,
      },
    });

    // add proxy resource to handle all api requests
    const apiResource = api.root.addProxy({
      defaultIntegration: new LambdaIntegration(lambdaFunction),
    });

    /*
    apiResource.addMethod(
      'OPTIONS',
      new MockIntegration({
        integrationResponses: [
          {
            statusCode: '200',
            responseTemplates: {
              'application/json': '{"message": "Hello World!"}',
            },
            responseParameters: {
              // 👇 allow CORS for all origins
              'method.response.header.Access-Control-Allow-Origin': "'*'",
              'method.response.header.Access-Control-Allow-Headers':
                "'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token,X-Amz-User-Agent'",
              'method.response.header.Access-Control-Allow-Credentials':
                "'true'",
              'method.response.header.Access-Control-Allow-Methods':
                "'OPTIONS,GET,PUT,POST,DELETE'",
            },
          },
        ],
        requestTemplates: {
          'application/json': '{"statusCode": 200}',
        },
      }),

      {
        methodResponses: [
          {
            statusCode: '200',
            responseModels: {
              'application/json': Model.EMPTY_MODEL,
            },
            responseParameters: {
              // 👇 allow CORS for all origins
              'method.response.header.Access-Control-Allow-Origin': true,
              'method.response.header.Access-Control-Allow-Headers': true,
              'method.response.header.Access-Control-Allow-Credentials': true,
              'method.response.header.Access-Control-Allow-Methods': true,
            },
          },
        ],
      }
    );*/
  }
}

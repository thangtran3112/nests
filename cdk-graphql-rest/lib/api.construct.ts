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

const API_NODE_MODULES = resolve(
  __dirname,
  '../../api-graphql-rest/build/node_modules',
);
const API_BUILD_FOLDER = resolve(__dirname, '../../api-graphql-rest/build');
const SERVERLESS_ZIP_PACKAGE = resolve(
  __dirname,
  '../../api-graphql-rest/.serverless/graphql-rest.zip',
);

export class ApiConstruct extends Construct {
  // UNTESTED: Option to build Lambda with a node_modules layer
  private createLambdaWithLayer(scope: Construct) {
    const lambdaLayer = new LayerVersion(this, 'HandlerLayer', {
      code: Code.fromAsset(API_NODE_MODULES),
      compatibleRuntimes: [Runtime.NODEJS_20_X],
      description: 'Api Handler Dependencies',
    });

    // add handler to respond to all our api requests
    return new LambdaFunction(this, 'Handler', {
      code: Code.fromAsset(API_BUILD_FOLDER, {
        exclude: ['node_modules'],
      }),
      handler: 'serverless.handler',
      runtime: Runtime.NODEJS_20_X,
      layers: [lambdaLayer],
      environment: {
        NODE_ENV: 'production',
      },
    });
  }

  //Option to create Lambda from a Full zip file
  private createLambdaFromZipPackage(scope: Construct) {
    // add handler to respond to all our api requests
    return new LambdaFunction(this, 'Handler', {
      code: Code.fromAsset(SERVERLESS_ZIP_PACKAGE),
      memorySize: 1024,
      timeout: Duration.seconds(30),
      handler: 'dist/serverless.handler',
      runtime: Runtime.NODEJS_20_X,
      environment: {
        //without this option, the Lambda will try to generate schema.gql inside the Runtime
        //which is not allowed by Lambda
        NODE_ENV: 'production',
      },
    });
  }

  constructor(scope: Construct, id: string) {
    super(scope, id);

    // add handler to respond to all our api requests
    const lambdaFunction = this.createLambdaFromZipPackage(this);

    const api = new RestApi(this, `graphql-rest-api`, {
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

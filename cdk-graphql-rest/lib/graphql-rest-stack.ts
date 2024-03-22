import * as cdk from 'aws-cdk-lib';
import { Stack } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { ApiConstruct } from './api.construct';

export class GraphqlRestStack extends Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    new ApiConstruct(this, 'ApiTestConstruct');
  }
}

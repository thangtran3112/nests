import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class Tour {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}

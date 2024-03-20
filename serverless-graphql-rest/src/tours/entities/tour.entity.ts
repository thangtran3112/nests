import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class Tour {
  @Field(() => Int, { description: 'tourId (placeholder)' })
  tourId: number;

  @Field(() => String, { description: 'tour name (placeholder)' })
  name: string;
}

import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateTourInput {
  @Field(() => Int, { description: 'tourId (placeholder)' })
  tourId: number;

  @Field(() => String, { description: 'tour name (placeholder)' })
  name: string;
}

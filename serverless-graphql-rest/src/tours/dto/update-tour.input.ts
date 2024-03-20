import { CreateTourInput } from './create-tour.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateTourInput extends PartialType(CreateTourInput) {
  @Field(() => String)
  name: string;

  @Field(() => Int)
  tourId: number;
}

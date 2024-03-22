import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { AbstractEntity } from '../../databases/mongoose/abstract.entity';

@Schema()
export class TourDocument extends AbstractEntity {
  //We can remove this prop, if we use the default _id from MongoDB
  @Prop()
  tourId: string;

  @Prop()
  name: string;

  //A Mongo Document can also contains other nested Document inside
  //   @Prop([MessageDocument])
  //   messages: MessageDocument[];
}

export const TourSchema = SchemaFactory.createForClass(TourDocument);

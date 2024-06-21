import { Module } from '@nestjs/common';
import { ToursService } from './tours.service';
import { ToursResolver } from './tours.resolver';
import { ToursController } from './tours.controller';

@Module({
  imports: [
    //DatabaseModule.forFeature([{ name: Tour.name, schema: TourSchema }]),
    // forwardRef(() => OtherModule), //in case of circular dependency
  ],
  providers: [
    ToursResolver,
    ToursService,
    // ToursRepository
  ],
  //exports: [ToursRepository],
  //Optionally to add REST controller in the same module.
  controllers: [ToursController],
})
export class ToursModule {}

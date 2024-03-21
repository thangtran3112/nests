import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AbstractRepository } from 'databases/mongoose/abstract.repository';
import { TourDocument } from './entities/tour.document';
import { Tour } from './entities/tour.entity';

@Injectable()
export class ToursRepository extends AbstractRepository<TourDocument> {
  protected readonly logger = new Logger(ToursRepository.name);

  constructor(@InjectModel(Tour.name) tourModel: Model<TourDocument>) {
    super(tourModel);
  }
}

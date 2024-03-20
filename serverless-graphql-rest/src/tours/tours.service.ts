import { Injectable } from '@nestjs/common';
import { CreateTourInput } from './dto/create-tour.input';
import { UpdateTourInput } from './dto/update-tour.input';
import { Tour } from './entities/tour.entity';

@Injectable()
export class ToursService {
  //Boilerplate code without actual repository
  static tours: Tour[] = [
    {
      tourId: 1234,
      name: 'Amazon tour',
    },
  ];

  async create(createTourInput: CreateTourInput) {
    ToursService.tours.push(createTourInput);
    return this.findOne(createTourInput.tourId);
  }

  async findAll(): Promise<Tour[]> {
    return ToursService.tours;
  }

  async findOne(tourId: number): Promise<Tour> {
    return ToursService.tours.find((tour) => tour.tourId === tourId);
  }

  async update(updateTourInput: UpdateTourInput) {
    const tour = await this.findOne(updateTourInput.tourId);
    tour.name = updateTourInput.name;
  }

  async remove(tourId: number) {
    const toBeDeletedTour = await this.findOne(tourId);
    const remainingTours = ToursService.tours.filter(
      (tour) => tour.tourId !== tourId,
    );
    ToursService.tours = remainingTours;
    return toBeDeletedTour;
  }
}

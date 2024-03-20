import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { ToursService } from './tours.service';
import { Tour } from './entities/tour.entity';
import { CreateTourInput } from './dto/create-tour.input';
import { UpdateTourInput } from './dto/update-tour.input';

@Resolver(() => Tour)
export class ToursResolver {
  constructor(private readonly toursService: ToursService) {}

  @Mutation(() => Tour)
  async createTour(@Args('createTourInput') createTourInput: CreateTourInput) {
    return this.toursService.create(createTourInput);
  }

  @Query(() => [Tour], { name: 'getAllTours' })
  async findAll() {
    return this.toursService.findAll();
  }

  @Query(() => Tour, { name: 'getTour' })
  async findOne(@Args('tourId', { type: () => Int }) tourId: number) {
    return this.toursService.findOne(tourId);
  }

  @Mutation(() => Tour)
  async updateTour(@Args('updateTourInput') updateTourInput: UpdateTourInput) {
    await this.toursService.update(updateTourInput);
    return this.toursService.findOne(updateTourInput.tourId);
  }

  @Mutation(() => Tour)
  async removeTour(@Args('tourId', { type: () => Int }) tourId: number) {
    return this.toursService.remove(tourId);
  }
}

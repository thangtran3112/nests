import { Controller, Get } from '@nestjs/common';
import { ToursService } from './tours.service';

/**REST controller, not a GRAPHQL endpoint */
@Controller('tours')
export class ToursController {
  constructor(private readonly toursService: ToursService) {}

  //localhost:3000/tours/count GET
  @Get('count')
  async countTours() {
    return this.toursService.countTours();
  }
}

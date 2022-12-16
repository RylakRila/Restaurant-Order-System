import { Injectable, Inject } from '@nestjs/common';

import { FoodService } from './food/food.service';

@Injectable()
export class AppService {
  constructor(
    @Inject(FoodService)
    private readonly foodService: FoodService
  ) {}
  
  async getRecommeneds() {
    const recommends = await this.foodService.getRecommendedFood();
    
    return recommends;
  }
}

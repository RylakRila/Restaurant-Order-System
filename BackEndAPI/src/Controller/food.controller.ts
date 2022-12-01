import { Controller, Get } from "@nestjs/common";

import { FoodService } from "src/Service/food.service";

@Controller('food')
export class FoodController {
    constructor(private readonly foodService: FoodService) {}
    
    @Get('meal')
    async getMealFood() {
        const mealFoods = await this.foodService.getMealFood();
        return mealFoods;
    }
    
    @Get('dessert')
    async getDessertFood() {
        const dessertFoods = await this.foodService.getDessertFood();
        return dessertFoods;
    }
}
import { Controller, Get, Post, Body } from "@nestjs/common";

import { FoodService } from "src/Service/food.service";

@Controller('food')
export class FoodController {
    constructor(private readonly foodService: FoodService) {}
    
    @Get('meals')
    async getMealFood() {
        const mealFoods = await this.foodService.getMealFood();
        return mealFoods;
    }
    
    @Get('desserts')
    async getDessertFood() {
        const dessertFoods = await this.foodService.getDessertFood();
        return dessertFoods;
    }
    
    @Get('drinks')
    async getDrinkFood() {
        const drinkFoods = await this.foodService.getDrinkFood();
        return drinkFoods;
    }
    
    @Get('snacks')
    async getSnackFood() {
        const snackFoods = await this.foodService.getSnackFood();
        return snackFoods;
    }
    
    @Post('add')
    async addMenuFood(
        @Body('title') foodName: string,
        @Body('price') price: number,
        @Body('description') description: string,
        @Body('category') category: string,
        @Body('image') imageLink: string,
        @Body('recommended') recommended: boolean
    ) {
        const result = await this.foodService.addMenuFood(
            foodName,
            price,
            description,
            category,
            imageLink,
            recommended
        );
        return result;
    }
}

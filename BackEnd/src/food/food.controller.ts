import { Controller, Get, Post, Body } from "@nestjs/common";
import { Delete, Param, Put } from "@nestjs/common/decorators";

import { FoodService } from "src/food/food.service";

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
        @Body('category') category: "Meal" | "Drink" | "Dessert" | "Snack",
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
    
    @Put('edit/:foodId')
    async editMenuFood(
        @Param('foodId') foodId: string,
        @Body('title') foodName: string,
        @Body('price') price: number,
        @Body('description') description: string,
        @Body('category') category: "Meal" | "Drink" | "Dessert" | "Snack",
        @Body('image') imageLink: string,
        @Body('recommended') recommended: boolean
    ) {
        const result = await this.foodService.editMenuFood(foodId, foodName, price, description, category, imageLink, recommended);
        return result;
    }
    
    @Delete('delete/:foodId')
    async deleteMenuFood(@Param('foodId') foodId: string) {
        const result = await this.foodService.deleteMenuFood(foodId);
        return result;
    }
}

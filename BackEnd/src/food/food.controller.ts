import { Controller, Get, Post, Body } from "@nestjs/common";
import { Delete, Param, Put, UseGuards, Headers } from "@nestjs/common/decorators";

import { FoodService } from "./food.service";

import { AuthService } from "../auth/auth.service";
import { JwtAuthGuard } from "../auth/guard/jwt.guard";

@Controller('food')
export class FoodController {
    constructor(
        private readonly foodService: FoodService,
        private readonly authService: AuthService,
    ) {}
    
    @Get('meals')
    async getMealFood() {
        const mealFoods = await this.foodService.getFoodByCategory('Meal');
        return mealFoods;
    }
    
    @Get('desserts')
    async getDessertFood() {
        const dessertFoods = await this.foodService.getFoodByCategory('Dessert');
        return dessertFoods;
    }
    
    @Get('drinks')
    async getDrinkFood() {
        const drinkFoods = await this.foodService.getFoodByCategory('Drink');
        return drinkFoods;
    }
    
    @Get('snacks')
    async getSnackFood() {
        const snackFoods = await this.foodService.getFoodByCategory('Snack');
        return snackFoods;
    }
    
    @Post('add')
    @UseGuards(JwtAuthGuard)
    async addMenuFood(
        @Headers() headers: Headers,
        @Body('title') foodName: string,
        @Body('price') price: number,
        @Body('description') description: string,
        @Body('category') category: "Meal" | "Drink" | "Dessert" | "Snack",
        @Body('image') imageLink: string,
        @Body('recommended') recommended: boolean
    ) {
        if (this.authService.getUserByToken(headers['authorization']).role !== 'admin') 
            return {message: 'You are not authorized to add a food item!'};
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
    @UseGuards(JwtAuthGuard)
    async editMenuFood(
        @Headers() headers: Headers,
        @Param('foodId') foodId: string,
        @Body('title') foodName: string,
        @Body('price') price: number,
        @Body('description') description: string,
        @Body('category') category: "Meal" | "Drink" | "Dessert" | "Snack",
        @Body('image') imageLink: string,
        @Body('recommended') recommended: boolean
    ) {
        if (this.authService.getUserByToken(headers['authorization']).role !== 'admin') 
            return {message: 'You are not authorized to edit a food item!'};
        const result = await this.foodService.editMenuFood(foodId, foodName, price, description, category, imageLink, recommended);
        return result;
    }
    
    @Delete('delete/:foodId')
    @UseGuards(JwtAuthGuard)
    async deleteMenuFood(
        @Headers() headers: Headers,
        @Param('foodId') foodId: string
    ) {
        if (this.authService.getUserByToken(headers['authorization']).role !== 'admin') 
            return {message: 'You are not authorized to delete a food item!'};
        const result = await this.foodService.deleteMenuFood(foodId);
        return result;
    }
}

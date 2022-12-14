import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";

import { Food } from "../Model/Food.Model";

@Injectable()
export class FoodService {
    constructor(
        @InjectModel('Food') 
        private readonly foodModel: Model<Food>
    ) {}
    
    async addMenuFood(
        foodName: string,
        price: number,
        description: string,
        category: string,
        imageLink: string,
        recommended: boolean
    ) {
        const newFood = new this.foodModel({
            foodName,
            price,
            description,
            category,
            imageLink,
            recommended
        })
        
        const result = await newFood.save();
        return result;
    }
    
    async getMealFood() {
        const mealFoods = await this.foodModel.find({category: 'Meal'}).exec();
        return mealFoods as Food[];
    }
    
    async getDessertFood() {
        const dessertFoods = await this.foodModel.find({category: 'Dessert'}).exec();
        return dessertFoods as Food[];
    }
    
    async getDrinkFood() {
        const drinkFoods = await this.foodModel.find({category: 'Drink'}).exec();
        return drinkFoods as Food[];
    }
    
    async getSnackFood() {
        const snackFoods = await this.foodModel.find({category: 'Snack'}).exec();
        return snackFoods as Food[];
    }
}

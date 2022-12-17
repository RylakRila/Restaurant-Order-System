import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";

import { Food } from "./food.model";

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
        category: "Meal" | "Drink" | "Dessert" | "Snack",
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
        });
        
        const result = await newFood.save();
        return result;
    }
    
    async getFoodByCategory(category: string) {
        const foods = await this.foodModel.find({category: category}).exec();
        return foods;
    }
    
    async getRecommendedFood() {
        const recommendedFoods = await this.foodModel.find({recommended: true}).exec();
        return recommendedFoods as Food[];
    }
    
    async getFoodPrice(foodId: string) {
        return (await this.foodModel.findById(foodId).exec()).price
    }
    
    async editMenuFood(
        foodId: string,
        foodName: string,
        price: number,
        description: string,
        category: "Meal" | "Drink" | "Dessert" | "Snack",
        imageLink: string,
        recommended: boolean
    ) {
        const result = await this.foodModel.updateOne(
            { _id: foodId },
            {
                $set: {
                    foodName,
                    price,
                    description,
                    category,
                    imageLink,
                    recommended
                }
            },
            { runValidators: true }
        );
        
        return result;
    }
    
    async deleteMenuFood(foodId: string) {
        const result = await this.foodModel.deleteOne({ _id: foodId });
        return result;
    }
}

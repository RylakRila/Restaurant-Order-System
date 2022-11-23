import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";

import { Food } from "../Model/Food.Model";

@Injectable()
export class FoodService {
    constructor(
        @InjectModel('Food') private readonly foodModel: Model<Food>
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
    }
}
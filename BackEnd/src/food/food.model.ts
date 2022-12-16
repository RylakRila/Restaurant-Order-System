import { Schema } from "mongoose";

export const FoodSchema = new Schema({
    foodName: String,
    price: Number,
    description: String,
    category: {
        type: String,
        enum: ['Meal', 'Drink', 'Dessert', 'Snack']
    },
    imageLink: String,
    recommended: Boolean
}, {
    collection: "foods"
});

export interface Food {
    id: string;
    foodName: string;
    price: number;
    description: string;
    category: "Meal" | "Drink" | "Dessert" | "Snack";
    imageLink: string;
    recommended: boolean;
}

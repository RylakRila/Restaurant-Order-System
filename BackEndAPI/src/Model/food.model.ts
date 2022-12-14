import { Schema} from "mongoose";

export const FoodSchema = new Schema({
    foodName: String,
    price: Number,
    description: String,
    category: String,
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
    category: string;
    imageLink: string;
    recommended: boolean;
}

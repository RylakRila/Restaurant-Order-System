import { Schema, model } from "mongoose";

const FoodSchema = new Schema({
    foodName: String,
    price: Number,
    description: String,
    category: String,
    imageLink: String
}, {
    collection: "foods"
});

const Food = model("Food", FoodSchema);

export default Food;
import { Schema, model } from "mongoose";

const RecommandSchema = new Schema({
    recommandFoods: [{
        foodId: Schema.Types.ObjectId,
        ref: "Food"
    }]
});

const Recommand = model("Recommand", RecommandSchema);

export default Recommand;
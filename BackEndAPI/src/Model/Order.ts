import { Schema, model } from "mongoose";

const OrderSchema = new Schema({
    orderDate: {
        type: Date,
        default: Date.now()
    },
    orderItems: [{
        foodId: Schema.Types.ObjectId,
        ref: "Food",
        quantity: Number
    }], 
    totalPrice: Number
}, {
    collection: "orders"
});

const Order = model("Order", OrderSchema);

export default Order;
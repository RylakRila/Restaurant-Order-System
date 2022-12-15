import { Schema } from "mongoose";

export const OrderItemSchema = new Schema({
    foodId: Schema.Types.ObjectId,
    quantity: Number
}, {
    collection: "orderitems"
});

export interface OrderItem {
    id: string;
    foodId: string;
    quantity: number;
}

import { Schema, Types } from "mongoose";

export const OrderItemSchema = new Schema({
    foodId: Schema.Types.ObjectId,
    orderId: Schema.Types.ObjectId,
    quantity: Number
}, {
    collection: "orderitems"
});

export interface OrderItem {
    id: string;
    foodId: Types.ObjectId;
    orderId: Types.ObjectId;
    quantity: number;
}

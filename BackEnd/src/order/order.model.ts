import { Schema } from "mongoose";

export const OrderSchema = new Schema({
    items: [{
        type: Schema.Types.ObjectId,
        ref: 'OrderItem'
    }],
    orderDate: {
        type: Date,
        default: Date.now()
    },
    totalPrice: Number,
    userId: String,
    queue: {
        queueType: {
            type: String,
            enum: ['TakeOut', 'DineIn'],
        },
        queueNumber: Number
    },
    finished: Boolean
});

export interface Order {
    id: string;
    items: string[];
    orderDate: Date;
    totalPrice: number;
    userId: string | undefined;
    queue: {
        queueType: 'TakeOut' | 'DineIn';
        queueNumber: number;
    }
    finished: boolean;
}

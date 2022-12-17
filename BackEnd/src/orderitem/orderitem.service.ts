import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, Types } from "mongoose";

import { OrderItem } from "src/orderitem/orderitem.model";

@Injectable()
export class OrderItemService {
    constructor(
        @InjectModel('OrderItem')
        private readonly orderItemModel: Model<OrderItem>
    ) {}
    
    async addOrderItem(
        foodId: Types.ObjectId,
        quantity: number
    ) {
        const newOrderItem = new this.orderItemModel({
            foodId,
            quantity
        });
        
        const result = await newOrderItem.save();
        return result;
    }
    
    async deleteOrderItem(orderId: string) {
        const result = await this.orderItemModel.deleteMany({ orderId: orderId }).exec();
        return result;
    }
    
    async getOrderItemById(orderItemId: Types.ObjectId) {
        return await this.orderItemModel.findById(orderItemId).exec();
    }
}

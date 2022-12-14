import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";

import { OrderItem } from "src/Model/orderitem.model";

@Injectable()
export class OrderItemService {
    constructor(
        @InjectModel('OrderItem')
        private readonly orderItemModel: Model<OrderItem>
    ) {}
    
    async addOrderItem(
        foodId: string,
        quantity: number
    ) {
        const newOrderItem = new this.orderItemModel({
            foodId,
            quantity
        })
        
        const result = await newOrderItem.save();
        return result;
    }
}

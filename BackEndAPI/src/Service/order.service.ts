import { Inject, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, Types } from "mongoose";

import { Order } from "src/Model/order.model";
import { FoodService } from "./food.service";
import { OrderItemService } from "./orderitem.service";

@Injectable()
export class OrderService {
    constructor(
        @InjectModel('Order')
        private readonly orderModel: Model<Order>,
        @Inject(OrderItemService)
        private readonly orderItemService: OrderItemService,
        @Inject(FoodService)
        private readonly foodService: FoodService,
    ) {}
    
    async addOrder( 
        items: {foodId: string, quantity: number}[],
        queueType: 'TakeOut' | 'DineIn',
    ) {
        let orderItems: Types.ObjectId[] = [],
            totalPrice: number = 0.0,
            queueNumber: number;
        
        await Promise.all(items.map(async item => {
            const orderItem = 
                await this.orderItemService.addOrderItem(
                    new Types.ObjectId(item.foodId), 
                    item.quantity
                );
            orderItems.push(orderItem._id);
            
            const price = (await this.foodService.getFoodPrice(item.foodId)) * item.quantity;
            totalPrice += price;
        }));
        
        queueNumber = await this.orderModel.countDocuments({"queue.queueType": queueType, finished: false});
        
        const newOrder = new this.orderModel({
            items: orderItems,
            totalPrice: totalPrice,
            queue: {
                queueType: queueType,
                queueNumber: queueNumber + 1
            },
            finished: false
        });
        
        return await newOrder.save();
    }
    
    async finishesOrder(orderId: string) {
        const order = await this.orderModel.findById(orderId);
        order.finished = true;
        return await order.save();
    }
    
    async getQueueNumberById(orderId: string) {
        const idWithNumber = await this.orderModel.findById(orderId).select('queue.queueNumber');
        return idWithNumber;
    }
    
    async deleteOrder(orderId: string) {
        const order = await this.orderModel.findById(orderId);
        await Promise.all(order.items.map(async item => {
            await this.orderItemService.deleteOrderItem(item);
        }));
        
        return await this.orderModel.deleteOne({ _id: orderId }).exec();
    }
}

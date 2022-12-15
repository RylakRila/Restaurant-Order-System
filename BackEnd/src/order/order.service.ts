import { Inject, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, Types } from "mongoose";

import { Order } from "src/order/order.model";
import { FoodService } from "../food/food.service";
import { OrderItemService } from "../orderitem/orderitem.service";

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
    
    async placeOrder( 
        items: {foodId: string, quantity: number}[],
        queueType: 'TakeOut' | 'DineIn',
        jwtWebToken: string | null
    ) {
        let orderItems: Types.ObjectId[] = [],
            totalPrice: number = 0.0;
        
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
        
        const newOrder = new this.orderModel({
            items: orderItems,
            totalPrice: totalPrice,
            queue: {
                queueType: queueType,
                queueNumber: undefined
            },
            finished: false
        });
        
        return newOrder;
    }
    
    async saveOrder(orderInfo: object) {
        const order = new this.orderModel(orderInfo);
        
        // get the number in take out or dine in queue
        order.queue.queueNumber  = (await this.orderModel.countDocuments({"queue.queueType": order.queue.queueType, finished: false})) + 1;
        
        return await order.save();
    }
    
    async cancelOrder(orderInfo: object) {
        const order = new this.orderModel(orderInfo);
        return await Promise.all(order.items.map(async itemId => {
            return await this.orderItemService.deleteOrderItem(itemId);
        }));
    }
    
    async finishesOrder(orderId: string) {
        const order = await this.orderModel.findById(orderId);
        order.finished = true;
        return await order.save();
    }
    
    async getQueueNumberById(orderId: string | Types.ObjectId) {
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

import { Inject, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, Types } from "mongoose";

import { Order } from "src/order/order.model";
import { FoodService } from "../food/food.service";
import { OrderItemService } from "../orderitem/orderitem.service";
import { User } from "src/user/user.model";
import Decimal from "decimal.js";

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
        user: User
    ) { 
        let orderItems: Types.ObjectId[] = [],
            totalPrice: Decimal = new Decimal(0);
        
        await Promise.all(items.map(async item => {
            if (item.quantity <= 0) return;
            
            if (items.some(item => {
                return items.some(sameFoodIdItem => {
                    return item !== sameFoodIdItem && item.foodId === sameFoodIdItem.foodId;
                });
            })) {
                throw new Error('Request body contains duplicate foodId. If same food placed multiple times, use quantity instead.');
            }
            
            const orderItem = await this.orderItemService.addOrderItem(
                new Types.ObjectId(item.foodId), 
                item.quantity
            );
            
            const price = new Decimal(await this.foodService.getFoodPrice(item.foodId)).times(new Decimal(item.quantity));
            totalPrice = totalPrice.plus(price);
            
            orderItems.push(orderItem._id);
        }));
        
        const newOrder = new this.orderModel({
            items: orderItems,
            totalPrice: totalPrice.toNumber(),
            userId:(user && user.role === "user") ? user.id: undefined,
            queue: {
                queueType: queueType,
                queueNumber: undefined
            },
            finished: false
        });
        
        orderItems.forEach(async itemId => {
            const orderItem = await this.orderItemService.getOrderItemById(itemId);
            orderItem.orderId = newOrder._id;
            await orderItem.save();
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
        return await this.orderItemService.deleteOrderItem(order.id);
    }
    
    async finishesOrder(orderId: string) {
        const order = await this.orderModel.findById(orderId);
        order.finished = true;
        return await order.save();
    }
    
    async getQueueNumberById(orderId: string | Types.ObjectId) {
        const idWithNumber = await this.orderModel.findById(orderId).select('queue');
        return idWithNumber;
    }
    
    async deleteOrder(orderId: string) {
        this.orderItemService.deleteOrderItem(orderId);
        return await this.orderModel.deleteOne({ _id: orderId }).exec();
    }
    
    async getOrders(user: User) {        
        if (user.role === 'admin') {
            return await this.orderModel.find().exec();
        } else if (user.role === "user") {
            return await this.orderModel.find({ userId: user.id }).exec();
        }
    }
}

import { Body, Controller, Get, Param, Post, Put } from "@nestjs/common";

import { OrderService } from "src/Service/order.service";

@Controller('order')
export class OrderController {
    constructor(private readonly orderService: OrderService) {}
    
    @Post('add')
    async addOrder(
        @Body('items') items: {foodId: string, quantity: number}[],
        @Body('queueType') queueType: 'TakeOut' | 'DineIn',
    ) {
        const result = await this.orderService.addOrder(items, queueType);
        return result;
    }
    
    @Put('finish/:orderId')
    async finishesOrder(
        @Param('orderId') 
        orderId: string
    ) {
        const result = await this.orderService.finishesOrder(orderId);
        return result;
    }
    
    @Get(':orderId/number')
    async getQueueNumberById(
        @Param('orderId')
        orderId: string
    ) {
        const result = await this.orderService.getQueueNumberById(orderId);
        return result;
    }
}

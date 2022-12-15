import { Body, Controller, Delete, Get, Param, Post, Put, Request } from "@nestjs/common";

import { OrderService } from "src/Service/order.service";

@Controller('order')
export class OrderController {
    constructor(private readonly orderService: OrderService) {}
    
    @Post('add')
    async placeOrder(
        @Body('items') items: {foodId: string, quantity: number}[],
        @Body('queueType') queueType: 'TakeOut' | 'DineIn',
    ) {
        const result = await this.orderService.placeOrder(items, queueType);
        return result;
    }
    
    @Post('add/save')
    async saveOrder(
        @Request() req: Request,
    ) {
        const result = await this.orderService.saveOrder(req.body);
        return await this.orderService.getQueueNumberById(result._id);
    }
    
    @Delete('cancel')
    async cancelOrder(
        @Request() req: Request,
    ) {
        const result = await this.orderService.cancelOrder(req.body);
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
    
    @Delete('delete/:orderId')
    async deleteOrder(
        @Param('orderId')
        orderId: string
    ) {
        const result = await this.orderService.deleteOrder(orderId);
        return result;
    }
}

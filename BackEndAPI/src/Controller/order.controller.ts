import { Body, Controller, Post } from "@nestjs/common";

import { OrderService } from "src/Service/order.service";

@Controller('order')
export class OrderController {
    constructor(private readonly orderService: OrderService ) {}
    
    @Post('add')
    async addOrder(
        @Body('items') items: {foodId: string, quantity: number}[],
        @Body('queueType') queueType: 'TakeOut' | 'DineIn',
    ) {
        const result = await this.orderService.addOrder(items, queueType);
        return result;
    }
}
import { Body, Controller, Post } from "@nestjs/common";

import { OrderItemService } from "src/Service/orderitem.service";

@Controller('orderitem')
export class OrderItemController {
    constructor(private readonly orderItemService: OrderItemService ) {}
    
    @Post('add')
    async addOrderItem(
        @Body('foodId') foodId: string,
        @Body('quantity') quantity: number
    ) {
        const result = await this.orderItemService.addOrderItem(
            foodId,
            quantity
        );
        return result;
    }
}

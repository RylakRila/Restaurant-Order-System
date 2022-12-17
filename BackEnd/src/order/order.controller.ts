import { Body, Controller, Delete, Get, Param, Post, Put, Request } from "@nestjs/common";
import { Headers, UseGuards } from "@nestjs/common/decorators";

import { OrderService } from "src/order/order.service";
import { AuthService } from "src/auth/auth.service";
import { JwtAuthGuard } from "src/auth/guard/jwt.guard";

@Controller('order')
export class OrderController {
    constructor(
        private readonly orderService: OrderService,
        private readonly authService: AuthService,
    ) {}
    
    @Post('add')
    async placeOrder(
        @Headers() headers: Headers,
        @Body('items') items: {foodId: string, quantity: number}[],
        @Body('queueType') queueType: 'TakeOut' | 'DineIn',
    ) {
        const user = this.authService.getUserByToken(headers['authorization']);
        if (user && user.role == 'admin') 
            return { message: "Admin cannot place order." }
        const result = await this.orderService.placeOrder(items, queueType, user)
        return result;
    }
    
    @Post('add/save')
    async saveOrder(
        @Request() req: Request,
    ) {
        const result = await this.orderService.saveOrder(req.body)
            .catch(err => {
                console.error(err);
                return err;
            });
        return await this.orderService.getQueueNumberById(result._id);
    }
    
    @Get(':orderId/number')
    async getQueueNumberById(
        @Param('orderId')
        orderId: string
    ) {
        const result = await this.orderService.getQueueNumberById(orderId);
        return result;
    }
    
    @Delete('cancel')
    async cancelOrder(
        @Request() req: Request,
    ) {
        const result = await this.orderService.cancelOrder(req.body);
        return result;
    }
    
    @Put('finish/:orderId')
    @UseGuards(JwtAuthGuard)
    async finishesOrder(
        @Headers() 
        headers: Headers,
        @Param('orderId') 
        orderId: string
    ) {
        if (this.authService.getUserByToken(headers['authorization']).role !== "admin")   
            return {message: 'You are not authorized to finish order'}
        const result = await this.orderService.finishesOrder(orderId);
        return { orderId: result._id, message: 'Order finished' };
    }
    
    @Get('all')
    @UseGuards(JwtAuthGuard)
    async getOrders(
        @Headers() headers: Headers
    ) {
        const user = this.authService.getUserByToken(headers['authorization']);
        const result = await this.orderService.getOrders(user);
        return result;
    }
    
    @Delete('delete/:orderId')
    @UseGuards(JwtAuthGuard)
    async deleteOrder(
        @Headers() 
        headers: Headers,
        @Param('orderId')
        orderId: string
    ) {
        if (this.authService.getUserByToken(headers['authorization']).role !== "admin")     
            return {message: 'You are not authorized to delete an order'}
        const result = await this.orderService.deleteOrder(orderId);
        return result;
    }
}

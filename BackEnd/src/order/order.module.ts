import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { OrderSchema } from 'src/order/order.model';
import { OrderService } from 'src/order/order.service';
import { OrderController } from 'src/order/order.controller';

import { OrderItemModule } from '../orderitem/orderitem.module';
import { FoodModule } from '../food/food.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
    imports: [
        MongooseModule.forFeature([{name: 'Order', schema: OrderSchema}]),
        OrderItemModule,
        FoodModule,
        AuthModule
    ],
    controllers: [OrderController],
    providers: [OrderService]
})
export class OrderModule {}

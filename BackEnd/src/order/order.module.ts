import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { OrderSchema } from 'src/order/order.model';
import { OrderService } from 'src/order/order.service';

import { OrderItemModule } from '../orderitem/orderitem.module';
import { OrderController } from 'src/order/order.controller';
import { FoodModule } from '../food/food.module';

@Module({
    imports: [
        MongooseModule.forFeature([{name: 'Order', schema: OrderSchema}]),
        OrderItemModule,
        FoodModule
    ],
    controllers: [OrderController],
    providers: [OrderService]
})
export class OrderModule {}

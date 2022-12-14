import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { OrderSchema } from 'src/Model/order.model';
import { OrderService } from 'src/Service/order.service';

import { OrderItemModule } from './orderitem.module';
import { OrderController } from 'src/Controller/order.controller';
import { FoodModule } from './food.module';

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

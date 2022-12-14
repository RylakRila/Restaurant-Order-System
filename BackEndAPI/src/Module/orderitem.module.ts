import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { OrderItemController } from 'src/Controller/orderitem.controller';

import { OrderItemSchema } from 'src/Model/orderitem.model';
import { OrderItemService } from 'src/Service/orderitem.service';

@Module({
    imports: [
        MongooseModule.forFeature([{name: 'OrderItem', schema: OrderItemSchema}])
    ],
    controllers: [OrderItemController],
    providers: [OrderItemService]
})
export class OrderItemModule {}

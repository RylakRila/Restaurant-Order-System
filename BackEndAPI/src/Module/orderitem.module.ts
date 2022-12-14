import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { OrderItemSchema } from 'src/Model/orderitem.model';
import { OrderItemService } from 'src/Service/orderitem.service';

@Module({
    imports: [
        MongooseModule.forFeature([{name: 'OrderItem', schema: OrderItemSchema}])
    ],
    controllers: [],
    providers: [OrderItemService],
    exports: [OrderItemService]
})
export class OrderItemModule {}

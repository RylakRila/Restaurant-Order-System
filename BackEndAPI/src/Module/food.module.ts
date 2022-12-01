import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { FoodController } from 'src/Controller/food.controller';
import { FoodSchema } from 'src/Model/food.model';
import { FoodService } from 'src/Service/food.service';

@Module({
    imports: [
        MongooseModule.forFeature([{name: 'Food', schema: FoodSchema}])
    ],
    controllers: [FoodController],
    providers: [FoodService],
})
export class FoodModule {}

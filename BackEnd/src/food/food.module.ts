import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { FoodController } from 'src/food/food.controller';
import { FoodSchema } from 'src/food/food.model';
import { FoodService } from 'src/food/food.service';

import { AuthModule } from 'src/auth/auth.module';

@Module({
    imports: [
        MongooseModule.forFeature([{name: 'Food', schema: FoodSchema}]),
        AuthModule
    ],
    controllers: [FoodController],
    providers: [FoodService],
    exports: [FoodService]
})
export class FoodModule {}

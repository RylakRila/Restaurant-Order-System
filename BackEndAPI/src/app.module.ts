import { Module } from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose';
import * as dotenv from 'dotenv'

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FoodController } from './Controller/food.controller';
import { FoodSchema } from './Model/food.model';
import { FoodService } from './Service/food.service';

dotenv.config();

@Module({
  imports: [
    MongooseModule.forRoot(process.env.DB_URL),
    MongooseModule.forFeature([{name: 'Food', schema: FoodSchema}])
  ],
  controllers: [AppController, FoodController],
  providers: [AppService, FoodService],
})
export class AppModule {}

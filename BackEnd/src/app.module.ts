import { Module } from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose';
import * as dotenv from 'dotenv'

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { FoodModule } from './Module/food.module';
import { OrderModule } from './Module/order.module';

dotenv.config();

@Module({
  imports: [
    MongooseModule.forRoot(process.env.DB_URL),
    FoodModule,
    OrderModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

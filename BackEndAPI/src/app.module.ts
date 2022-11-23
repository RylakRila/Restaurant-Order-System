import { Module } from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose';
import * as dotenv from 'dotenv'

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FoodSchema } from './Model/food.model';

dotenv.config();

@Module({
  imports: [
    MongooseModule.forRoot(process.env.DB_URL),
    MongooseModule.forFeature([{name: 'Food', schema: FoodSchema}])
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

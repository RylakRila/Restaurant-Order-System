import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from "mongoose";

import { Food } from "./Model/Food.Model";
@Injectable()
export class AppService {
  constructor(
    @InjectModel('Food') private readonly foodModel: Model<Food>
  ) {}
  
  async getRecommeneded() {
    const recommended = await this.foodModel.find({recommended: true}).exec();
    
    return recommended as Food[];
  }
}

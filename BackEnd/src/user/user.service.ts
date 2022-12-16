import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, Document, Types } from "mongoose";

import { User } from "src/user/user.model";

@Injectable()
export class UserService {
    constructor(
        @InjectModel('User')
        private readonly userModel: Model<User>
    ) {}
    
    async createUser(
        username: string,
        password: string,
        role: "admin" | "user"
    ) {
        const newUser = new this.userModel({
            username,
            password,
            role
        });
        return await newUser.save();
    }
    
    async findByUsername(username: string) {
        return await this.userModel.findOne({username}).exec();
    }
    
    async getUser(user: Document<unknown, any, User> & User & { _id: Types.ObjectId }) {
        return {
            id: user._id,
            username: user.username,
            role: user.role
        }
    }
}

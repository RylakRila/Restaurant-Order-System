import { Schema } from 'mongoose';

export const UserSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['admin', 'user'],
        default: 'user',
        required: true
    }
}, {
    collection: 'users'
});

export interface User {
    id: string;
    username: string;
    password: string;
    role: "admin" | "user";
}

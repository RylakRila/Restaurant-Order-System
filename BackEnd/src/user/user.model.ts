import { Callback, Schema } from 'mongoose';
import * as bcrypt from 'bcryptjs';

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
});

// UserSchema.pre('save', function(next) {
//     const user = this;
//     if (!user.isModified('password')) return next();
    
//     bcrypt.genSalt(10, (error, salt) => {
//         if (error) return next(error);
        
//         bcrypt.hash(user.password, salt, (error, hash) => {
//             if (error) return next(error);
            
//             user.password = hash;
//             next();
//         });
//     });
// });

// UserSchema.methods.comparePassword = function(password: string, callback: any) {
//     bcrypt.compare(password, this.password, (error, isMatch) => {
//         if (error) return callback(error);
        
//         if (!isMatch) callback(null, isMatch);
        
//         callback(null, this);
//     });
// }

export interface User {
    id: string;
    username: string;
    password: string;
    role: "admin" | "user";
}

import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { UserSchema } from 'src/user/user.model';
import { UserService } from 'src/user/user.service';

@Module({
    imports: [
        MongooseModule.forFeature([{name: 'User', schema: UserSchema}])
    ],
    controllers: [],
    providers: [UserService],
    exports: [UserService]
})
export class UserModule {}

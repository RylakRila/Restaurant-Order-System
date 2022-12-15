import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { UserModule } from 'src/user/user.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './guard/jwt.guard';
import { JwtStrategy } from './guard/jwt.strategy';

@Module({
    imports: [
        UserModule,
        JwtModule.registerAsync({
            imports: [UserModule],
            useFactory: () => ({
                secret: 'secret',
                signOptions: { expiresIn: '3600s' }
            })
        })
    ],
    controllers: [AuthController],
    providers: [AuthService, JwtAuthGuard, JwtStrategy],
})
export class AuthModule {}

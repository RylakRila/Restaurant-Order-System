import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';

import { NewUser } from 'src/user/dto/new-user.dto';
import { ExistingUser } from 'src/user/dto/existing-user.dto';
import { AuthService } from './auth.service';

@Controller()
export class AuthController {
    constructor(
        private readonly authService: AuthService
    ) {}
    
    @Post('register')
    async register(
        @Body() user: NewUser
    ) {
        return await this.authService.register(user);
    }
    
    @Post('login')
    @HttpCode(HttpStatus.OK)
    async login(
        @Body() user: ExistingUser
    ) {
        return await this.authService.login(user);
    }
}

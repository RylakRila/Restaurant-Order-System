import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from "bcryptjs";
import * as jwt from "jsonwebtoken";

import { NewUser } from "../user/dto/new-user.dto";
import { ExistingUser } from "../user/dto/existing-user.dto";
import { UserService } from "../user/user.service";
import { User } from "../user/user.model";


@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService
    ) {}
    
    async hashPassword(password: string) {
        return await bcrypt.hash(password, 12);
    }
    
    async register(user: Readonly<NewUser>) {
        const { username, password, role } = user;
        const exsitingUser = await this.userService.findByUsername(username);
        
        if (exsitingUser) {
            return { error: "User already exists" };
        }
        
        const hashedPassword = await this.hashPassword(password);
        
        const newUser = await this.userService.createUser(username, hashedPassword, role);
        
        return this.userService.getUser(newUser);
    }
    
    async validateUser(username: string, password: string) {
        const user = await this.userService.findByUsername(username);
        if (!user) return null;
        
        const isMatch = await this.passwordMatch(password, user.password);
        if (!isMatch) return null;
        
        return this.userService.getUser(user);
    }
    
    async passwordMatch(password: string, hashedPassword: string) {
        return await bcrypt.compare(password, hashedPassword);
    }
    
    async login(existingUser: ExistingUser) {
        const { username, password } = existingUser;
        const user = await this.validateUser(username, password);
        
        if (!user) return { error: "Invalid credentials" };
        
        const jwt = await this.jwtService.signAsync({ user });
        
        const expireTime = new Date().getTime() + (8 * 60 * 60 * 1000);
        return { token: jwt, expiresIn: expireTime };
    }
    
    getUserByToken(authorizationHeader: string) {
        if (!authorizationHeader) return undefined;

        let user: User,
            jsonWebToken: string = authorizationHeader.split(' ')[1];
        
        jwt.verify(jsonWebToken, 'secret', (err, decodedToken) => {
            if (err) {
                console.log("has error");
            } else {
                user = decodedToken['user'] as User;
            }
        });
        
        return user;
    }
}

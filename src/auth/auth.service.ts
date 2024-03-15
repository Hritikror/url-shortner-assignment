import { HttpException, Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from './../user/user.service';
import { LogInUserDto } from './dto/login-user.dto';
import { JwtService } from '@nestjs/jwt';
import { Users } from './../models/user.entity';
import { CreateUserDto } from './../user/dto/create-user.dto';

@Injectable()
export class AuthService {

    constructor(private usersService:UserService, private jwtService:JwtService) { }


    async createUser(createUserDto: CreateUserDto): Promise<Users> {
        return this.usersService.createUser(createUserDto);
    }

    async login(authLoginDto: LogInUserDto) {
        const user = await this.validateUser(authLoginDto);

        const payload = {
            userId: user.id,
            userEmail: user.email,
        };  //must be same with payload interface

        return {
            access_token: this.jwtService.sign(payload),
        };
    }

    async validateUser(userLoginDto: LogInUserDto): Promise<Users> {
        const { email, password } = userLoginDto;

        const user = await this.usersService.findUserByEmail(email);
        if(!user || !(await user.validatePassword(password))) {
            throw new HttpException("Invalid credentials",400);
        }
        return user;
    }
}

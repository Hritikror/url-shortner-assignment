import { HttpException, Injectable } from '@nestjs/common';
import { Users } from './../models/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Request } from 'express';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class UserService {

    constructor(
        @InjectRepository(Users) private userRepository: Repository<Users>,
      ) {}
    
      async createUser(createUserDto: CreateUserDto): Promise<Users> {
        const newUser = new Users();
        const { username, email,  password } = createUserDto;

        if(await this.findUserByEmail(email)){
            throw new HttpException("User with given email already exists",400);
        }
        newUser.username = username;
        newUser.email = email;
        newUser.password = password;
    
        return await this.userRepository.save(newUser);
      }
    
      async findUserByEmail(email: string) {
      return await this.userRepository.findOne({where:{email}});
      }

      async fetchUserFromToken(req: Request) {
        try {
          return this.findUserByEmail(req['userToken'].userEmail);
        } catch (error) {
          throw new HttpException('Invalid token', 401);
        }
        
      }

}

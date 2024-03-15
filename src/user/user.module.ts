import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from './user.service';
import { Users } from './../models/user.entity';


@Module({
    imports: [TypeOrmModule.forFeature([Users])],
    providers: [UserService],
    exports: [UserService],
  })
export class UserModule {}

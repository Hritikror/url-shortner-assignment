import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { UrlModule } from './url/url.module';
import { CronModule } from './url/scheduler/scheduler.module';

@Module({
  imports: [//db connection with async way
  ConfigModule.forRoot({
    isGlobal: true,
  }),
  TypeOrmModule.forRootAsync({
    useFactory: () => ({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT, //typecating
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true, // Don't use in production
    }),
  }),UserModule,AuthModule,UrlModule,CronModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { UrlService } from './url.service';
import { UrlController } from './url.controller';
import { TokenMiddleware } from 'src/middleware/token.middleware';
import { UserModule } from 'src/user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Url } from 'src/models/url.entity';
import { Users } from 'src/models/user.entity';


@Module({
  imports: [UserModule,TypeOrmModule.forFeature([Url,Users])],
  controllers: [UrlController],
  providers: [UrlService],
})
export class UrlModule implements NestModule{
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(TokenMiddleware).forRoutes(UrlController);
    }
}
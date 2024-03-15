// cron.module.ts

import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { UrlExpirationService } from './scheduler.service';
import { UrlService } from '../url.service';
import { Url } from 'src/models/url.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [ScheduleModule.forRoot(),TypeOrmModule.forFeature([Url])],
  providers: [UrlExpirationService,UrlService],
})
export class CronModule {}
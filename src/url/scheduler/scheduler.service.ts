// schedule to delete or expire url after expiration time

import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { UrlService } from './../url.service';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Url } from 'src/models/url.entity';

@Injectable()
export class UrlExpirationService {
  constructor(private readonly urlService: UrlService,@InjectRepository(Url)
  private readonly urlRepository: Repository<Url>,) {}

  @Cron(CronExpression.EVERY_5_SECONDS)
  async checkUrlExpiration() {
    try {
        console.log()
      const expiredUrls = await this.urlService.allExpiredUrl();

      for (const url of expiredUrls) {
        // Set isDeleted to true for expired URLs
        url.isDeleted = true;
        await this.urlRepository.save(url);
      }
    } catch (error) {
      console.error('Error checking URL expiration:', error);
    }
  }
}
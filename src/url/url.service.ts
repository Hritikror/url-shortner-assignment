import { HttpException, Inject, Injectable } from '@nestjs/common';
import { Url } from 'src/models/url.entity';
import { Users } from 'src/models/user.entity';
import * as shortid from 'shortid'; // Import the shortid library
import { InjectRepository } from '@nestjs/typeorm';
import { LessThan, Not, Repository, FindOptions  } from 'typeorm';
import * as Redis from 'redis';

@Injectable()
export class UrlService {
  constructor(
    @InjectRepository(Url)
    private readonly urlRepository: Repository<Url>,
  ) {}

  async encodeUrl(user: Users, url: string, expirationTime: string, userAgent:string) {
    try {
      const newUrl = new Url();
      const shortUrl = shortid.generate(); // Generate a short URL

      newUrl.shortId = shortUrl;
      newUrl.url = url;
      newUrl.user = user;
      const currentDate = new Date();

      newUrl.expirationTime = expirationTime ? new Date(currentDate.getTime() + (parseInt(expirationTime) * 60 * 1000)) : null;
    
      const analytics = {clickCount:0,
        clientInfo:[{time: new Date(), device: userAgent}]
      }
      newUrl.analytics = analytics
      await this.urlRepository.save(newUrl);

      return {shortId: newUrl.shortId, referenceUrl: `http://localhost:3000/${newUrl.shortId}`} 
    } catch (error) {
      throw new HttpException('Unable to save short url', 401);
    }
  }

  async fetchUrl(url:string, userAgent:string, user:Users) {
    try {
      const shortId = url
      const urlObject = await this.urlRepository.findOne({ where: { shortId, user, isDeleted:false } })
      urlObject.analytics.clickCount+=1;
      urlObject.analytics.clientInfo.push({time: new Date(), device: userAgent})
      await this.urlRepository.save(urlObject)
      return urlObject.url
    
  
    } catch (error) {
      throw new HttpException('Unable to redirect url, maybe shortUrl is invalid or expired', 401);
    }
  }

  async getAnalytics(user: Users) {
    try {
      return await this.urlRepository.find({where: {user, isDeleted:false}})
    } catch (error) {
      throw new HttpException('Unable to fetch getAnalytics', 401);

    }
  }

  async allExpiredUrl() {
    try {
      const currentDate = new Date();
      return await this.urlRepository.createQueryBuilder('url')
      .where('url.expirationTime IS NOT NULL')
      .andWhere('url.expirationTime < :currentDate', { currentDate })
      .andWhere('url.isDeleted = :isDeleted', { isDeleted: false })
      .getMany();

    } catch (error) {
      throw new HttpException('Unable to fetch exipred Url', 401);

    }
  }
}

import { Body, Controller, Get, Param, Post, Req, Res } from '@nestjs/common';
import { UrlService } from './url.service';
import { Url } from 'src/models/url.entity';
import { Request, Response } from 'express';
import { UserService } from 'src/user/user.service';

@Controller()
export class UrlController {
  constructor(private readonly urlService: UrlService, private readonly userService: UserService) {}


  @Post('/encode')
  async shortUrl(@Body() data: { url: string, expirationTime: string }, @Req() req: Request,@Res() res: Response) {
    const { url, expirationTime } = data;
    const loggedInUser = await this.userService.fetchUserFromToken(req);
    const userAgent = req.headers['user-agent'] || 'unknown'; // Get the User-Agent header
    return await this.urlService.encodeUrl(loggedInUser,url,expirationTime,userAgent);
  }

  @Get(':url')
  async longUrl(@Param('url') url: string, @Req() req: Request,@Res() res: Response) {
    try {
      const loggedInUser = await this.userService.fetchUserFromToken(req);
      const userAgent = req.headers['user-agent'] || 'unknown'; 

      const longUrl:string = await this.urlService.fetchUrl(url,userAgent, loggedInUser);

      if(longUrl) {
        res.redirect(longUrl)
      } else {
        res.status(404).send('URL not found');
      }
    } catch (error) {
        console.error('Error occurred:', error);
        res.status(500).send('Internal server error, Maybe invalid shortUrl or expired');
    }
  }

  @Post('/analytics')
  async detail(@Req() req: Request) {
    const loggedInUser = await this.userService.fetchUserFromToken(req);
    return await this.urlService.getAnalytics(loggedInUser)
  }
  
}

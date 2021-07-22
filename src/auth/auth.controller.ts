import {
  ClassSerializerInterceptor,
  Controller,
  Get,
  HttpCode,
  Post,
  Req,
  Res,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { LocalAuthGuard } from './local.guard';
import { AuthenticatedGuard } from './authenticated.guard';

@Controller('/auth')
export class AuthController {
  @Get('/profile')
  @UseGuards(AuthenticatedGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  async profile(@Req() req) {
    return req.user;
  }

  @Post('/login')
  @HttpCode(200)
  @UseGuards(LocalAuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  async login(@Req() req: Request) {
    return req.user;
  }

  @Post('/logout')
  @HttpCode(200)
  @UseGuards(AuthenticatedGuard)
  async logout(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
    req.logout();
    await new Promise((resolve, reject) => {
      return req.session.destroy((err) => {
        if (err) {
          return reject(err);
        }
        return resolve(undefined);
      });
    });
    res.clearCookie('connect.sid');
  }
}

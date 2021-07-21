import { Controller, Post, Request, UseGuards } from '@nestjs/common';
import { LocalAuthGuard } from './local.guard';

@Controller('/auth')
export class AuthController {
  @Post('/login')
  @UseGuards(LocalAuthGuard)
  async login(@Request() req) {
    return req.user;
  }
}

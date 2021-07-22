import {
  ClassSerializerInterceptor,
  Controller,
  Get,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { UserService } from './user.service';
import { AuthenticatedGuard } from '../auth/authenticated.guard';

@Controller('/users')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  @UseGuards(AuthenticatedGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  async getUsers() {
    return this.userService.findAll();
  }
}

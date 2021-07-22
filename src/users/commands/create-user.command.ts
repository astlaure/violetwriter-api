import { Injectable, Logger } from '@nestjs/common';
import prompts from 'prompts';
import { UserService } from '../user.service';

@Injectable()
export class CreateUserCommand {
  constructor(private userService: UserService) {}

  async execute() {
    const answers = await prompts([
      { type: 'text', name: 'name', message: 'Name' },
      { type: 'text', name: 'username', message: 'Username (Email)' },
      { type: 'password', name: 'password', message: 'Password' },
      { type: 'password', name: 'confirmation', message: 'Confirmation' },
    ]);
    await this.userService.create(answers);
    Logger.log('User created successfully.');
  }
}

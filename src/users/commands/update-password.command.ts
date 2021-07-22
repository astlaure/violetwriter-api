import { Injectable, Logger } from '@nestjs/common';
import prompts from 'prompts';
import { UserService } from '../user.service';
import { UpdateUserDTO } from '../dtos/update-user.dto';

@Injectable()
export class UpdatePasswordCommand {
  constructor(private userService: UserService) {}

  async execute() {
    const answers = await prompts([
      { type: 'text', name: 'username', message: 'Username (Email)' },
      { type: 'password', name: 'password', message: 'Password' },
      { type: 'password', name: 'confirmation', message: 'Confirmation' },
    ]);
    const user = await this.userService.findByUsername(answers.username);

    if (!user) {
      Logger.error('no user found.');
    }

    const updateUser = new UpdateUserDTO();
    updateUser.password = answers.password;
    await this.userService.update(+user.id, updateUser);
    Logger.log('User updated.');
  }
}

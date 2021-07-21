import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import prompts from 'prompts';
import { AppModule } from './app.module';
import { UserService } from './users/user.service';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);

  const args = process.argv.slice(2);

  switch (args[0]) {
    case 'user:create':
      const userService = app.get(UserService);
      const answers = await prompts([
        { type: 'text', name: 'name', message: 'Name' },
        { type: 'text', name: 'username', message: 'Username (Email)' },
        { type: 'password', name: 'password', message: 'Password' },
        { type: 'password', name: 'confirmation', message: 'Confirmation' },
      ]);
      await userService.create(answers);
      Logger.log('User created successfully.');
      break;
    default:
      Logger.error('wrong command.');
  }

  await app.close();
}
bootstrap();

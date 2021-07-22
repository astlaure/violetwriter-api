import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { CreateUserCommand } from './users/commands/create-user.command';
import { UpdatePasswordCommand } from './users/commands/update-password.command';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const args = process.argv.slice(2);

  switch (args[0]) {
    case 'user:create':
      await app.get(CreateUserCommand).execute();
      break;
    case 'user:update':
      await app.get(UpdatePasswordCommand).execute();
      break;
    default:
      Logger.error('wrong command.');
  }

  await app.close();
}
bootstrap();

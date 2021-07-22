import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { CreateUserCommand } from './commands/create-user.command';
import { UpdatePasswordCommand } from './commands/update-password.command';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [UserService, CreateUserCommand, UpdatePasswordCommand],
  controllers: [UserController],
  exports: [UserService, CreateUserCommand, UpdatePasswordCommand],
})
export class UserModule {}

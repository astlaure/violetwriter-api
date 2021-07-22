import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import { CreateUserDTO } from './dtos/create-user.dto';
import { User } from './user.entity';
import { UpdateUserDTO } from './dtos/update-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async findByID(id: number): Promise<User> {
    return this.userRepository.findOne({ where: { id } });
  }

  async findByUsername(username: string): Promise<User> {
    return this.userRepository.findOne({ where: { username } });
  }

  async create(createUser: CreateUserDTO) {
    const user = this.userRepository.create({
      ...createUser,
      password: await bcrypt.hash(createUser.password, 10),
    });
    await this.userRepository.save(user);
  }

  async update(id: number, updateUser: UpdateUserDTO) {
    if (updateUser.password) {
      updateUser.password = await bcrypt.hash(updateUser.password, 10);
    }
    await this.userRepository.update(id, updateUser);
  }
}

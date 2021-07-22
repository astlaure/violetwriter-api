import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTaskDTO } from './dtos/create-task.dto';
import { Task } from './task.entity';
import { User } from '../users/user.entity';
import { UpdateTaskDTO } from './dtos/update-task.dto';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task) private taskRepository: Repository<Task>,
  ) {}

  async findAll(user: User): Promise<Task[]> {
    return this.taskRepository.find({ where: { user } });
  }

  async create(user: User, createTask: CreateTaskDTO) {
    const task = this.taskRepository.create({ ...createTask, user });
    await this.taskRepository.save(task);
  }

  async update(user: User, id: number, updateTask: UpdateTaskDTO) {
    await this.taskRepository.update(id, updateTask);
  }

  async delete(user: User, id: number) {
    await this.taskRepository.update(id, { done: true });
  }
}

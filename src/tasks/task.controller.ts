import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateTaskDTO } from './dtos/create-task.dto';
import { Task } from './task.entity';
import { TaskService } from './task.service';

@Controller('/tasks')
export class TaskController {
  constructor(private taskService: TaskService) {}

  @Get()
  async getTasks(): Promise<Task[]> {
    return this.taskService.findAll();
  }

  @Post()
  async postTask(@Body() createTask: CreateTaskDTO) {
    await this.taskService.create(createTask);
  }
}

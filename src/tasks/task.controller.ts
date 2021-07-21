import { Controller, Get } from '@nestjs/common';
import { Task } from './task.entity';
import { TaskService } from './task.service';

@Controller('/tasks')
export class TaskController {
  constructor(private taskService: TaskService) {}

  @Get()
  async getTasks(): Promise<Task[]> {
    return this.taskService.findAll();
  }
}

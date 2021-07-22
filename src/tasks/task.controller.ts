import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { CreateTaskDTO } from './dtos/create-task.dto';
import { Task } from './task.entity';
import { TaskService } from './task.service';
import { Request } from 'express';
import { User } from '../users/user.entity';
import { AuthenticatedGuard } from '../auth/authenticated.guard';

@Controller('/tasks')
export class TaskController {
  constructor(private taskService: TaskService) {}

  @Get()
  @UseGuards(AuthenticatedGuard)
  async getTasks(@Req() req: Request): Promise<Task[]> {
    return this.taskService.findAll(req.user as User);
  }

  @Post()
  @UseGuards(AuthenticatedGuard)
  async postTask(@Req() req: Request, @Body() createTask: CreateTaskDTO) {
    await this.taskService.create(req.user as User, createTask);
  }
}

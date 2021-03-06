import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { CreateTaskDTO } from './dtos/create-task.dto';
import { Task } from './task.entity';
import { TaskService } from './task.service';
import { Request } from 'express';
import { User } from '../users/user.entity';
import { AuthenticatedGuard } from '../auth/authenticated.guard';
import { UpdateTaskDTO } from './dtos/update-task.dto';

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

  @Patch('/:id')
  @UseGuards(AuthenticatedGuard)
  async patchTask(
    @Req() req: Request,
    @Param('id', ParseIntPipe) id: number,
    @Body() updateTask: UpdateTaskDTO,
  ) {
    await this.taskService.update(req.user as User, id, updateTask);
  }

  @Delete('/:id')
  @UseGuards(AuthenticatedGuard)
  async deleteTask(@Req() req: Request, @Param('id', ParseIntPipe) id: number) {
    await this.taskService.delete(req.user as User, id);
  }
}

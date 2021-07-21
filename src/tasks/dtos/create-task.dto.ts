import { IsNotEmpty } from 'class-validator';
import { TaskPriority } from '../enums/task-priority.enum';

export class CreateTaskDTO {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  priority: TaskPriority;

  description: string;
}

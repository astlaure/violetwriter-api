import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { TaskPriority } from './enums/task-priority.enum';

@Entity('tasks')
export class Task {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  title: string;

  @Column({ type: 'enum', enum: TaskPriority, default: TaskPriority.MEDIUM })
  priority: TaskPriority;

  @Column({ type: 'text' })
  description: string;

  @Column({ default: 0 })
  timer: number;

  @Column({ default: false })
  done: boolean;
}

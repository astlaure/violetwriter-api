import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { TaskPriority } from './enums/task-priority.enum';
import { User } from '../users/user.entity';
import { Exclude } from 'class-transformer';

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

  @Exclude()
  @ManyToOne(() => User, (user) => user.tasks)
  user: User;
}

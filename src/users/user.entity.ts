import { Exclude } from 'class-transformer';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Task } from '../tasks/task.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ length: 120, nullable: false })
  name: string;

  @Column({ length: 120, nullable: false, unique: true })
  username: string;

  @Exclude()
  @Column({ length: 120, nullable: false })
  password: string;

  @OneToMany(() => Task, (task) => task.user)
  tasks: Task[];
}

import { Exclude } from 'class-transformer';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
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
}

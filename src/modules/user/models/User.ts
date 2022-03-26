import { Exclude } from 'class-transformer';
import Course from '@modules/course/models/Course';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('User')
class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ select: false })
  email: string;

  @Column()
  @Exclude()
  password: string;

  @OneToMany(() => Course, course => course.user)
  courses: Course[];

  @UpdateDateColumn()
  updated_at: Date;

  @CreateDateColumn()
  created_at: Date;
}

export default User;

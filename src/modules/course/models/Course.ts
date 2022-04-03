import { Exclude } from 'class-transformer';

import Category from '@modules/category/models/Category';
import User from '@modules/user/models/User';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import Lesson from '@modules/lesson/models/Lesson';

@Entity('Course')
class Course {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  image_url: string;

  @Column({ select: false })
  @Exclude()
  category_id: string;

  @ManyToOne(() => Category, { eager: true })
  @JoinColumn({ name: 'category_id', referencedColumnName: 'id' })
  categories: Category;

  @OneToMany(() => Lesson, lesson => lesson.course, { eager: true })
  lessons: Lesson[];

  @Column({ select: false })
  @Exclude()
  user_id: string;

  @ManyToOne(() => User, { eager: true })
  @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
  user: User;

  @UpdateDateColumn()
  updated_at: Date;

  @CreateDateColumn()
  created_at: Date;
}

export default Course;

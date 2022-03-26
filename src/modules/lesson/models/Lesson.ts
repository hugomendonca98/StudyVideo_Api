import { Exclude } from 'class-transformer';
import Course from '@modules/course/models/Course';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('Lesson')
class Lesson {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  video_url: string;

  @Column({ select: false })
  @Exclude()
  course_id: string;

  @ManyToOne(() => Course, { eager: true })
  @JoinColumn({ name: 'course_id', referencedColumnName: 'id' })
  course: Course;
}

export default Lesson;

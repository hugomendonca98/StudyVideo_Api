import Course from '@modules/course/models/Course';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('Lesson')
class Lesson {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  video_url: string;

  @Column()
  course_id: string;

  @ManyToOne(() => Course, { eager: true })
  @JoinColumn({ name: 'course_id', referencedColumnName: 'id' })
  course: Course;

  @UpdateDateColumn()
  updated_at: Date;

  @CreateDateColumn()
  created_at: Date;
}

export default Lesson;

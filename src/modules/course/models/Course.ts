import User from '@modules/user/models/User';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('Course')
class Course {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  image_url: string;

  @OneToMany(() => User, user => user.courses)
  user: User;
}

export default Course;

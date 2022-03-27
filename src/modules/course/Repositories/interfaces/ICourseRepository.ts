import ICreateCourseDTO from '@modules/course/dtos/ICreateCourseDTO';
import Course from '@modules/course/models/Course';

export default interface ICourseRepository {
  create(data: ICreateCourseDTO): Promise<Course>;
  delete(course: Course): Promise<void>;
  save(course: Course): Promise<Course>;
  findByName(name: string): Promise<Course | undefined>;
  findById(id: string): Promise<Course | undefined>;
  findAll(): Promise<Course[]>;
}

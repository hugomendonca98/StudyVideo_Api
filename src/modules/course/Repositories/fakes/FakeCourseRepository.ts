import { v4 as uuid } from 'uuid';

import Course from '@modules/course/models/Course';
import ICreateCourseRepositoryDTO from '@modules/course/dtos/ICreateCourseRepositoryDTO';
import ICourseRepository from '../interfaces/ICourseRepository';

export default class FakeCourseRepository implements ICourseRepository {
  private courses: Course[] = [];

  public async create(data: ICreateCourseRepositoryDTO): Promise<Course> {
    const course = new Course();

    Object.assign(course, { id: uuid() }, data);

    this.courses.push(course);

    return course;
  }

  public async delete(course: Course): Promise<void> {
    const findCourse = this.courses.findIndex(
      courseFinded => courseFinded.id === course.id,
    );

    this.courses.splice(findCourse, 1);
  }

  public async save(course: Course): Promise<Course> {
    const findCourse = this.courses.findIndex(
      courseFinded => courseFinded.id === course.id,
    );

    this.courses[findCourse] = course;

    return course;
  }

  public async findByName(name: string): Promise<Course | undefined> {
    const course = this.courses.find(findCourse => findCourse.name === name);

    return course;
  }

  public async findById(id: string): Promise<Course | undefined> {
    const course = this.courses.find(findCourse => findCourse.id === id);

    return course;
  }

  public async findAll(): Promise<Course[]> {
    return this.courses;
  }
}

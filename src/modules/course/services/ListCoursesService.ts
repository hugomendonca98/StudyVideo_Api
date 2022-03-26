import Course from '../models/Course';
import ICourseRepository from '../Repositories/interfaces/ICourseRepository';

export default class ListCoursesService {
  constructor(private courseRepository: ICourseRepository) {}

  public async execute(): Promise<Course[]> {
    const courses = await this.courseRepository.findAll();

    return courses;
  }
}

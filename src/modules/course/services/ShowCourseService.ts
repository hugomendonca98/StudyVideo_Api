import AppError from '@errors/appError';
import Course from '../models/Course';
import ICourseRepository from '../Repositories/interfaces/ICourseRepository';

export default class ShowCourseService {
  constructor(private courseRepository: ICourseRepository) {}

  public async execute(id: string): Promise<Course> {
    const course = await this.courseRepository.findById(id);

    if (!course) {
      throw new AppError('Course not exist.');
    }

    return course;
  }
}

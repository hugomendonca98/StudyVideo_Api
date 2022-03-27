import AppError from '@errors/appError';
import ICourseRepository from '../Repositories/interfaces/ICourseRepository';

export default class DeleteCourseService {
  constructor(private courseRepository: ICourseRepository) {}

  public async execute(id: string): Promise<void> {
    const course = await this.courseRepository.findById(id);

    if (!course) {
      throw new AppError('Course is not found.');
    }

    await this.courseRepository.delete(course);
  }
}

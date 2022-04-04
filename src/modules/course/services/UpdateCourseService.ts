import AppError from '@errors/appError';
import ICategoryRepository from '@modules/category/repositories/interfaces/ICategoryRepository';
import IUserRepository from '@modules/user/repositories/interfaces/IUserRepository';
import IUpdateCourseDTO from '../dtos/IUpdateCourseDTO';
import Course from '../models/Course';
import ICourseRepository from '../Repositories/interfaces/ICourseRepository';

export default class UpdateCourseService {
  constructor(
    private courseRepository: ICourseRepository,
    private userRepository: IUserRepository,
    private categoryRepository: ICategoryRepository,
  ) {}

  public async execute({
    name,
    image_url,
    user_id,
    category_title,
    course_id,
  }: IUpdateCourseDTO): Promise<Course> {
    const existCourse = await this.courseRepository.findById(course_id);

    if (!existCourse) {
      throw new AppError('Course is not found.');
    }

    const existUser = await this.userRepository.findById(user_id);

    if (!existUser) {
      throw new AppError('User is not found.');
    }

    const existCategory = await this.categoryRepository.findByTitle(
      category_title,
    );

    if (!existCategory) {
      throw new AppError('Category is not found.');
    }

    existCourse.name = name;
    existCourse.image_url = image_url;
    existCourse.category_id = existCategory.id;
    existCourse.categories.id = existCategory.id;
    existCourse.categories.title = existCategory.title;
    existCourse.user_id = user_id;

    const course = await this.courseRepository.save(existCourse);

    return course;
  }
}

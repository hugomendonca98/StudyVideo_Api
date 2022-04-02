import AppError from '@errors/appError';
import ICategoryRepository from '@modules/category/repositories/interfaces/ICategoryRepository';
import IUserRepository from '@modules/user/repositories/interfaces/IUserRepository';
import ICreateCourseDTO from '../dtos/ICreateCourseDTO';
import Course from '../models/Course';
import ICourseRepository from '../Repositories/interfaces/ICourseRepository';

export default class CreateCourseService {
  constructor(
    private courseRepository: ICourseRepository,
    private userRepository: IUserRepository,
    private categoryRepostitory: ICategoryRepository,
  ) {}

  public async execute({
    name,
    image_url,
    user_id,
    category_title,
  }: ICreateCourseDTO): Promise<Course> {
    const existUser = await this.userRepository.findById(user_id);

    if (!existUser) {
      throw new AppError('User is not found.');
    }

    const existCategory = await this.categoryRepostitory.findByTitle(
      category_title,
    );

    if (!existCategory) {
      throw new AppError('Category is not found.');
    }

    const course = await this.courseRepository.create({
      name,
      image_url,
      user_id,
      category_id: existCategory.id,
    });

    return course;
  }
}

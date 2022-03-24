import AppError from '@errors/appError';
import Category from '../models/Category';
import ICategoryRepository from '../repositories/interfaces/ICategoryRepository';

export default class CreateCategoryService {
  constructor(private categoryRepository: ICategoryRepository) {}

  public async execute(title: string): Promise<Category> {
    const categoryExist = await this.categoryRepository.findByTitle(title);

    if (categoryExist) {
      throw new AppError('Category already exist.');
    }

    const category = await this.categoryRepository.create(title);

    return category;
  }
}

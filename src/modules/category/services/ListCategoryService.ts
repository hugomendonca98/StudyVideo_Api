import Category from '../models/Category';
import ICategoryRepository from '../repositories/interfaces/ICategoryRepository';

export default class ListCategoryService {
  constructor(private categoryRepository: ICategoryRepository) {}

  public async execute(): Promise<Category[]> {
    const catetories = await this.categoryRepository.findAll();

    return catetories;
  }
}

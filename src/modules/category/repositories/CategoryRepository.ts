import { getRepository, Repository } from 'typeorm';
import Category from '../models/Category';
import ICategoryRepository from './interfaces/ICategoryRepository';

export default class CategoryRepository implements ICategoryRepository {
  private ormRepository: Repository<Category>;

  constructor() {
    this.ormRepository = getRepository(Category);
  }

  public async create(title: string): Promise<Category> {
    const category = this.ormRepository.create({ title });

    await this.ormRepository.save(category);

    return category;
  }

  public async findByTitle(title: string): Promise<Category | undefined> {
    const category = await this.ormRepository.findOne({
      where: { title },
    });

    return category;
  }
}

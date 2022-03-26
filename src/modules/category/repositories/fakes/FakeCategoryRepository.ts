import { v4 as uuid } from 'uuid';

import Category from '@modules/category/models/Category';
import ICategoryRepository from '../interfaces/ICategoryRepository';

export default class FakeCategoryRepository implements ICategoryRepository {
  private categories: Category[] = [];

  public async create(title: string): Promise<Category> {
    const category = new Category();

    Object.assign(category, { id: uuid(), title });

    this.categories.push(category);

    return category;
  }

  public async findByTitle(title: string): Promise<Category | undefined> {
    const findIndex = this.categories.find(
      findCategory => findCategory.title === title,
    );

    return findIndex;
  }

  public async findById(id: string): Promise<Category | undefined> {
    const findIndex = this.categories.find(
      findCategory => findCategory.id === id,
    );

    return findIndex;
  }

  public async findAll(): Promise<Category[]> {
    return this.categories;
  }
}

import Category from '@modules/category/models/Category';

export default interface ICategoryRepository {
  create(title: string): Promise<Category>;
  findByTitle(title: string): Promise<Category | undefined>;
  findById(id: string): Promise<Category | undefined>;
  findAll(): Promise<Category[]>;
}

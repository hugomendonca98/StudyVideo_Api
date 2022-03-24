import AppError from '@errors/appError';
import FakeCategoryRepository from '../repositories/fakes/FakeCategoryRepository';
import ICategoryRepository from '../repositories/interfaces/ICategoryRepository';
import CreateCategoryService from './CreateCategoryService';

let categoryRepository: ICategoryRepository;
let createCategoryService: CreateCategoryService;

describe('CreateCategoryService', () => {
  beforeEach(() => {
    categoryRepository = new FakeCategoryRepository();
    createCategoryService = new CreateCategoryService(categoryRepository);
  });

  it('Should be able to create category.', async () => {
    const category = await createCategoryService.execute('Category Title');
    expect(category).toHaveProperty('id');
    expect(category.title).toEqual('Category Title');
    expect(category).toEqual(category);
  });

  it('Should not be able to create category with same title.', async () => {
    await categoryRepository.create('Category Title');

    await expect(
      createCategoryService.execute('Category Title'),
    ).rejects.toBeInstanceOf(AppError);
  });
});

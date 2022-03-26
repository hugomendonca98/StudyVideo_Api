import FakeCategoryRepository from '../repositories/fakes/FakeCategoryRepository';
import ICategoryRepository from '../repositories/interfaces/ICategoryRepository';
import ListCategoryService from './ListCategoryService';

let fakeCategoryRepository: ICategoryRepository;
let listCategoryService: ListCategoryService;

describe('ListCategoryService', () => {
  beforeEach(() => {
    fakeCategoryRepository = new FakeCategoryRepository();
    listCategoryService = new ListCategoryService(fakeCategoryRepository);
  });

  it('Should be able to list all categories', async () => {
    const category = await fakeCategoryRepository.create('Category Title');

    const category2 = await fakeCategoryRepository.create('Category Title');

    const categories = await listCategoryService.execute();

    expect(categories[0]).toEqual(category);
    expect(categories).toEqual([category, category2]);
  });
});

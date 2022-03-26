import { Request, Response } from 'express';
import CategoryRepository from '../repositories/CategoryRepository';
import CreateCategoryService from '../services/CreateCategoryService';
import ListCategoryService from '../services/ListCategoryService';

export default class CategoryController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { title } = request.body;

    const categoryRepostitory = new CategoryRepository();

    const createCategoryService = new CreateCategoryService(
      categoryRepostitory,
    );

    const category = await createCategoryService.execute(title);

    return response.json(category);
  }

  public async index(request: Request, response: Response): Promise<Response> {
    const categoryRepostitory = new CategoryRepository();

    const listCategoryService = new ListCategoryService(categoryRepostitory);

    const categories = await listCategoryService.execute();

    return response.json(categories);
  }
}

import { Request, Response } from 'express';
import { instanceToInstance } from 'class-transformer';

import CategoryRepository from '@modules/category/repositories/CategoryRepository';
import UserRepository from '@modules/user/repositories/UserRepository';
import CourseRepository from '../Repositories/CourseRepository';
import CreateCourseService from '../services/CreateCourseService';
import ListCoursesService from '../services/ListCoursesService';

export default class CourseController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { name, image_url, category_id, user_id } = request.body;

    const courseRepository = new CourseRepository();
    const categoryRepostitory = new CategoryRepository();
    const userRepository = new UserRepository();
    const createCourseService = new CreateCourseService(
      courseRepository,
      userRepository,
      categoryRepostitory,
    );

    const course = await createCourseService.execute({
      name,
      image_url,
      category_id,
      user_id,
    });

    return response.json(instanceToInstance(course));
  }

  public async index(request: Request, response: Response): Promise<Response> {
    const courseRepository = new CourseRepository();
    const listCourseService = new ListCoursesService(courseRepository);

    const courses = await listCourseService.execute();

    return response.json(instanceToInstance(courses));
  }
}

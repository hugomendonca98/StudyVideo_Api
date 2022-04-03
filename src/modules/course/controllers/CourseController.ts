import { Request, Response } from 'express';
import { instanceToInstance } from 'class-transformer';

import CategoryRepository from '@modules/category/repositories/CategoryRepository';
import UserRepository from '@modules/user/repositories/UserRepository';
import CourseRepository from '../Repositories/CourseRepository';
import CreateCourseService from '../services/CreateCourseService';
import ListCoursesService from '../services/ListCoursesService';
import DeleteCourseService from '../services/DeleteCourseService';
import UpdateCourseService from '../services/UpdateCourseService';

export default class CourseController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { name, image_url, category_title } = request.body;
    const user_id = request.user.id;

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
      category_title,
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

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const courseRepository = new CourseRepository();
    const deleteCourseService = new DeleteCourseService(courseRepository);

    await deleteCourseService.execute(id);

    return response.json({ message: 'course deleted successfully.' });
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;
    const { id } = request.params;
    const { name, image_url, category_title } = request.body;

    const courseRepository = new CourseRepository();
    const userRepository = new UserRepository();
    const categoryRepostitory = new CategoryRepository();
    const updateCourseService = new UpdateCourseService(
      courseRepository,
      userRepository,
      categoryRepostitory,
    );

    const course = await updateCourseService.execute({
      name,
      image_url,
      category_title,
      user_id,
      course_id: id,
    });

    return response.json(instanceToInstance(course));
  }
}

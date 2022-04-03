import { Request, Response } from 'express';
import { instanceToInstance } from 'class-transformer';

import CourseRepository from '../Repositories/CourseRepository';

import ShowCourseService from '../services/ShowCourseService';

export default class SingleCourseController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const courseRepository = new CourseRepository();
    const showCourseService = new ShowCourseService(courseRepository);

    const course = await showCourseService.execute(id);

    return response.json(instanceToInstance(course));
  }
}

import { Request, Response } from 'express';

import CourseRepository from '@modules/course/Repositories/CourseRepository';
import LessonRepository from '../repositories/LessonRepository';
import CreateLessonService from '../services/CreateLessonService';
import ListLessonService from '../services/ListLessonService';
import DeleteLessonService from '../services/DeleteLessonService';

export default class LessonController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { title, video_url, course_id } = request.body;

    const lessonRepository = new LessonRepository();
    const courseRepostitory = new CourseRepository();

    const createLessonService = new CreateLessonService(
      lessonRepository,
      courseRepostitory,
    );

    const lesson = await createLessonService.execute({
      title,
      video_url,
      course_id,
    });

    return response.json(lesson);
  }

  public async index(request: Request, response: Response): Promise<Response> {
    const lessonRepository = new LessonRepository();

    const listLessonService = new ListLessonService(lessonRepository);

    const lesson = await listLessonService.execute();

    return response.json(lesson);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const lessonRepository = new LessonRepository();

    const deleteLessonService = new DeleteLessonService(lessonRepository);

    await deleteLessonService.execute(id);

    return response.json({ message: 'Lesson deleted successfully.' });
  }
}

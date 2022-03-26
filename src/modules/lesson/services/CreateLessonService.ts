import AppError from '@errors/appError';
import ICourseRepository from '@modules/course/Repositories/interfaces/ICourseRepository';
import ICreateLessonDTO from '../dtos/ICreateLessonDTO';
import Lesson from '../models/Lesson';
import ILessonRespository from '../repositories/interfaces/ILessonRepsotiory';

export default class CreateLessonService {
  constructor(
    private lessonRepository: ILessonRespository,
    private courseRepository: ICourseRepository,
  ) {}

  public async execute({
    title,
    video_url,
    course_id,
  }: ICreateLessonDTO): Promise<Lesson> {
    const existCourse = await this.courseRepository.findById(course_id);

    if (!existCourse) {
      throw new AppError('Course not found.');
    }

    const lesson = await this.lessonRepository.create({
      title,
      video_url,
      course_id,
    });

    return lesson;
  }
}

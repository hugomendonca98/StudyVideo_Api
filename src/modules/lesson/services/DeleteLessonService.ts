import AppError from '@errors/appError';
import ILessonRespository from '../repositories/interfaces/ILessonRepsotiory';

export default class DeleteLessonService {
  constructor(private lessonRepository: ILessonRespository) {}

  public async execute(id: string): Promise<void> {
    const lesson = await this.lessonRepository.findById(id);

    if (!lesson) {
      throw new AppError('Lesson is not found.');
    }

    await this.lessonRepository.delete(lesson);
  }
}

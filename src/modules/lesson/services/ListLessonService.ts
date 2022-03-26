import Lesson from '../models/Lesson';
import ILessonRespository from '../repositories/interfaces/ILessonRepsotiory';

export default class ListLessonService {
  constructor(private lessonRepository: ILessonRespository) {}

  public async execute(): Promise<Lesson[]> {
    const lessons = await this.lessonRepository.findAll();

    return lessons;
  }
}

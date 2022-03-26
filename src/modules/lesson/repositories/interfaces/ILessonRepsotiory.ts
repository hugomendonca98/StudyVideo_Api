import ICreateLessonDTO from '@modules/lesson/dtos/ICreateLessonDTO';
import Lesson from '@modules/lesson/models/Lesson';

export default interface ILessonRespository {
  create(data: ICreateLessonDTO): Promise<Lesson>;
  delete(lesson: Lesson): Promise<void>;
  findById(id: string): Promise<Lesson | undefined>;
  findByTitle(title: string): Promise<Lesson | undefined>;
  findAll(): Promise<Lesson[]>;
}

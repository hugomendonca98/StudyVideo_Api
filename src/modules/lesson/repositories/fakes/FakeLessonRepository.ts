import { v4 as uuid } from 'uuid';

import ICreateLessonDTO from '@modules/lesson/dtos/ICreateLessonDTO';
import Lesson from '@modules/lesson/models/Lesson';
import ILessonRespository from '../interfaces/ILessonRepsotiory';

export default class FakeLessonRepository implements ILessonRespository {
  private lessons: Lesson[] = [];

  public async create(data: ICreateLessonDTO): Promise<Lesson> {
    const lesson = new Lesson();

    Object.assign(lesson, { id: uuid() }, data);

    this.lessons.push(lesson);

    return lesson;
  }

  public async findById(id: string): Promise<Lesson | undefined> {
    const lesson = this.lessons.find(findLesson => findLesson.id === id);

    return lesson;
  }

  public async findByTitle(title: string): Promise<Lesson | undefined> {
    const lesson = this.lessons.find(findLesson => findLesson.title === title);

    return lesson;
  }

  public async findAll(): Promise<Lesson[]> {
    return this.lessons;
  }
}

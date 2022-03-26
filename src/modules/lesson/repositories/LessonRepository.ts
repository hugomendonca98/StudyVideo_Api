import { getRepository, Repository } from 'typeorm';

import ICreateLessonDTO from '../dtos/ICreateLessonDTO';
import Lesson from '../models/Lesson';
import ILessonRespository from './interfaces/ILessonRepsotiory';

export default class LessonRepository implements ILessonRespository {
  private ormRepository: Repository<Lesson>;

  constructor() {
    this.ormRepository = getRepository(Lesson);
  }

  public async create(data: ICreateLessonDTO): Promise<Lesson> {
    const lesson = this.ormRepository.create(data);

    await this.ormRepository.save(lesson);

    return lesson;
  }

  public async findById(id: string): Promise<Lesson | undefined> {
    const lesson = await this.ormRepository.findOne({
      where: { id },
    });

    return lesson;
  }

  public async findByTitle(title: string): Promise<Lesson | undefined> {
    const lesson = await this.ormRepository.findOne({
      where: { title },
    });

    return lesson;
  }

  public async findAll(): Promise<Lesson[]> {
    const lessons = await this.ormRepository.find();

    return lessons;
  }
}

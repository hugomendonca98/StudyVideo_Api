import { getRepository, Repository } from 'typeorm';
import ICreateCourseDTO from '../dtos/ICreateCourseDTO';
import Course from '../models/Course';
import ICourseRepository from './interfaces/ICourseRepository';

export default class CourseRepository implements ICourseRepository {
  private ormRepository: Repository<Course>;

  constructor() {
    this.ormRepository = getRepository(Course);
  }

  public async create(data: ICreateCourseDTO): Promise<Course> {
    const course = this.ormRepository.create(data);

    await this.ormRepository.save(course);

    return course;
  }

  public async findByName(name: string): Promise<Course | undefined> {
    const course = await this.ormRepository.findOne({
      where: { name },
    });

    return course;
  }

  public async findById(id: string): Promise<Course | undefined> {
    const course = await this.ormRepository.findOne({
      where: { id },
    });

    return course;
  }

  public async findAll(): Promise<Course[]> {
    const courses = await this.ormRepository.find();

    return courses;
  }
}

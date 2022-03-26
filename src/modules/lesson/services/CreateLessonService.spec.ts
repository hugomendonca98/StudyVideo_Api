import AppError from '@errors/appError';
import FakeCourseRepository from '@modules/course/Repositories/fakes/FakeCourseRepository';
import ICourseRepository from '@modules/course/Repositories/interfaces/ICourseRepository';
import FakeLessonRepository from '../repositories/fakes/FakeLessonRepository';
import ILessonRespository from '../repositories/interfaces/ILessonRepsotiory';
import CreateLessonService from './CreateLessonService';

let fakeLessonRepository: ILessonRespository;
let fakeCouseRepository: ICourseRepository;
let createLessonService: CreateLessonService;

describe('CreateLessonService', () => {
  beforeEach(() => {
    fakeLessonRepository = new FakeLessonRepository();
    fakeCouseRepository = new FakeCourseRepository();
    createLessonService = new CreateLessonService(
      fakeLessonRepository,
      fakeCouseRepository,
    );
  });

  it('Should be able to create lesson.', async () => {
    const course = await fakeCouseRepository.create({
      name: 'course',
      image_url: 'http://www.example.com/image.png',
      category_id: 'category id',
      user_id: 'user id',
    });

    const lesson = await createLessonService.execute({
      title: 'lesson 1',
      video_url: 'http://www.example.com/video.mp4',
      course_id: course.id,
    });

    expect(lesson).toHaveProperty('id');
    expect(lesson.title).toEqual('lesson 1');
    expect(lesson.video_url).toEqual('http://www.example.com/video.mp4');
    expect(lesson.course_id).toEqual(course.id);
  });

  it('Should not be able to create lesson same non existing course.', async () => {
    await expect(
      createLessonService.execute({
        title: 'lesson 1',
        video_url: 'http://www.example.com/video.mp4',
        course_id: 'non existing course id',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});

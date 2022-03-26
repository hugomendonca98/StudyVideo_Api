import FakeLessonRepository from '../repositories/fakes/FakeLessonRepository';
import ILessonRespository from '../repositories/interfaces/ILessonRepsotiory';
import ListLessonService from './ListLessonService';

let fakeLessonRepository: ILessonRespository;
let listLessonService: ListLessonService;

describe('ListLessonService', () => {
  beforeEach(() => {
    fakeLessonRepository = new FakeLessonRepository();
    listLessonService = new ListLessonService(fakeLessonRepository);
  });

  it('Should be able to list all lessons.', async () => {
    const lesson = await fakeLessonRepository.create({
      title: 'lesson 1',
      video_url: 'http://www.example.com/video.mp4',
      course_id: 'non existing course id',
    });

    const lesson2 = await fakeLessonRepository.create({
      title: 'lesson 1',
      video_url: 'http://www.example.com/video.mp4',
      course_id: 'non existing course id',
    });

    const lessons = await listLessonService.execute();

    expect(lessons[0]).toEqual(lesson);
    expect(lessons).toEqual([lesson, lesson2]);
  });
});

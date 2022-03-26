import AppError from '@errors/appError';
import FakeLessonRepository from '../repositories/fakes/FakeLessonRepository';
import ILessonRespository from '../repositories/interfaces/ILessonRepsotiory';
import DeleteLessonService from './DeleteLessonService';

let fakeLessonRepository: ILessonRespository;
let deleteLessonService: DeleteLessonService;

describe('DeleteLessonService', () => {
  beforeEach(() => {
    fakeLessonRepository = new FakeLessonRepository();
    deleteLessonService = new DeleteLessonService(fakeLessonRepository);
  });

  it('Should be able to delete lesson.', async () => {
    const lesson = await fakeLessonRepository.create({
      title: 'lesson',
      video_url: 'video url',
      course_id: 'course id',
    });

    await deleteLessonService.execute(lesson.id);

    const findCityDeleted = await fakeLessonRepository.findById(lesson.id);

    expect(findCityDeleted).toEqual(undefined);
  });

  it('Should not be able to delete non existing lesson.', async () => {
    await expect(
      deleteLessonService.execute('lesson.id'),
    ).rejects.toBeInstanceOf(AppError);
  });
});

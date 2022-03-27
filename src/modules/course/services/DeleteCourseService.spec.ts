import AppError from '@errors/appError';
import FakeCourseRepository from '../Repositories/fakes/FakeCourseRepository';
import ICourseRepository from '../Repositories/interfaces/ICourseRepository';
import DeleteCourseService from './DeleteCourseService';

let fakeCourseRepository: ICourseRepository;
let deleteCourseService: DeleteCourseService;

describe('DeleteCourseService', () => {
  beforeEach(() => {
    fakeCourseRepository = new FakeCourseRepository();
    deleteCourseService = new DeleteCourseService(fakeCourseRepository);
  });

  it('Should be able to delete course.', async () => {
    const course = await fakeCourseRepository.create({
      name: 'course senai',
      image_url: 'course image',
      category_id: 'categoru id',
      user_id: 'user id',
    });

    const courseDeleted = await deleteCourseService.execute(course.id);

    expect(courseDeleted).toEqual(undefined);
  });

  it('Should not be able to delete non existing course.', async () => {
    await expect(
      deleteCourseService.execute('lesson.id'),
    ).rejects.toBeInstanceOf(AppError);
  });
});

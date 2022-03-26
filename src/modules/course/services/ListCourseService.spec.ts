import FakeCourseRepository from '../Repositories/fakes/FakeCourseRepository';
import ICourseRepository from '../Repositories/interfaces/ICourseRepository';
import ListCoursesService from './ListCoursesService';

let fakeCourseRepository: ICourseRepository;
let listcourseService: ListCoursesService;

describe('ListCourseService', () => {
  beforeEach(() => {
    fakeCourseRepository = new FakeCourseRepository();
    listcourseService = new ListCoursesService(fakeCourseRepository);
  });

  it('Should be able to list all courses', async () => {
    const course = await fakeCourseRepository.create({
      name: 'Course Name',
      image_url: 'www.example.com/image.png',
      user_id: 'user id',
      category_id: 'category id',
    });

    const course2 = await fakeCourseRepository.create({
      name: 'Course Name',
      image_url: 'www.example.com/image.png',
      user_id: 'user id',
      category_id: 'category id',
    });

    const allCourses = await listcourseService.execute();

    expect(allCourses[0]).toEqual(course);
    expect(allCourses).toEqual([course, course2]);
  });
});

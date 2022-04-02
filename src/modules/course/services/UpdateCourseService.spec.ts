import AppError from '@errors/appError';
import FakeCategoryRepository from '@modules/category/repositories/fakes/FakeCategoryRepository';
import ICategoryRepository from '@modules/category/repositories/interfaces/ICategoryRepository';
import FakeUserRepository from '@modules/user/repositories/fakes/FakeUserRepository';
import IUserRepository from '@modules/user/repositories/interfaces/IUserRepository';
import FakeCourseRepository from '../Repositories/fakes/FakeCourseRepository';
import ICourseRepository from '../Repositories/interfaces/ICourseRepository';
import UpdateCourseService from './UpdateCourseService';

let fakeCourseRepository: ICourseRepository;
let fakeUserRepostiroy: IUserRepository;
let fakeCategoryRepository: ICategoryRepository;
let updateCourseService: UpdateCourseService;

describe('UpdateCourseService', () => {
  beforeEach(() => {
    fakeCourseRepository = new FakeCourseRepository();
    fakeUserRepostiroy = new FakeUserRepository();
    fakeCategoryRepository = new FakeCategoryRepository();
    updateCourseService = new UpdateCourseService(
      fakeCourseRepository,
      fakeUserRepostiroy,
      fakeCategoryRepository,
    );
  });

  it('Should be able to update course.', async () => {
    const user = await fakeUserRepostiroy.create({
      name: 'User',
      email: 'example@gmail.com',
      password: '12345',
    });

    const course = await fakeCourseRepository.create({
      name: 'Course Name',
      image_url: 'Image Url',
      category_id: 'category id',
      user_id: 'non existing',
    });

    const category = await fakeCategoryRepository.create('Category');

    const courseUpdated = await updateCourseService.execute({
      name: 'Course Name updated',
      image_url: 'Image Url updated',
      category_title: category.title,
      user_id: user.id,
      course_id: course.id,
    });

    expect(courseUpdated.name).toEqual('Course Name updated');
    expect(courseUpdated.image_url).toEqual('Image Url updated');
    expect(courseUpdated.category_id).toEqual(category.id);
    expect(courseUpdated.user_id).toEqual(user.id);
    expect(courseUpdated.id).toEqual(course.id);
  });

  it('Should not be able to update course with inexisting course.', async () => {
    const user = await fakeUserRepostiroy.create({
      name: 'User',
      email: 'example@gmail.com',
      password: '12345',
    });

    const category = await fakeCategoryRepository.create('Category');

    await expect(
      updateCourseService.execute({
        name: 'Course Name updated',
        image_url: 'Image Url updated',
        category_title: category.title,
        user_id: user.id,
        course_id: 'course inexist',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('Should not be able to update course with inexisting user.', async () => {
    const course = await fakeCourseRepository.create({
      name: 'Course Name',
      image_url: 'Image Url',
      category_id: 'category id',
      user_id: 'non existing',
    });

    const category = await fakeCategoryRepository.create('Category');

    await expect(
      updateCourseService.execute({
        name: 'Course Name updated',
        image_url: 'Image Url updated',
        category_title: category.title,
        user_id: 'user inexist',
        course_id: course.id,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('Should not be able to update course with inexisting category.', async () => {
    const user = await fakeUserRepostiroy.create({
      name: 'User',
      email: 'example@gmail.com',
      password: '12345',
    });

    const course = await fakeCourseRepository.create({
      name: 'Course Name',
      image_url: 'Image Url',
      category_id: 'category id',
      user_id: 'non existing',
    });

    await expect(
      updateCourseService.execute({
        name: 'Course Name updated',
        image_url: 'Image Url updated',
        category_title: 'category inexist',
        user_id: user.id,
        course_id: course.id,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});

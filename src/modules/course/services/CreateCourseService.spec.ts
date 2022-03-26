import AppError from '@errors/appError';
import FakeCategoryRepository from '@modules/category/repositories/fakes/FakeCategoryRepository';
import ICategoryRepository from '@modules/category/repositories/interfaces/ICategoryRepository';
import FakeUserRepository from '@modules/user/repositories/fakes/FakeUserRepository';
import IUserRepository from '@modules/user/repositories/interfaces/IUserRepository';
import FakeCourseRepository from '../Repositories/fakes/FakeCourseRepository';
import ICourseRepository from '../Repositories/interfaces/ICourseRepository';
import CreateCourseService from './CreateCourseService';

let fakeCourseRepository: ICourseRepository;
let fakeUserRepository: IUserRepository;
let fakeCategoryRepository: ICategoryRepository;
let createCourseService: CreateCourseService;

describe('CreateCourseService', () => {
  beforeEach(() => {
    fakeCourseRepository = new FakeCourseRepository();
    fakeUserRepository = new FakeUserRepository();
    fakeCategoryRepository = new FakeCategoryRepository();
    createCourseService = new CreateCourseService(
      fakeCourseRepository,
      fakeUserRepository,
      fakeCategoryRepository,
    );
  });

  it('Shold be able to create course.', async () => {
    const user = await fakeUserRepository.create({
      name: 'Hugo Mendonça',
      email: 'example@gmail.com',
      password: '12345',
    });

    const category = await fakeCategoryRepository.create('Category Title');

    const course = await createCourseService.execute({
      name: 'Course Name',
      image_url: 'Image Url',
      category_id: category.id,
      user_id: user.id,
    });

    expect(course).toHaveProperty('id');
    expect(course.name).toEqual('Course Name');
    expect(course.image_url).toEqual('Image Url');
    expect(course.category_id).toEqual(category.id);
    expect(course.user_id).toEqual(user.id);
    expect(course).toEqual(course);
  });

  it('Should not be able to create with non existing user.', async () => {
    const category = await fakeCategoryRepository.create('Category Title');

    await expect(
      createCourseService.execute({
        name: 'Course Name',
        image_url: 'Image Url',
        category_id: category.id,
        user_id: 'non existing',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('Should not be able to create with non existing category', async () => {
    const user = await fakeUserRepository.create({
      name: 'Hugo Mendonça',
      email: 'example@gmail.com',
      password: '12345',
    });

    await expect(
      createCourseService.execute({
        name: 'Course Name',
        image_url: 'Image Url',
        category_id: 'non existing',
        user_id: user.id,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});

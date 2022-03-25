import User from '@modules/user/models/User';

export default interface ICreateCourseDTO {
  name: string;
  image_url: string;
  user: User;
}

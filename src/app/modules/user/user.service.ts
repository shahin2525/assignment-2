import { User } from '../user.model';
import { TUser } from './user.interface';

//todo isOrderExist
const createUserIntoDB = async (user: TUser) => {
  // const result = await User.create(user);
  const student = new User(user);
  if (await student.isOrderExist(user.userId)) {
    throw new Error('user already exists');
  }
  const result = await student.save();
  return result;
};

const getAllUsersFromDB = async () => {
  const result = await User.find();
  return result;
};

const getSingleUserFromDB = async (userId: number) => {
  const result = await User.findOne({ userId });
  return result;
};

export const UserServices = {
  createUserIntoDB,
  getAllUsersFromDB,
  getSingleUserFromDB,
};

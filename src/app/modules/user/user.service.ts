// import mongoose from 'mongoose';
import { UpdateWriteOpResult } from 'mongoose';
import { User } from '../user.model';
import { TOrder, TUser } from './user.interface';

const doesUserExist = async (userId: number): Promise<boolean> => {
  const user = await User.findOne({ userId });
  return !!user;
};
const createUserIntoDB = async (user: TUser) => {
  const userData = new User(user);

  const result = await userData.save();

  // eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
  const { password, ...userWithOutPassword } = result.toObject();
  return userWithOutPassword;
};

const getAllUsersFromDB = async () => {
  const result = await User.find().select({
    _id: 0,
    userId: 0,
    password: 0,
    'fullName._id': 0,
    isActive: 0,
    hobbies: 0,
    'address._id': 0,
    orders: 0,
    __v: 0,
  });

  return result;
};

const getSingleUserFromDB = async (userId: number) => {
  const result = await User.findOne({ userId }).select({
    _id: 0,

    password: 0,
    'fullName._id': 0,

    'address._id': 0,
    orders: 0,
    __v: 0,
  });

  return result;
};

const updateUserFromDB = async (userId: number, userData: Partial<TUser>) => {
  const userExists = await doesUserExist(userId);
  if (!userExists) {
    throw new Error('user not found');
  }

  const updateResult: UpdateWriteOpResult = await User.updateOne(
    { userId: userId },
    userData,
    {
      new: true,
      runValidators: true,
    },
  );

  if (updateResult.modifiedCount !== 1) {
    throw new Error('Failed to update user');
  }

  const updatedUser = await User.findOne({ userId }).select('-password');

  if (!updatedUser) {
    throw new Error('Failed to fetch updated user data');
  }
  return {
    userId: updatedUser.userId,
    username: updatedUser.username,
    fullName: updatedUser.fullName,
    age: updatedUser.age,
    email: updatedUser.email,
    isActive: updatedUser.isActive,
    hobbies: updatedUser.hobbies,
    address: updatedUser.address,
  };
};

const deleteUserFromDB = async (userId: number) => {
  const result = await User.deleteOne({ userId });
  return result;
};
const addOrderFromDB = async (userId: number, orderData: TOrder) => {
  try {
    const user = await User.findOne({ userId });
    // console.log(user);

    if (!user) {
      throw new Error('user not found');
    }
    if (user.orders) {
      user.orders.push(orderData);
    } else {
      user.orders = [orderData];
    }

    user.save();
    return user;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error(`Error adding order: ${error.message}`);
    throw error;
  }
};

const getAllOrdersById = async (userId: number) => {
  const user = await User.findOne({ userId }).select({
    'orders._id': 0,
  });
  // console.log('user or', user);
  const result = user?.orders;

  return result;
};
const calculateTotalPriceById = async (userId: number) => {
  const user = await User.findOne({ userId });
  const result = user?.orders;
  return result;
};

export const UserServices = {
  createUserIntoDB,
  getAllUsersFromDB,
  getSingleUserFromDB,
  deleteUserFromDB,
  updateUserFromDB,
  addOrderFromDB,
  getAllOrdersById,
  calculateTotalPriceById,
  doesUserExist,
};

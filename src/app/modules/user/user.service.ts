// import mongoose from 'mongoose';
import { User } from '../user.model';
import { TOrder, TUser } from './user.interface';

const doesUserExist = async (userId: number): Promise<boolean> => {
  const user = await User.findOne({ userId });
  return !!user;
};
const createUserIntoDB = async (user: TUser) => {
  // const result = await User.create(user);
  const userData = new User(user);

  if (await userData.isUserExist(user.userId)) {
    throw new Error('user already exists');
  }
  const result = await userData.save();
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

const updateUserFromDB = async (userId: number, userData: Partial<TUser>) => {
  const userExists = await doesUserExist(userId);
  if (!userExists) {
    throw new Error('user not found');
  }

  const result = await User.updateOne({ userId: userId }, userData, {
    new: true,
    runValidators: true,
  });

  return result;
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
  const user = await User.findOne({ userId });
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

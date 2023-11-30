// import mongoose from 'mongoose';
import { User } from '../user.model';
import { TOrder, TUser } from './user.interface';

//todo isOrderExist
const createUserIntoDB = async (user: TUser) => {
  // const result = await User.create(user);
  const userData = new User(user);
  if (await userData.isOrderExist(user.userId)) {
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

const updateUserFromDB = async (userId: number, userData: TUser) => {
  const result = await User.updateOne({ userId: userId }, userData, {
    new: true,
    runValidators: true,
  });

  return result;
};

const deleteUserFromDB = async (userId: number) => {
  const result = await User.updateOne({ userId }, { isDeleted: true });
  return result;
};
const addOrderFromDB = async (userId: number, orderData: TOrder) => {
  try {
    const user = await User.findOne({ userId });

    if (!user) {
      throw new Error('user not found');
    }
    if (user.orders) {
      user.orders.push(orderData);
    } else {
      // Create 'orders' array and add order data
      user.orders = [orderData];
    }
    await user.save();

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error(`Error adding order: ${error.message}`);
    throw error;
  }
};

export const UserServices = {
  createUserIntoDB,
  getAllUsersFromDB,
  getSingleUserFromDB,
  deleteUserFromDB,
  updateUserFromDB,
  addOrderFromDB,
};

/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express';
import { UserServices } from './user.service';
import userValidationSchema from './user.validation';

const createUser = async (req: Request, res: Response) => {
  try {
    const user = req.body;
    // joy validation
    const { error, value } = userValidationSchema.validate(user);

    if (error) {
      res.status(500).json({
        status: 'fail',
        message: 'something went wrong',
        error: error.details,
      });
    }
    const result = await UserServices.createUserIntoDB(value);
    res.status(200).json({
      status: 'success',
      message: 'user created successfully',
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      status: 'fail',
      message: 'something went wrong',
      error: error.message,
    });
  }
};

const getAllUsers = async (req: Request, res: Response) => {
  try {
    const result = await UserServices.getAllUsersFromDB();
    res.status(200).json({
      status: 'success',
      message: 'Users retrieve successfully',
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      status: 'fail',
      message: 'something went wrong',
      error: error.message,
    });
  }
};

const getSingleUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const id = parseInt(userId);
    const result = await UserServices.getSingleUserFromDB(id);
    res.status(200).json({
      status: 'success',
      message: 'User is retrieve successfully',
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      status: 'fail',
      message: 'something went wrong',
      error: error.message,
    });
  }
};
const deleteUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const id = parseInt(userId);
    const result = await UserServices.deleteUserFromDB(id);
    res.status(200).json({
      status: 'success',
      message: 'User deleted successfully',
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      status: 'fail',
      message: 'something went wrong',
      error: error.message,
    });
  }
};
const updateUser = async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId;
    const id = parseInt(userId);
    const user = req.body;
    const { error, value } = userValidationSchema.validate(user);

    if (error) {
      res.status(500).json({
        status: 'fail',
        message: 'something went wrong 1',
        error: error.details,
      });
    }

    const result = await UserServices.updateUserFromDB(id, value);
    console.log(result);
    // const result = await UserServices.updateUserFromDB(id,user);
    res.status(200).json({
      status: 'success',
      message: 'User updated successfully',
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      status: 'fail',
      message: 'something went wrong',
      error: error.message,
    });
  }
};

const addOrder = async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId;
    const id = parseInt(userId);
    const user = req.body;
    // const { error, value } = userValidationSchema.validate(user);
    // if (error) {
    //   res.status(500).json({
    //     status: 'fail',
    //     message: 'something went wrong',
    //     error: error.details,
    //   });
    // }
    const result = await UserServices.addOrderFromDB(id, user);
    console.log(result);
    res.status(200).json({
      status: 'success',
      message: 'order add  successfully',
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: 'false',

      message: 'User not found',
      error: error.message,
    });
  }
};

export const UserControllers = {
  createUser,
  getAllUsers,
  getSingleUser,
  updateUser,
  deleteUser,
  addOrder,
};

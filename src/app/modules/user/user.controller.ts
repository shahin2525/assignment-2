/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express';
import { UserServices } from './user.service';
import userValidationSchema from './user.validation';
import { userUpdateValidationSchema } from './user.updateValidation';
import { orderValidationSchema } from './user.orderAddValidation';

// import { orderValidationSchema } from './user.orderAddValidation';

const createUser = async (req: Request, res: Response) => {
  try {
    const user = req.body;
    // joy validation
    const { error, value } = userValidationSchema.validate(user);

    if (error) {
      res.status(404).json({
        success: false,
        message: 'user not found',
        error: error.details,
      });
    }
    const result = await UserServices.createUserIntoDB(value);
    res.status(200).json({
      success: true,
      message: 'User created successfully',
      data: result,
    });
  } catch (error: any) {
    res.status(404).json({
      success: 'false',
      message: 'something went wrong',
      error: error.message,
    });
  }
};

const getAllUsers = async (req: Request, res: Response) => {
  try {
    const result = await UserServices.getAllUsersFromDB();

    res.status(200).json({
      success: true,
      message: 'Users fetched successfully',
      data: result,
    });
  } catch (error: any) {
    res.status(440).json({
      success: false,
      message: 'users not found',
      error: error.message,
    });
  }
};

const getSingleUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const id = parseInt(userId);
    const existsUser = await UserServices.doesUserExist(id);
    if (!existsUser) {
      res.status(404).json({
        success: false,
        message: 'user not found',
        error: {
          code: 404,
          description: 'user not found',
        },
      });
      return;
    }
    const result = await UserServices.getSingleUserFromDB(id);
    res.status(200).json({
      success: true,
      message: 'User fetched successfully',
      data: result,
    });
  } catch (error: any) {
    res.status(404).json({
      success: false,
      message: 'user not found',
      error: error.message,
    });
  }
};
const deleteUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const id = parseInt(userId);
    const userExists = await UserServices.doesUserExist(id);
    if (!userExists) {
      res.status(404).json({
        success: false,
        message: 'user not found',
        error: {
          code: 404,
          description: 'user not found',
        },
      });
      return;
    }
    await UserServices.deleteUserFromDB(id);
    res.status(200).json({
      success: true,
      message: 'User deleted successfully',
      data: null,
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
    const userExists = await UserServices.doesUserExist(id);
    if (!userExists) {
      res.status(404).json({
        success: false,
        message: 'user not found',
        error: {
          code: 404,
          description: 'user not found',
        },
      });
      return;
    }
    const { error, value } = userUpdateValidationSchema.validate(user);

    if (error) {
      res.status(500).json({
        status: 'fail',
        message: 'something went wrong 1',
        error: error.details,
      });
    }

    const result = await UserServices.updateUserFromDB(id, value);

    res.status(200).json({
      success: true,
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
// orders data add
const addOrder = async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId;
    const id = parseInt(userId);
    const user = req.body;
    const userExists = await UserServices.doesUserExist(id);
    if (!userExists) {
      res.status(404).json({
        success: false,
        message: 'user not found',
        error: {
          code: 404,
          description: 'user not found',
        },
      });
      return;
    }
    const { error, value } = orderValidationSchema.validate(user);
    if (error) {
      res.status(500).json({
        status: 'fail',
        message: 'something went wrong',
        error: error.details,
      });
    }
    await UserServices.addOrderFromDB(id, value);

    res.status(200).json({
      success: true,
      message: 'order created  successfully',
      data: null,
    });
  } catch (error: any) {
    res.status(500).json({
      success: 'false',

      message: 'User not found',
      error: error.message,
    });
  }
};
const getAllOrdersById = async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId;
    const id = parseInt(userId);
    const userExists = await UserServices.doesUserExist(id);
    if (!userExists) {
      res.status(404).json({
        success: false,
        message: 'user not found',
        error: {
          code: 404,
          description: 'user not found',
        },
      });
      return;
    }
    const result = await UserServices.getAllOrdersById(id);
    res.status(200).json({
      success: true,
      message: 'Order fetched successfully!',
      data: { orders: result },
    });
  } catch (error: any) {
    res.status(404).json({
      success: false,
      message: 'user not found',
      error: error.message,
    });
  }
};

const calculateTotalPriceById = async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId;
    const id = parseInt(userId);
    const userExists = await UserServices.doesUserExist(id);
    if (!userExists) {
      res.status(404).json({
        success: false,
        message: 'user not found',
        error: {
          code: 404,
          description: 'user not found',
        },
      });
      return;
    }
    const result = await UserServices.calculateTotalPriceById(id);
    const totalPrice = result?.reduce(
      (acc, order) => acc + order.price * order.quantity,
      0,
    );
    res.status(200).json({
      success: true,
      message: 'Total price calculated successfully!',
      data: { totalPrice },
    });
  } catch (error: any) {
    res.status(404).json({
      success: false,
      message: 'user not found',
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
  getAllOrdersById,
  calculateTotalPriceById,
};

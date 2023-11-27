/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express';
import { UserServices } from './user.service';
//const Joi = require('joi');
import Joi from 'joi';
const createUser = async (req: Request, res: Response) => {
  try {
    // joy validation
    // Define Joi schemas for embedded objects
    const userFullNameSchema = Joi.object({
      firstName: Joi.string().trim().required(),
      lastName: Joi.string().trim().required(),
    });

    const addressSchema = Joi.object({
      street: Joi.string().required(),
      city: Joi.string().required(),
      country: Joi.string().required(),
    });

    // Define Joi schema for the User model
    const userSchema = Joi.object({
      userId: Joi.number().integer().required(),
      userName: Joi.string().max(20).required().trim(),
      password: Joi.string().required(),
      fullName: userFullNameSchema.required(),
      age: Joi.number().integer().required(),
      email: Joi.string().email().required(),
      isActive: Joi.boolean().required(),
      hobbies: Joi.array().items(Joi.string()).required(),
      address: addressSchema.required(),
    });

    const user = req.body;
    const { error, value } = userSchema.validate(user);

    if (error) {
      res.status(500).json({
        status: 'fail',
        message: 'something went wrong',
        error: error.details,
      });
    }
    const result = await UserServices.createUserIntoDB(user);
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
  } catch (error) {
    console.log(error);
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

// const getSingleUser = async (req: Request, res: Response) => {
//   try {
//     const { userId } = req.params;
//    const result = await UserServices.getSingleUserFromDB(userId);
//     console.log(result);
//     res.status(200).json({
//       status: 'success',
//       message: 'singleUser is retrieve successfully',
//       data: result,
//     });
//   } catch (error) {
//     console.log(error);
//   }
// };

export const UserControllers = { createUser, getAllUsers, getSingleUser };

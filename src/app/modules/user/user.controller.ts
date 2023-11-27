import { Request, Response } from 'express';
import { UserServices } from './user.service';

const createUser = async (req: Request, res: Response) => {
  try {
    const user = req.body;
    const result = await UserServices.createUserIntoDB(user);
    res.status(200).json({
      status: 'success',
      message: 'user created successfully',
      data: result,
    });
  } catch (error) {
    console.log(error);
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
  } catch (error) {
    console.log(error);
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

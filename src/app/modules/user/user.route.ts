import express from 'express';
import { UserControllers } from './user.controller';
const router = express.Router();

router.post('/create-user', UserControllers.createUser);
router.get('/', UserControllers.getAllUsers);
router.get('/:userId', UserControllers.getSingleUser);
// router.get('/:userId', UserControllers.getSingleUser);
// router.get('/:studentId', StudentController.getSingleStudent);
export const UserRoutes = router;

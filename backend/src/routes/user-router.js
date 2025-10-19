import { Router } from 'express';
import userController from '../controllers/user-controller.js'

const userRouter = Router();

userRouter.post('/register', userController.registaration);
userRouter.post('/login', userController.login);
userRouter.post('/logout', userController.logout);
userRouter.get('/activate/:link', userController.activate)
userRouter.get('/refresh', userController.refresh)
userRouter.get('/getusers', userController.getUsers)


export default userRouter;
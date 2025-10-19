import { Router } from 'express';
import userController from '../controllers/user-controller.js';
import { body } from "express-validator"

const userRouter = Router();

userRouter.post('/register',
    body('email').isEmail(),
    body('password').isLength({ min: 8, max: 32 }),
    body("phone").matches(/^\+?\d{10,15}$/),
    userController.registration
);
userRouter.post('/login', userController.login);
userRouter.post('/logout', userController.logout);
userRouter.get('/activate/:link', userController.activate)
userRouter.get('/refresh', userController.refresh)
userRouter.get('/getusers', userController.getUsers)


export default userRouter;
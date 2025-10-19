import { Router } from 'express';
import userRouter from './user-router.js';
import authMiddleware from '../middlewares/auth-middleware.js'

const router = Router();

router.use('/users', userRouter);


export default router;
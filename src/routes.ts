import {Router} from 'express';
import userRouter from './controllers/UserController';

const router: Router = Router();

router.use('/user', userRouter);
export default router;
import {NextFunction, Request, Response, Router} from 'express';
import { UserService } from '../services/UserService';

const userRouter: Router = Router();


userRouter
.route('/')
.get(async (req: Request, res: Response, next: NextFunction) => {
    try {
        console.log("Getting request");
        const userService = new UserService();
        let resObj = await userService.getUsers();
        res.json(resObj);
    }catch(e){
        console.log(e);
    }
});

export default userRouter;
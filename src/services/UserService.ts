import {getManager,Repository} from 'typeorm';
import { User } from '../entities/User';

export class UserService {
    userRepository: Repository<User>;

    constructor () {
        this.userRepository = getManager().getRepository(User);
    }

    async getUsers():Promise<any[]> {
        try {
            let users = await this.userRepository.find();
            return users;
        }catch(e){
            console.log(e);
            return Promise.reject('You have an error in your request');
        }
    }
}
import {UserRepository} from "../domain/userRepository";
import {User} from "../domain/user";


export class LogOutUserUseCase{

    constructor(readonly userRepository:UserRepository) {
    }

    async run(uuid:string):Promise<User | any>{
        try {
            return await this.userRepository.logout(uuid)
        }catch (e) {
            console.log(e)
            return null
        }
    }

}
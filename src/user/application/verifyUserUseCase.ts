import {User} from "../domain/user";
import {UserRepository} from "../domain/userRepository";

export class VerifyUserUseCase{

    constructor(readonly userRepository:UserRepository) {
    }

    async run(
        uuid:string
    ):Promise<Boolean | null> {
        try {
            return await this.userRepository.verifyUser(uuid)
        }catch (e) {
            console.log(e)
            return null
        }

    }

}
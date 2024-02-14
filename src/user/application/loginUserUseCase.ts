import {User} from "../domain/user";
import {UserRepository} from "../domain/userRepository";
import {encryptService} from "../Infrastructure/dependencies";
import {EncryptService} from "../../auth/domain/services/encryptService";

export class LoginUserUseCase{

    constructor(readonly userRepository:UserRepository) {
    }

    async run(
        email:string,
        password:string,
        encryptionService:EncryptService
    ):Promise<User | null>{
        try {
            return await this.userRepository.login(email,password, encryptionService)
        }catch (e) {
            console.log(e)
            return null
        }
    }
}
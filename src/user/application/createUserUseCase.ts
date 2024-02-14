import {User} from "../domain/user";
import {UserRepository} from "../domain/userRepository";

export class CreateUserUseCase{
    constructor(readonly userRepository:UserRepository) {
    }

    async run(
        uuid:string,
        name:string,
        email:string,
        password:string,
        verifiedAt:Date | null ,
        deletedAt:Date | null ,
        createdAt:Date | null
    ):Promise<User | null>{
        try {
            return await this.userRepository.createUser(
                uuid,
                name,
                email,
                password,
                verifiedAt,
                deletedAt,
                createdAt
            )
        }catch (e) {
            return null;
        }
    }
}
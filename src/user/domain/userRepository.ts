import {User} from "./user";
import {EncryptService} from "../../auth/domain/services/encryptService";

export interface UserRepository{
    getAll():Promise<User[] | null>;
    getById(uuid:string):Promise<User | null>;
    update(uuid:string, user:User):Promise<User | null>;
    deleteById(uuid:string):Promise<null>;
    createUser(
        uuid:string,
        name:string,
        email:string,
        password:string,
        verifiedAt: Date | null,
        deletedAt: Date | null,
        createdAt:Date | null,
    ):Promise<User | null>;
    verifyUser(uuid:string):Promise<Boolean | null>
    login(email:string, password:string, encryptService:EncryptService):Promise<User | null>
    logout(uuid:string):Promise<User | any>
}
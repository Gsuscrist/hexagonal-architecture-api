import {Credentials} from "../domain/credentials";
import {CredentialsRepository} from "../domain/credentialsRepository";
import {JwtRepository} from "./jwt/jwtRepository";
import {jwtRepository} from "../../user/Infrastructure/dependencies";

export class AuthUseCase{

    constructor(readonly repository:CredentialsRepository, readonly jwtRepository:JwtRepository) {
    }

    async execute(email:string, password:string):Promise<any | null>{

        let credentials = new Credentials(email, password);

        let user = await this.repository.verifyUser(credentials)
        let token = await jwtRepository.generateToken(user?.email);

        return {user,token}


    }

}
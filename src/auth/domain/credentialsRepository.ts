import {Credentials} from "./credentials";


export interface CredentialsRepository{

    verifyUser(credentials:Credentials): Promise<Credentials | null>;

}
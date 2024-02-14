import {query} from "../../database/mysql";
import {Credentials} from "../domain/credentials";
import {CredentialsRepository} from "../domain/credentialsRepository";

export class MysqlAuthRepository implements CredentialsRepository{

    async verifyUser(credentials: Credentials) {
        try {
            let sql = "SELECT * FROM users WHERE email=?"
            let params: any[] = [credentials.email]

            let [result]: any = await query(sql, params)

            if(!result){
                console.log(credentials)
                console.log(result)
            }

            return credentials
        }catch (e) {
            console.log(e)
            return null
        }
    }


}
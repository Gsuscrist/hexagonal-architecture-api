import {query} from "../../database/mysql";
import {User} from "../domain/user";
import {UserRepository} from "../domain/userRepository";
import * as console from "console";
import {EncryptService} from "../../auth/domain/services/encryptService";


export class MysqlUserRepository implements UserRepository{
    async createUser(uuid: string, name: string, email: string, password: string,verifiedAt: Date, deletedAt:Date,  createdAt: Date): Promise<User | null> {
        let date = new Date()
        try {
            const sql = "INSERT INTO users (uuid, name, email, password,verified_at, deleted_at, created_at) VALUES (?,?,?,?,?,?,?)"
            const params:any[] = [uuid,name,email,password,verifiedAt,deletedAt,date]
            const [result]: any = await query(sql,params)

            return new User(uuid,name,email,password,verifiedAt,deletedAt, date);
        }catch (e){
            console.log(e)
            return null;
        }

    }

    deleteById(uuid: string): Promise<null> {
        throw new Error("Method not implemented.");
    }

    async getAll(): Promise<User[] | null> {
        const sql = "SELECT * FROM users WHERE deleted_at IS NOT NULL";
        try {
            const [data]:any= await query(sql,[]);
            const dataUser = Object.values(JSON.parse(JSON.stringify(data)))

            return dataUser.map((user:any)=>
                    new User(
                    user.uuid,
                    user.name,
                    user.email,
                    user.password,
                    user.verifiedAt,
                    user.deletedAt,
                    user.createdAt,
                )
            );

        }catch (e) {
            console.log(e)
            return null
        }
    }

    getById(uuid: string): Promise<User | null> {
        throw new Error("Method not implemented.");
    }

    update(uuid: string, user: User): Promise<User | null> {
        throw new Error("Method not implemented.");
    }

    async login(email: string, password: string, encryptService:EncryptService): Promise<User | null> {
        try {
            const sql = "SELECT * FROM users WHERE email= ? AND verified_at IS NOT NULL AND deleted_at IS NULL"
            const params:any[]=[email]
            const [result]:any = await query(sql,params)
            if (await encryptService.compare(password, result[0].password)){
                console.log("match")
                const user = result[0];
                return new User(
                    user.uuid,
                    user.name,
                    user.email,
                    user.password,
                    user.verified_at,
                    user.deleted_at,
                    user.created_at
                );
            }else{
                console.log("no match")
                return null;
            }

        }catch (e){
            console.log(e)
            return null;
        }

    }

    async logout(uuid: string): Promise<User | any> {
        try {
            const sql = "SELECT * FROM users WHERE uuid= ? AND verified_at IS NOT NULL AND deleted_at IS NULL"
            const params:any[]=[uuid]
            const [result]:any = await query(sql,params)
            const user = result[0];
            return new User(
                user.uuid,
                user.name,
                user.email,
                user.password,
                user.verified_at,
                user.deleted_at,
                user.created_at
            );
        }catch (e) {
            return null
        }

    }

    async verifyUser(uuid: string): Promise<true | null> {
        try {
            const date = new Date()
            const sql ="UPDATE users SET verified_at = ? WHERE uuid = ?";
            const params :any[] = [date,uuid]
            const [result]: any = await query(sql, params)
            return true
        }catch (e) {
            console.log(e)
            return null
        }

    }

}
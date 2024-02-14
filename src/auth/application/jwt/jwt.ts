import jwt from "jsonwebtoken"
import dotenv from "dotenv";
import {JwtRepository} from "./jwtRepository";

dotenv.config();


export class Jwt implements JwtRepository{

    private blacklist: string[] = [];
    private readonly secretKey: string;

    constructor() {
        this.secretKey = process.env.SECRET_JWT || ' ';
    }

    async  generateToken(data: any): Promise<any> {
        return jwt.sign(data, this.secretKey);
    }

    addToBlackList(token: any): void {
        this.blacklist.push(token)
    }

    async isTokenRevoked(token: string): Promise<boolean> {
        return this.blacklist.includes(token);
    }
}
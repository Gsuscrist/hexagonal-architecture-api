import {Response,Request} from "express";
import {LogOutUserUseCase} from "../../application/logOutUserUseCase";
import { IncomingHttpHeaders } from 'http';
import {JwtRepository} from "../../../auth/application/jwt/jwtRepository";

export class LogOutController{

    constructor(readonly logOutUserUseCase:LogOutUserUseCase, readonly jwtRepository:JwtRepository) {
    }

    async run(req:Request, res:Response){
        try {
            let uuid = req.params.uuid
            const headers = req.headers as IncomingHttpHeaders;
            const authHeader = headers['authorization'];
            if (!authHeader) {
                return res.status(401).json({ message: 'Token not provided' });
            }
            const token = authHeader.split(' ')[1];
            let user = await this.logOutUserUseCase.run(uuid)
            this.jwtRepository.addToBlackList(token)
            if (user){
                res.status(200).send({
                    message:"log out Successfully"
                })
            }
            res.status(400).send({
                message:"error"
            })


        }catch (e){
            return e
        }
    }
}
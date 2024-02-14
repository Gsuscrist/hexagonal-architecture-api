import {Request,Response} from "express";
import {LoginUserUseCase} from "../../application/loginUserUseCase";
import {encryptService} from "../dependencies";
import {EncryptService} from "../../../auth/domain/services/encryptService";
import {JwtRepository} from "../../../auth/application/jwt/jwtRepository";

export class LoginUserController{
    constructor(readonly loginUserUseCase:LoginUserUseCase, readonly encryptService:EncryptService, readonly jwtRepository:JwtRepository) {
    }

    async run(req:Request,res:Response){
        try {
            let{email,password} =req.body
            const loggedUser = await this.loginUserUseCase.run(email,password, this.encryptService)
            if (loggedUser){
                let token: any = await this.jwtRepository.generateToken(loggedUser.email)
                return res.status(200).send({
                    status:"success",
                    data:{
                        uuid:loggedUser.uuid,
                        name:loggedUser.name,
                        email:loggedUser.email,
                        token: token
                    },
                    message:"user logged successful"
                })
            }
            res.status(400).send({
                status:"error",
                data:[],
                message: "User not found"
            })
        }catch (e) {
            console.log(e)
            return null;
        }
    }
}
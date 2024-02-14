import {Request, Response} from "express";
import {AuthUseCase} from "../../application/authUseCase";
import {error} from "signale";

export class AuthController{
    constructor(readonly authUseCase:AuthUseCase) {
    }

    async run(req:Request, res:Response){
        try {
            let {email, password} = req.body

            let authentication = await this.authUseCase.execute(email,password)
            return res.status(200).json(authentication)
        }catch (e:any){
            console.log(e)
            res.status(e.http_status ?? 500).json({
                message:"error while authentication",
                error: e
            })
        }
    }
}
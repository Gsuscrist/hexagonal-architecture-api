import {Request, Response} from "express";
import {CreateUserUseCase} from "../../application/createUserUseCase";
import {EmailService} from "../Services/emailService";
import {EncryptService} from "../../../auth/domain/services/encryptService";
import {encryptService} from "../dependencies";

export class CreateUserController{
    constructor(readonly createUserUseCase: CreateUserUseCase, readonly emailService:EmailService, readonly encryptService: EncryptService) {
    }

    async run (req:Request, res:Response){
        try {
            let{uuid,name,email,password} = req.body;
            password = await encryptService.execute(password)
            const createdUser = await this.createUserUseCase.run(
                uuid,
                name,
                email,
                password,
                null,
                null,
                null,
            );
            console.log(createdUser)
            if(createdUser){
                const verificationURL = `http://localhost:8080/user/${createdUser.uuid}/validate`
                this.emailService.sendEmail(createdUser.email,"Account Verification", `click the next url to verify account: ${verificationURL}`)
                return res.status(201).send({
                    status:"success",
                    data:{
                        uuid:createdUser.uuid,
                        name:createdUser.name,
                        email:createdUser.email,
                        password:createdUser.password,
                        verifiedAt:createdUser.verifiedAt,
                        deletedAt:createdUser.deletedAt,
                        createdAt:createdUser.createdAt
                    },
                    message: "User created successful",
                })
            }
            res.status(400).send({
                status:"error",
                data:[],
                message: "User not found"
            })
        }catch (e) {
            return null
        }
    }
}
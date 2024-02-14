import {Request, Response} from "express";
import {VerifyUserUseCase} from "../../application/verifyUserUseCase";

export class VerifyUserController {
    constructor(readonly verifyUserUseCase: VerifyUserUseCase) {
    }

    async run(req: Request, res: Response) {
        try {


        let uuid = req.params.uuid
        const isModified = await this.verifyUserUseCase.run(uuid)
        if (isModified) {
            return res.status(200).send({
                status: "success",
                data: [],
                message: "user verified"
            })
        }
        res.status(400).send({
            status: "error",
            data: [],
            message: "User not found"
        })
    }catch (e) {
            return null
        }
}
}
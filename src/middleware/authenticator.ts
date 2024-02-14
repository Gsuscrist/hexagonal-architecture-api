import {Request, Response, NextFunction} from "express";
import jwt from "jsonwebtoken"
import dotenv from "dotenv";
import {error} from "signale";

dotenv.config();

const secretKey:any=process.env.SECRET_JWT

export const authenticateMiddleware=(req:Request, res:Response,next:NextFunction)=>{
    const token =req.header('Authorization')

    if(!token){
        return res.status(401).json({
            error:"Unauthorized"
        })
    }

    try {
        const decode = jwt.verify(token,secretKey);
        (req as any).token = decode;

        next();

    }catch (e) {
        console.log(e)
        return res.status(401).json({
            message: "Unauthorized",
            error: e
        })
    }

}
import {MysqlAuthRepository} from "./mysqlAuthRepository";
import {AuthUseCase} from "../application/authUseCase";
import {AuthController} from "./controller/authController";

export const mysqlAuthRepository = new MysqlAuthRepository()

export const authUserCase = new AuthUseCase(mysqlAuthRepository)
export const authController = new AuthController(authUserCase)
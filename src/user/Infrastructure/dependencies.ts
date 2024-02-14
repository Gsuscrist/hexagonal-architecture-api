import {MysqlUserRepository} from "./mysqlUserRepository";

import {CreateUserUseCase} from "../application/createUserUseCase";
import {CreateUserController} from "./controllers/CreateUserController";
import {EmailService} from "./Services/emailService";

import {VerifyUserUseCase} from "../application/verifyUserUseCase";
import {VerifyUserController} from "./controllers/VerifyUserController";

import{LoginUserUseCase} from "../application/loginUserUseCase";
import {LoginUserController} from "./controllers/LoginUserController";
import {BCryptService} from "../../auth/infrastructure/services/bCryptService";
import {Jwt} from "../../auth/application/jwt/jwt";
import {LogOutUserUseCase} from "../application/logOutUserUseCase";
import {LogOutController} from "./controllers/LogOutController";
import {MongoUserRepository} from "./mongoUserRepository";


export const mysqlUserRepository = new MysqlUserRepository();

export const mongoUserRepository  = new MongoUserRepository();

const actualDB = mongoUserRepository;

//createUserUseCase
export const createUserUseCase = new CreateUserUseCase(actualDB);
export const emailService = new EmailService()
export const encryptService = new BCryptService()
export const createUserController = new CreateUserController(createUserUseCase, emailService, encryptService);

//verifyUserUseCase
export const verifyUserUseCase = new VerifyUserUseCase(actualDB);
export const verifyUserController = new VerifyUserController(verifyUserUseCase);

//login
export const loginUserUseCase = new LoginUserUseCase(actualDB);
export const jwtRepository = new Jwt()
export const loginUserController = new LoginUserController(loginUserUseCase, encryptService, jwtRepository);

//logout

export const logoutUserUseCase = new LogOutUserUseCase(actualDB);
export const logoutUserController = new LogOutController(logoutUserUseCase, jwtRepository);
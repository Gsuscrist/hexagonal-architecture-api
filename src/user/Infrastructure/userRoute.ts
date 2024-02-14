import express from "express";
import {createUserController, logoutUserController} from "./dependencies";
import {verifyUserController} from "./dependencies";
import {loginUserController} from "./dependencies";

export const userRoute = express.Router();

userRoute.post(
    "/",
    createUserController.run.bind(createUserController)
);

userRoute.put(
    "/:uuid/validate",
    verifyUserController.run.bind(verifyUserController)
);


userRoute.post(
    "/login",
    loginUserController.run.bind(loginUserController)

);


userRoute.get(
    "/:uuid/logout",
    logoutUserController.run.bind(logoutUserController)
)
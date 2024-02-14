import express from "express";
import {authController} from "./dependencies";

export const authRoute = express.Router();

authRoute.post(
    "/",
    authController.run.bind(authController)
)
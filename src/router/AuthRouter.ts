import express from "express";
import { signUpUserHandler, verifyOtpHandler } from "../controller/AuthController";
const authRouter = express.Router();

authRouter.route("/signup").post(signUpUserHandler)
authRouter.route("/verify").post(verifyOtpHandler)

export default authRouter;
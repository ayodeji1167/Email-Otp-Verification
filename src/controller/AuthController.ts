import {signUp, verifyOtp} from "../service/Auth"
import {Request, Response, NextFunction} from "express";
import { VerifyUserInput } from "../schema/AuthenticationSchema";

export const  signUpUserHandler=async (req:Request, res: Response) => {
    const userId =await signUp(req.body);
    res.status(200).json({
        status: "Pending",
        mssg:"Otp Sent To Email",
        data:{
            userId,
            email:req.body.email 
        }
    })
}

export const verifyOtpHandler = async (req:Request<{},{},VerifyUserInput>, res: Response) => {
    await verifyOtp(req.body)
    res.status(200).json({
        status: "Verified",
        mssg:"Email Verified Successfully",
    })
}
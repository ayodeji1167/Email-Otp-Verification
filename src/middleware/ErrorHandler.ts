import { Request, Response, NextFunction } from "express";

export const errorHandler = (error:unknown | any,req:Request,res:Response,next:NextFunction)=>{
    console.log("Got to the error handler");
    
    const customApiError = {
        message: error.message || "Something went wrong in the server",
        statusCode: error.statusCode || 500
    }
   return res.status(customApiError.statusCode).json({mssg: customApiError.message});
}
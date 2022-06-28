import {Request, Response, NextFunction} from "express"

export const notFound = (req:Request , res:Response)=>{

    res.status(500).json({mssg:"Invalid Route"})
}
import { Response } from "express";

const handleDuplectError = (err:any,res:Response) =>{
    return res.status(400).json({
        success: false,
        name: err.name,
        errorValue: err.keyValue,
        message: err.message,
        error: err,
      });
}

export default handleDuplectError;
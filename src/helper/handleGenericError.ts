import { Response } from "express";

const handleGenericError = (err:any,res:Response) =>{
    return res.status(500).json({
        success: false,
        name: err.name,
        message: err.message,
        error: err,
      });
}

export default handleGenericError;
import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import JSONResponse from '../utils/helper/response';
import { FailCodes } from '../utils/constants/constants';

const validateUser = (req: Request, res: Response, next: NextFunction): void => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        JSONResponse(res, {code: FailCodes.FCodeUnauthorized, isSuccess: false,message: "Unauthorized: Bearer token missing or invalid"})
    }

    const token = authHeader.slice(7); // Remove 'Bearer ' from the token

    try{
    const jwtVerify=jwt.verify(token, req.app.get('jwt-secret-key'))
    console.log("jwt data:",jwtVerify);
    req.body.user=jwtVerify
    next();
    }
    catch(err){
        console.log("error while veriying jwt:",err)
        JSONResponse(res, {code: FailCodes.FCodeUnauthorized, isSuccess: false,message: "Unauthorized: invalid token"})
    }
};

export default validateUser;

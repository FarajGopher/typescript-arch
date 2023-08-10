import { Request, Response } from 'express';
import { Logindto, Userdto, userLoginSchema, userSchema } from '../models/dto/auth.users.dto';
import JSONResponse from '../utils/helper/response';
import authService from '../services/auth.users';
import logger from '../logger/logger';
import { FailCodes, SuccessCodes } from '../utils/constants/constants';
import createJwtToken from '../utils/provider/jwt.provider'



//signupController
const signupController = async (req: Request, res: Response) => {
  // Check validation in request
  const validationResult = userSchema.validate(req.body);
  logger.info("validationResult:" + JSON.stringify(validationResult));
  if (validationResult.error) {
    const errorMessage = validationResult.error.details[0].message;
    JSONResponse(res, { code: FailCodes.FCodeBadRequest, isSuccess: false, message: errorMessage });
    return;
  }

  const { firstName, lastName, email, password } = req.body;
  // Create a User object
  const user: Userdto = { firstName, lastName, email, password };

  //signUp service call
  const [userDetails, error] = await authService.signupService(user)
  if (error != null) {
    logger.error("error while creating user" + JSON.stringify(error))
    if (error.code == FailCodes.FCodeDuplicateEntry) {
      JSONResponse(res, { code: error.code, isSuccess: false, message: error.message })
    } else {
      JSONResponse(res, { code: FailCodes.FCodeDb, isSuccess: false, message: error.message })
    }
    return;
  }

  logger.info("existing user:" + JSON.stringify(userDetails))
  JSONResponse(res, { code: SuccessCodes.SCodeCreated, data: userDetails, isSuccess: true, message: "user created successfully" });
};

//loginController
const loginController = async (req: Request, res: Response) => {
  // Check validation in request
  const validationResult = userLoginSchema.validate(req.body);
  logger.info("validationResult:" + JSON.stringify(validationResult));
  if (validationResult.error) {
    const errorMessage = validationResult.error.details[0].message;
    JSONResponse(res, { code: FailCodes.FCodeBadRequest, isSuccess: false, message: errorMessage });
    return;
  }

  const { email, password } = req.body;

  // Create a userLogin object
  const login: Logindto = { email, password };

  const [userDetails, error] = await authService.loginService(login)

  if (error != null) {
    logger.error("[loginController] error while login user" + JSON.stringify(error))
    JSONResponse(res, { code: error.code, isSuccess: false, message: error.message })
    return;
  }
  logger.info("existing user:" + JSON.stringify(userDetails))
  const jwtToken = await createJwtToken(userDetails, req.app.get('jwt-secret-key'))
  console.log("jwt:..", jwtToken)
  JSONResponse(res, { code: SuccessCodes.SCodeFound, data: jwtToken, isSuccess: true, message: "user login successfully" });
};

//deavtivateAccountController
const deactivateController = async (req: Request, res: Response) => {

  const email = req.body.user.email

  const [dbResult, error] = await authService.deactivateService(email);
  if (error != null) {
    logger.error("[loginController] error while login user" + JSON.stringify(error))
    JSONResponse(res, { code: error.code, isSuccess: false, message: error.message })
    return;
  }

  JSONResponse(res, { code: SuccessCodes.SCodeDeleted, data: dbResult, isSuccess: true, message: "user deactivated successfully" });
};






const authController = {
  signupController,
  loginController,
  deactivateController,
};

export default authController;
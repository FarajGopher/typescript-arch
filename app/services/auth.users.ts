import logger from '../logger/logger';
import { Logindto, Userdto } from '../models/dto/auth.users.dto';
import { UserCreate, UserDelete, UserExists } from '../query/auth.user'; 
import { FailCodes, fCodeText } from '../utils/constants/constants';
import RespPayload from './error.model'

const signupService = async (user: Userdto): Promise<[Userdto | null, RespPayload | null]> => {
        let [userDetails, err] = await UserExists(user.email);
        if (err !== null) {
            console.log("[signupService]:Query-User-Exists-Error", err)
            return [null, { code: FailCodes.FCodeDb, message: "database operation error" }as RespPayload]
        }
        if (userDetails !== null) {
            console.log("[signupService]:user already exists", userDetails)
            return [null, { code: FailCodes.FCodeDuplicateEntry, message: "Bad Request: User already exists on this email" }as RespPayload]
        }

        [userDetails,err] = await UserCreate(user)
        if (err!=null){
            logger.error("[signupService] while creating user error:"+JSON.stringify(err))
            return [null, { code: FailCodes.FCodeDb, message: "database operation error" }as RespPayload]
        }
        return [userDetails, null]
        
    } ;


const loginService = async (login: Logindto): Promise<[Userdto | null, RespPayload | null]>=> {
        let [userDetails, err] = await UserExists(login.email);
        if (err !== null) {
            logger.error("[loginService]:Query-User-Exists-Error", err)
            return [null, { code: FailCodes.FCodeDb, message: "database operation error" } as RespPayload]
        }
        if (userDetails == null) {
            logger.info("[loginService]:user doesn't exists", userDetails)
            return [null, { code: FailCodes.FCodeDataNotFound, message: "Bad Request: User doesn't exists on this email" }as RespPayload]
        }
       
        if(userDetails.password!==login.password){
            logger.warn("[loginService]:password not matched", err)
            return [null, { code: FailCodes.FCodeBadRequest, message: "incorrect password" } as RespPayload]
        }
        return [userDetails, null]
    } ;


const deactivateService = async (email: string): Promise<[Userdto | null, RespPayload | null]>=> {
        let [userDetails, err] = await UserExists(email);
        if (err !== null) {
            logger.error("[loginService]:Query-User-Exists-Error", err)
            return [null, { code: FailCodes.FCodeDb, message: "database operation error" } as RespPayload]
        }
        if (userDetails == null) {
            logger.info("[loginService]:user doesn't exists", userDetails)
            return [null, { code: FailCodes.FCodeDataNotFound, message: "Bad Request: User doesn't exists on this email" }as RespPayload]
        }
        [userDetails,err]=await UserDelete(email)
        if(err!=null){
            logger.error("[loginService]:Query-User-Exists-Error", err)
            return [null, { code: FailCodes.FCodeDb, message: "database operation error" } as RespPayload]
        }
        console.log("userdetails:",userDetails)
        return [userDetails, null]
    } ;



const authService = {
        signupService,
        loginService,
        deactivateService
    };
      
export  default authService;
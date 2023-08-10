import http from "http";
import { sCodeText, fCodeText, sHttpStatus, fHttpStatus } from "../constants/constants";

interface Payload {
    code: number;
    data?: any;
    httpStatus?: number;
    isSuccess: boolean;
    message?: string;
  }

  function JSONResponse(res: http.ServerResponse, payload: Payload) {
    const { code, data, httpStatus, isSuccess, message } = payload;
    // console.log("json resposne:",fCodeText)
    let status: number;
    let messageToSend: string;
  
    if (isSuccess) {
      status = httpStatus || sHttpStatus[code] || 200;
      messageToSend = message || sCodeText[code] || "";
    } else {
      status = httpStatus || fHttpStatus[code] || 500;
      messageToSend = message || fCodeText[code] || "";
    }
  
    const response: Payload = {
      code,
      data: data || {},
      isSuccess,
      message: messageToSend,
    };
  
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
      "Access-Control-Allow-Methods",
      "POST, GET, PUT, DELETE"
    );
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Accept, Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization"
    );
    res.setHeader("Content-Type", "application/json");
    res.writeHead(status);
    res.end(JSON.stringify(response));
  }

export default JSONResponse;
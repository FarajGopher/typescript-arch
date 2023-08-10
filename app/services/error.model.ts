

export default interface RespPayload {
    code: number;
    data?: any;
    httpStatus?: number;
    isSuccess: boolean;
    message?: string;
  }
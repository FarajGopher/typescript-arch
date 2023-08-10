
enum SuccessCodes {
    SCodeCreated = 1,
    SCodeFound = 2,
    SCodeUp = 3,
    SCodeGenerated = 4,
    SCodeDeleted = 5,
    SCodeUpdated = 6,
    SCodeValidated = 7,
    SCodeUploaded = 8,
}

enum FailCodes {
    FCodeDataNotFound = 1,
    FCodeDb = 2,
    FCodeBadRequest = 3,
    FCodeUriNotFound = 4,
    FCodeSelfRefer = 5,
    FCodeMethodNotAllowed = 6,
    FCodeDuplicateEntry = 7,
    FCodeMaximumLimit = 8,
    FCodeUnauthorized = 9,
}

const sCodeText: { [key in SuccessCodes]: string } = {
    [SuccessCodes.SCodeCreated]: "successfully created",
    [SuccessCodes.SCodeFound]: "data found",
    [SuccessCodes.SCodeUp]: "service is up and running",
    [SuccessCodes.SCodeGenerated]: "successfully generated",
    [SuccessCodes.SCodeDeleted]: "successfully deleted",
    [SuccessCodes.SCodeUpdated]: "successfully updated",
    [SuccessCodes.SCodeValidated]: "successfully validated",
    [SuccessCodes.SCodeUploaded]: "successfully uploaded",
};

const fCodeText: { [key in FailCodes]: string } = {
    [FailCodes.FCodeDataNotFound]: "data not found",
    [FailCodes.FCodeDb]: "data source error",
    [FailCodes.FCodeBadRequest]: "bad request",
    [FailCodes.FCodeUriNotFound]: "uri not found",
    [FailCodes.FCodeSelfRefer]: "self-refer is not allowed",
    [FailCodes.FCodeMethodNotAllowed]: "method not allowed",
    [FailCodes.FCodeDuplicateEntry]: "duplicate entry",
    [FailCodes.FCodeMaximumLimit]: "maximum limit reached",
    [FailCodes.FCodeUnauthorized]: "unauthorized",
};

const f_code = {
    '1': ['data not found'],
    '2': 'data source error',
    '3': 'bad request',
    '4': 'uri not found',
    '5': 'self-refer is not allowed',
    '6': 'method not allowed',
    '7': 'duplicate entry',
    '8': 'maximum limit reached',
    '9': 'unauthorized'
  }

const sHttpStatus: { [key in SuccessCodes]: number } = {
    [SuccessCodes.SCodeCreated]: 201,
    [SuccessCodes.SCodeFound]: 200,
    [SuccessCodes.SCodeUp]: 200,
    [SuccessCodes.SCodeGenerated]: 200,
    [SuccessCodes.SCodeDeleted]: 200,
    [SuccessCodes.SCodeUpdated]: 200,
    [SuccessCodes.SCodeValidated]: 200,
    [SuccessCodes.SCodeUploaded]: 200,
};

const fHttpStatus: { [key in FailCodes]: number } = {
    [FailCodes.FCodeDataNotFound]: 200,
    [FailCodes.FCodeDb]: 500,
    [FailCodes.FCodeBadRequest]: 400,
    [FailCodes.FCodeUriNotFound]: 404,
    [FailCodes.FCodeSelfRefer]: 200,
    [FailCodes.FCodeMethodNotAllowed]: 405,
    [FailCodes.FCodeDuplicateEntry]: 409,
    [FailCodes.FCodeMaximumLimit]: 200,
    [FailCodes.FCodeUnauthorized]: 401,
};

export { SuccessCodes,FailCodes,sCodeText, fCodeText, sHttpStatus, fHttpStatus };
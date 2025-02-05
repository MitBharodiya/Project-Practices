import responseMessage from "./response.Message.js";

// Success response function
const returnSuccess = (message, data = {}) => {
  return {
    status: 201,
    success: true,
    message: responseMessage.addDataSuccess(message),
    data,
  };
};

const createSuccess = (message, data = {}) => {
  return {
    status: 201,
    success: true,
    message: responseMessage.addDataSuccess(message),
    data,
  };
};

const getSuccess = (message, data = {}) => {
  return {
    status: 200,
    success: true,
    message: responseMessage.getDataSuccess(message),
    data,
  };
};

// Error response function
const returnError = (status, error) => {
  // Log the error for debugging purposes
  console.error(error);
  return {
    status,
    success: false,
    message: `${responseMessage.addDataError} : ${error}`,
    error: error,
  };
};

export { createSuccess,getSuccess,returnSuccess, returnError };

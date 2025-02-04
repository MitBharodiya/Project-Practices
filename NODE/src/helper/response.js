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

export { returnSuccess, returnError };

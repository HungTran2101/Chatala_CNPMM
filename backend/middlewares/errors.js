const ErrorHandler = require("../utils/errorHandler");

module.exports = (error, req, res, next) => {
  error.statusCode = error.statusCode || 500;
  error.message = error.message || "Internal Server Error";

  if (process.env.NODE_ENV === "DEVELOPMENT") {
    res
      .status(error.statusCode)
      .json({ error, message: error.message, stack: error.stack });
  }

  if (process.env.NODE_ENV === "PRODUCTION") {

    if(error.name === "CastError"){ //error from mongodb
      error.statusCode = 404
      error.message = `Resource not found. Invalid: ${error.path}`
    }

    if(error.name === "ValidationError"){ //error from mongodb
      error.statusCode = 400
      error.message = Object.values(error.errors).map(value => value.message)
    }

    if(error.code === 11000) {
      error.statusCode = 400
      error.message = `Infomation is duplicate. Info Value: ${error.keyValue.phone}`
    }

    res
      .status(error.statusCode)
      .json({ message: error.message });
  }
};

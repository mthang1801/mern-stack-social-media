exports.raiseError = (message = 'server error', statusCode = 500) => {
  const error = new Error(message);
  error.statusCode = statusCode;
  throw error;
};

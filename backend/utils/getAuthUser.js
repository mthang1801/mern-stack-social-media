const jwt = require('jsonwebtoken');
const { AuthenticationError } = require('apollo-server-express');
module.exports = (req, required = true) => {
  const authorization = req.headers.authorization;
  if (authorization) {
    const token = authorization.replace(/bearer/i, '').trim();
    const { userId } = jwt.verify(token, process.env.JWT_SECRET);
    return userId;
  }
  if (required) {
    throw new AuthenticationError('Unauthorized');
  }
};

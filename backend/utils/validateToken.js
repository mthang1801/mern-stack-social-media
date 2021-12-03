const jwt = require('jsonwebtoken');

const validateToken = (authToken) => {
  const token = authToken.replace(/bearer/i, '').trim();
  const { userId } = jwt.verify(token, process.env.JWT_SECRET);
  return userId;
};

module.exports = validateToken;

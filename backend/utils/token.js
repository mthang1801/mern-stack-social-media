const jwt = require('jsonwebtoken');

exports.generateToken = (userId) =>
  jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: +process.env.JWT_TOKEN_EXPIRE,
  });

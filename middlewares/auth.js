const jwt = require('jsonwebtoken');
const AuthorizationError = require('../errors/AuthorizationError');
const { messageLogIn } = require('../utils/constants');

const { NODE_ENV, JWT_SECRET } = process.env;

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    throw new AuthorizationError(messageLogIn);
  }

  const token = authorization.replace('Bearer ', '');
  let payload;
  try {
    payload = jwt.verify(token, `${NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret'}`);
  } catch (err) {
    throw new AuthorizationError(messageLogIn);
  }
  req.user = payload;

  next();
};

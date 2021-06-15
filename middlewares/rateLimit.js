const rateLimit = require('express-rate-limit');
const { messageTryLater } = require('../utils/constants');

const rateLimiter = rateLimit({
  windowMs: 5000,
  max: 100,
  message: messageTryLater,
});

module.exports = rateLimiter;

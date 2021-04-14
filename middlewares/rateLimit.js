const rateLimit = require('express-rate-limit');

const rateLimiter = rateLimit({
  windowMs: 5000,
  max: 100,
  message: 'Пожалуйста, попробуйте позже',
});

module.exports = rateLimiter;
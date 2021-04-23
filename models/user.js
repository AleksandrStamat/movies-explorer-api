const mongoose = require('mongoose');
const isEmail = require('validator/lib/isEmail');
const isStrongPassword = require('validator/lib/isStrongPassword');
const bcrypt = require('bcryptjs');
const AuthorizationError = require('../errors/AuthorizationError');
const {
  messageInvalidEmail,
  messageInvalidPassword,
  messageInvalidEmailOrPassword,
  messageNameRequired,
  messageEmailRequired,
  messagePasswordRequired,
} = require('../utils/constants');

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, messageNameRequired],
      minlength: 2,
      maxlength: 30,
    },
    email: {
      type: String,
      required: [true, messageEmailRequired],
      unique: true,
      validate: {
        validator: (v) => isEmail(v),
        message: messageInvalidEmail,
      },
    },
    password: {
      type: String,
      required: [true, messagePasswordRequired],
      validate: {
        validator(v) {
          return isStrongPassword(v);
        },
        message: messageInvalidPassword,
      },
      select: false,
    },
  },
  { versionKey: false },
);

userSchema.statics.findUserByCredentials = function (email, password) {
  return this.findOne({ email }).select('+password').then((user) => {
    if (!user) {
      throw new AuthorizationError(messageInvalidEmailOrPassword);
    }
    return bcrypt.compare(password, user.password).then((matched) => {
      if (!matched) {
        throw new AuthorizationError(messageInvalidEmailOrPassword);
      }
      return user;
    });
  });
};
module.exports = mongoose.model('user', userSchema);

const mongoose = require('mongoose');
const isEmail = require('validator/lib/isEmail');
const isStrongPassword = require('validator/lib/isStrongPassword');
// const isLength = require('validator/lib/isLength');
const bcrypt = require('bcryptjs');
const AuthorizationError = require('../errors/AuthorizationError');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    require: [true, 'Поле "name" обязательно для заполнения.'],
    minlength: 2,
    maxlength: 30,
  },
  email: {
    type: String,
    require: [true, 'Поле "email" обязательно для заполнения.'],
    unique: true,
    validate: {
      validator: (v) => isEmail(v),
      message: 'Не верно указан адрес.',
    },
  },
  password: {
    type: String,
    required: [true, 'Поле "password" обязательно для заполнения.'],
    validate: {
      validator(v) {
        return isStrongPassword(v);
      },
      message: 'Введен не корректный пароль',
    },
    select: false,
  },
});
userSchema.statics.findUserByCredentials = function (email, password) {
  return this.findOne({ email })
    .select('+password')
    .then((user) => {
      if (!user) {
        throw new AuthorizationError({
          message: 'Неправильные email или пароль',
        });
      }
      return bcrypt.compare(password, user.password).then((matched) => {
        if (!matched) {
          throw new AuthorizationError({
            message: 'Неправильные email или пароль',
          });
        }
        return user;
      });
    });
};
module.exports = mongoose.model('user', userSchema);

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const AuthorizationError = require('../errors/AuthorizationError');
const BadRequesError = require('../errors/BadRequestError');
const ConflictError = require('../errors/ConflictError');
const NotFoundError = require('../errors/NotFoundError');

const { NODE_ENV, JWT_SECRET } = process.env;

const getUser = (req, res, next) => User.findById(req.params._id)
  .then((user) => {
    if (!user) {
      throw new NotFoundError({ message: 'Нет пользователя с таким id' });
    }
    res.status(200).send({ data: user });
  })
  .catch(next);

const createUser = (req, res, next) => {
  const {
    name, email, password,
  } = req.body;
  bcrypt
    .hash(password, 10)
    .then((hash) => User.create({
      name,
      email,
      password: hash,
    }))
    .catch((err) => {
      if (err.name === 'MongoError' && err.code === 11000) {
        throw new ConflictError({
          message: 'Пользователь с таким email уже зарегистрирован',
        });
      } else next(err);
    })
    .then(() => res.send({
      message: 'Пользователь успешно зарегистрирован',
    }))
    .catch(next);
};

const login = (req, res, next) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret',
        { expiresIn: '7d' },
      );
      res.send({ token });
    })
    .catch((err) => {
      throw new AuthorizationError(err.message);
    })
    .catch(next);
};

const updateUser = (req, res, next) => {
  const { name, email } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { name, email },
    {
      new: true,
      runValidators: true,
    },
  )
    .then((user) => res.status(200).send(user))
    .catch((err) => {
      if (err instanceof NotFoundError) {
        next(new BadRequesError({ message: 'Данные введены не корректно' }));
      } else {
        next(err);
      }
    });
};

module.exports = {
  getUser,
  createUser,
  updateUser,
  login,
};

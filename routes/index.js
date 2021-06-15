const router = require('express').Router();
const usersRouter = require('./users');
const movieRouter = require('./movies');
const formRouter = require('./form');
const auth = require('../middlewares/auth');
const { createUser, login } = require('../controllers/users');
const { messageNotFoundError, messageCrashNow } = require('../utils/constants');
const { validateAuthentication, validateUserCreate } = require('../middlewares/validation');
const NotFoundError = require('../errors/NotFoundError');

router.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error({ message: messageCrashNow });
  }, 0);
});
router.all('/', auth);

router.post('/signup', validateUserCreate, createUser);
router.post('/signin', validateAuthentication, login);
router.use('/form', formRouter);

router.use('/users', auth, usersRouter);
router.use('/movies', auth, movieRouter);

router.all('*', () => {
  throw new NotFoundError(messageNotFoundError);
});

module.exports = router;
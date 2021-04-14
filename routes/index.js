const router = require('express').Router();
const usersRouter = require('./users');
const movieRouter = require('./movies');
const auth = require('../middlewares/auth');
const { createUser, login } = require('../controllers/users');
const { validateAuthentication, validateUserCreate } = require('../middlewares/validation');
const NotFoundError = require('../errors/NotFoundError');

router.all('/', auth);
router.post('/signup', validateUserCreate, createUser);
router.post('/signin', validateAuthentication, login);

router.use('/users', auth, usersRouter);
router.use('/movies', auth, movieRouter);

router.all('/*', () => {
  throw new NotFoundError('Запрашиваемый ресурс не найден');
});

module.exports = router;

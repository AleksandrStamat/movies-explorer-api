const router = require('express').Router();
const { validateMovieId, validateMovie } = require('../middlewares/validation');

const { getUserMovies, createdMovie, deleteMovie } = require('../controllers/movies');

router.get('/', getUserMovies);
router.post('/', validateMovie, createdMovie);
router.delete('/:movieId', validateMovieId, deleteMovie);

module.exports = router;

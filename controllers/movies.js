const Movie = require('../models/movie');
const NotFoundError = require('../errors/NotFoundError');
const ForbiddenError = require('../errors/ForbiddenError');
const { messageDeletedMovie, messageUnknowMoveeId, messageOtherMovie } = require('../utils/constants');

const getUserMovies = (req, res, next) => {
  Movie.find({ owner: req.user._id })
    .then((data) => {
      res.send(data);
    })
    .catch(next);
};

const createdMovie = (req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailer,
    movieId,
    nameRU,
    nameEN,
    thumbnail,
  } = req.body;
  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailer,
    movieId,
    nameRU,
    nameEN,
    thumbnail,
    owner: req.user._id,
  })
    .then(() => res.send({
      country,
      director,
      duration,
      year,
      description,
      image,
      trailer,
      movieId,
      nameRU,
      nameEN,
      thumbnail,
    }))
    .catch(next);
};

const deleteMovie = (req, res, next) => {
  const owner = req.user._id;
  const { movieId } = req.params;
  Movie.findOne({ movieId, owner })
    .select('+owner')
    .then((movie) => {
      if (!movie) {
        throw new NotFoundError(messageUnknowMoveeId);
      }
      if (movie.owner.toString() !== owner) {
        throw new ForbiddenError(messageOtherMovie);
      } else {
        Movie.deleteOne({ movieId })
          .then(() => {
            res.status(200).send({ message: messageDeletedMovie });
          })
          .catch(next);
      }
    })
    .catch(next);
};

module.exports = {
  getUserMovies,
  createdMovie,
  deleteMovie,
};

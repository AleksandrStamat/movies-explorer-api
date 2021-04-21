const mongoose = require('mongoose');
const isUrl = require('validator/lib/isURL');
const { messageInvalidLink } = require('../utils/constants');

const movieSchema = new mongoose.Schema(
  {
    country: {
      type: String,
      required: [true, 'Поле "country" обязательно для заполнения.'],
    },
    director: {
      type: String,
      required: [true, 'Поле "director" обязательно для заполнения.'],
    },
    duration: {
      type: Number,
      required: [true, 'Поле "duration" обязательно для заполнения.'],
    },
    year: {
      type: String,
      required: [true, 'Поле "year" обязательно для заполнения.'],
    },
    description: {
      type: String,
      required: [true, 'Поле "description" обязательно для заполнения.'],
    },
    image: {
      type: String,
      required: [true, 'Поле "image" обязательно для заполнения.'],
      validate: {
        validator: (v) => isUrl(v),
        message: messageInvalidLink,
      },
    },
    trailer: {
      type: String,
      required: [true, 'Поле "trailer" обязательно для заполнения.'],
      validate: {
        validator: (v) => isUrl(v),
        message: messageInvalidLink,
      },
    },
    thumbnail: {
      type: String,
      required: [true, 'Поле "thumbnail" обязательно для заполнения.'],
      validate: {
        validator: (v) => isUrl(v),
        message: messageInvalidLink,
      },
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
      select: false,
    },
    movieId: {
      type: Number,
      required: [true, 'Поле "movieId" обязательно для заполнения.'],
    },
    nameRU: {
      type: String,
      required: [true, 'Поле "nameRU" обязательно для заполнения.'],
    },
    nameEN: {
      type: String,
      required: [true, 'Поле "nameEN" обязательно для заполнения.'],
    },
  },
  { versionKey: false },
);

module.exports = mongoose.model('movie', movieSchema);

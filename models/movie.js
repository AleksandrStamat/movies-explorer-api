const mongoose = require('mongoose');
const isUrl = require('validator/lib/isURL');
const {
  messageInvalidLink,
  messageCountryRequired,
  messageDirectorRequired,
  messageDurationRequired,
  messageYearRequired,
  messageDescriptionRequired,
  messageImageRequired,
  messageTrailerRequired,
  messageThumbnailRequired,
  messageMovieIdRequired,
  messageNameRuRequired,
  messageNameEnRequired,
} = require('../utils/constants');

const movieSchema = new mongoose.Schema(
  {
    country: {
      type: String,
      required: [true, messageCountryRequired],
    },
    director: {
      type: String,
      required: [true, messageDirectorRequired],
    },
    duration: {
      type: Number,
      required: [true, messageDurationRequired],
    },
    year: {
      type: String,
      required: [true, messageYearRequired],
    },
    description: {
      type: String,
      required: [true, messageDescriptionRequired],
    },
    image: {
      type: String,
      required: [true, messageImageRequired],
      validate: {
        validator: (v) => isUrl(v),
        message: messageInvalidLink,
      },
    },
    trailer: {
      type: String,
      required: [true, messageTrailerRequired],
      validate: {
        validator: (v) => isUrl(v),
        message: messageInvalidLink,
      },
    },
    thumbnail: {
      type: String,
      required: [true, messageThumbnailRequired],
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
      required: [true, messageMovieIdRequired],
    },
    nameRU: {
      type: String,
      required: [true, messageNameRuRequired],
    },
    nameEN: {
      type: String,
      required: [true, messageNameEnRequired],
    },
  },
  { versionKey: false },
);

module.exports = mongoose.model('movie', movieSchema);

const { celebrate, Joi } = require('celebrate');
const { ObjectId } = require('mongoose').Types;
const isURL = require('validator/lib/isURL');
const {
  messageNameRequired,
  messageEmailRequired,
  messagePasswordRequired,
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
  messageInvalidEmail,
  messageInvalidId,
  messageMinLenghtName,
  messageMaxLenghtName,
  messageMinLenghtPassword,
  messageImageUrl,
  messageTrailerUrl,
  messageThumbnailUrl,
} = require('../utils/constants');

const validateUserCreate = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30)
      .messages({
        'any.required': messageNameRequired,
        'string.min': messageMinLenghtName,
        'string.max': messageMaxLenghtName,
      }),
    password: Joi.string().required().min(8).messages({
      'any.required': messagePasswordRequired,
      'string.min': messageMinLenghtPassword,
    }),
    email: Joi.string().required().email().messages({
      'any.required': messageEmailRequired,
      'string.email': messageInvalidEmail,
    }),
  }),
});

const validateUserUpdate = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required().messages({
      'string.min': messageMinLenghtName,
      'string.max': messageMaxLenghtName,
    }),
    email: Joi.string().email().required().messages({
      'string.email': messageInvalidEmail,
    }),
  }),
});

const validateAuthentication = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email().messages({
      'any.required': messageEmailRequired,
      'string.email': messageInvalidEmail,
    }),
    password: Joi.string().required().min(8).messages({
      'any.required': messagePasswordRequired,
      'string.min': messageMinLenghtPassword,
    }),
  }),
});

const validateMovieId = celebrate({
  params: Joi.object().keys({
    movieId: Joi.string().required().custom((value, helpers) => {
      if (ObjectId.isValid(value)) {
        return value;
      }
      return helpers.message(messageInvalidId);
    }),
  }),
});

const validateMovie = celebrate({
  body: Joi.object().keys({
    country: Joi.string().required().messages({
      'any.required': messageCountryRequired,
    }),
    director: Joi.string().required().messages({
      'any.required': messageDirectorRequired,
    }),
    duration: Joi.number().required().messages({
      'any.required': messageDurationRequired,
    }),
    year: Joi.string().required().messages({
      'any.required': messageYearRequired,
    }),
    description: Joi.string().required().messages({
      'any.required': messageDescriptionRequired,
    }),
    image: Joi.string()
      .required()
      .custom((value, helpers) => {
        if (isURL(value)) {
          return value;
        }
        return helpers.message(messageImageUrl);
      })
      .messages({
        'any.required': messageImageRequired,
      }),
    trailer: Joi.string()
      .required()
      .custom((value, helpers) => {
        if (isURL(value)) {
          return value;
        }
        return helpers.message(messageTrailerUrl);
      })
      .messages({
        'any.required': messageTrailerRequired,
      }),
    thumbnail: Joi.string()
      .required()
      .custom((value, helpers) => {
        if (isURL(value)) {
          return value;
        }
        return helpers.message(messageThumbnailUrl);
      })
      .messages({
        'any.required': messageThumbnailRequired,
      }),
    movieId: Joi.number().required().messages({
      'any.required': messageMovieIdRequired,
    }),
    nameRU: Joi.string().required().messages({
      'any.required': messageNameRuRequired,
    }),
    nameEN: Joi.string().required().messages({
      'any.required': messageNameEnRequired,
    }),
  }),
});

module.exports = {
  validateUserCreate,
  validateUserUpdate,
  validateAuthentication,
  validateMovie,
  validateMovieId,
};

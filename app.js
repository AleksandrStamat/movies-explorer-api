require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const cors = require('cors');
const { errors } = require('celebrate');
const rateLimiter = require('./middlewares/rateLimit');
const routes = require('./routes');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { urlDB } = require('./utils/config');
const { messageError } = require('./utils/constants');

const { PORT = 3000, NODE_ENV, MONGO_URL } = process.env;
const app = express();

mongoose
  .connect(NODE_ENV === 'production' ? MONGO_URL : urlDB, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    autoIndex: true,
  })
  .then(() => console.log('Connected to MoviesExplorerDB'));

app.use(requestLogger);
app.use(rateLimiter);
app.use(helmet());
app.use(cors({ origin: true }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(routes);
app.use(errorLogger);
app.use(errors());
app.use((err, req, res, next) => {
  if (err.status) {
    res.status(err.status).send(err.message);
    return;
  }
  res.status(500).send({ message: messageError });
  next();
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});

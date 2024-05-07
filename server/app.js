const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');

const titleRouter = require('./routes/titleRoutes');
const userRouter = require('./routes/userRoutes');
const ratingRouter = require('./routes/ratingRoutes');

const app = express();
mongoose.set('strictQuery', false);

// MIDDLEWARES
app.use(morgan('dev'));
app.use(express.json());
app.use(express.static(`${__dirname}/public`));

// ROUTES
app.use('/api/v1/titles', titleRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/rating', ratingRouter);

module.exports = app;
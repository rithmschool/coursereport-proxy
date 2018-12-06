/** Express app for proxy-server. */

const express = require('express');
const app = express();
const cors = require('cors');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// const schoolRouter = require('./routes/schools');
const blogRoutes = require('./routes/blogs');
const contactRouter = require('./routes/contact');

// add logging system

const morgan = require('morgan');
app.use(morgan('tiny'));

app.use(cors());

// schoolRouter.use('/:id/contact', contactRouter)
// app.use('/schools', schoolRoutes);
// app.use('/contact',contactRouter)
app.use('/blog', blogRoutes);

/** 404 handler */

app.use(function(req, res, next) {
  const err = new Error('Not Found');
  err.status = 404;

  // pass the error to the next piece of middleware
  return next(err);
});

/** general error handler */

app.use(function(err, req, res, next) {
  res.status(err.status || 500);

  return res.json({
    error: err,
    message: err.message
  });
});

module.exports = app;

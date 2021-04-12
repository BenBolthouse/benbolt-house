const { httpLogger } = require('./log');
const express = require('express');
const expressHbs = require('express-handlebars');
const favicon = require('serve-favicon');
const livereload = require('livereload').createServer();
const connectLivereload = require('connect-livereload');
const path = require('path');
const Prismic = require('prismic-javascript');
const prismicConfig = require('./config/prismic');

// application routes imports
const routes = require('./routes');

const app = express();

livereload.watch(path.join(__dirname, 'views'));

// middleware configures express to use prismic cms repo
app.use((req, res, next) => {
  res.locals.ctx = {
    endpoint: prismicConfig.apiEndpoint,
    linkResolver: prismicConfig.linkResolver,
  };
  // prettier-ignore
  Prismic.api(prismicConfig.apiEndpoint, {
    accessToken: prismicConfig.accessToken,
    req,
  })
    .then((api) => {
      req.prismic = { api };
      next();
    })
    .catch(error => next(error.message));
});

// for development: live reload on changes to views directory
livereload.server.once('connection', () => {
  setTimeout(() => {
    livereload.refresh('/');
  }, 100);
});

app.engine('handlebars', expressHbs());
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'static')));
app.use(favicon(path.join(__dirname, 'static', 'favicon.ico')));
app.use(connectLivereload());
app.use(httpLogger);

// application routes
app.use('/', routes);

module.exports = app;

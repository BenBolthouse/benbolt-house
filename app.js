const { httpLogger } = require('./log');
const express = require('express');
const expressHbs = require('express-handlebars');
const favicon = require('serve-favicon');
const path = require('path');
const Prismic = require('prismic-javascript');
const prismicConfig = require('./config/prismic');

// application routes imports
const routes = require('./routes');

const app = express();

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

app.engine('handlebars', expressHbs());
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(httpLogger);

// application routes
app.use('/', routes);

module.exports = app;

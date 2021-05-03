const { httpLogger } = require('./log');
const config = require('./config');
const connectLivereload = require('connect-livereload');
const cookieParser = require('cookie-parser');
const csurf = require('csurf');
const express = require('express');
const expressHbs = require('express-handlebars');
const favicon = require('serve-favicon');
const livereload = require('livereload').createServer();
const path = require('path');
const Prismic = require('prismic-javascript');
const prismicConfig = require('./config/prismic');

// connect to google api
require('./config/google');

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

// get correct static directory per environment
const staticDir = config.production ? 'dist' : 'src';

app.engine(
  'hbs',
  expressHbs({
    layoutsDir: path.join(__dirname, 'views', 'layout'),
    partialsDir: path.join(__dirname, 'views', 'partials'),
    defaultLayout: 'main',
    extname: '.hbs',
  }),
);
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));
app.use(connectLivereload());
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(csurf({ cookie: true }));
app.use(express.static(path.join(__dirname, staticDir)));
app.use(favicon(path.join(__dirname, staticDir, 'favicon.ico')));
app.use(httpLogger);

// application routes
app.use('/', routes);

module.exports = app;

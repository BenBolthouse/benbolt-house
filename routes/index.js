const router = require('express').Router();

const data = require('../data');
const Page = require('../models/Page');

/**
 * GET: "/" --> Return home page of the website
 */
router.get('/', (_req, res, _next) => {
  const page = new Page('home', data.home);
  res.render(page.view, { ...page.config });
});

module.exports = router;

const Page = require('../pages/Page');

const router = require('express').Router();

/**
 * GET: "/" --> Return home page of the website
 */
router.get('/', (_req, res, _next) => {
  const page = new Page('home', {
    title: 'Ben Bolthouse',
    description: 'Welcome to my website where I share my projects and ideas. Grab some coffee and come hang out!',
    keywords: ['Software Engineer', 'Node', 'Express'],
  });
  res.render(page.view, { ...page.config });
});

module.exports = router;

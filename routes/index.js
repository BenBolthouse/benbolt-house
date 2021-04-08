const router = require('express').Router();

router.get('/', (_req, res, _next) => {
  res.render('home');
});

module.exports = router;

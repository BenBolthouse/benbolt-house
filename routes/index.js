const { google } = require('googleapis');
const { googleSheetId } = require('../config');
const { jwtClient } = require('../config/google');
const { home } = require('../data');
const csurf = require('csurf')({ cookie: true });
const Page = require('../lib/Page');
const router = require('express').Router();

// configure for google sheets
const sheets = google.sheets({
  version: 'v4',
});

router.get('/', csurf, (req, res, _next) => {
  const csrf = req.csrfToken();
  const page = new Page('home', home);
  res.render(page.view, { ...page.config, csrf });
});

router.post('/', csurf, async (req, res, next) => {
  // prettier-ignore
  const {
    email,
    phone,
    name,
    body,
  } = req.body;
  const spreadsheet = sheets.spreadsheets.values.get(
    {
      spreadsheetId: googleSheetId,
      auth: jwtClient,
      range: 'contacts',
    },
    (err, response) => {
      if (err) {
        return next(err);
      }
      const { values } = response.data;
      const id = parseInt(values[values.length - 1][0], 10) + 1;
      return true;
    },
  );
  return res.redirect('/');
});

module.exports = router;

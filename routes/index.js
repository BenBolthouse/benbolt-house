const { google } = require('googleapis');
const { googleSheetId } = require('../config');
const { jwtClient } = require('../config/google');
const csurf = require('csurf')({ cookie: true });
const home = require('../data/home.json');
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
  const params = {
    spreadsheetId: googleSheetId,
    auth: jwtClient,
    range: 'contacts',
  };
  const get = cb =>
    sheets.spreadsheets.values.get(params).then(
      (result) => {
        cb(result.data.values);
      },
      err => next(err),
    );
  const update = values =>
    sheets.spreadsheets.values
      .update({
        ...params,
        valueInputOption: 'USER_ENTERED',
        resource: {
          values: [...values, ['XXX', email, phone, name, body]],
        },
      })
      .then(
        result => true,
        err => next(err),
      );
  get(update);
});

module.exports = router;

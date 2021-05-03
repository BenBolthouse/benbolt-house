const { google } = require('googleapis');
const { googleSheetId } = require('../config');
const { jwtClient } = require('../config/google');
const asyncHandler = require('express-async-handler');
const home = require('../data/home.json');
const Page = require('../lib/Page');
const router = require('express').Router();

// Following line is required by googleapis to initialize access to
// spreadsheets.
const sheets = google.sheets({ version: 'v4' });

// GET https://benbolt.house/
// Renders and sends the home view for the website.
router.get('/', (req, res, _next) => {
  const csrf = req.csrfToken();
  const page = new Page('home', home);
  res.render(page.view, { ...page.config, csrf });
});

// POST https://benbolt.house/api/v1/contact
// Accepts AJAX post request with contact form data and persists to an
// external store.
router.post('/api/v1/contact', asyncHandler(async (req, res, next) => {
  const params = {
    spreadsheetId: googleSheetId,
    auth: jwtClient,
    range: 'contacts',
  };
  const cells = [
    req.body.email,
    req.body.phone,
    req.body.name,
    req.body.body,
  ];
  const spreadsheet = await sheets.spreadsheets.values.get(params);
  const response = await sheets.spreadsheets.values.update({
    ...params,
    valueInputOption: 'USER_ENTERED',
    resource: {
      values: [...spreadsheet.data.values, [new Date().toISOString(), ...cells]],
    },
  });
  if (response.status === 200) {
    res.status(200).json({ message: 'Success' });
  }
  res.status(400).json({ message: 'Error' });
}));

module.exports = router;

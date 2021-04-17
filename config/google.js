const { google } = require('googleapis');
const { googleServiceAccountKey, googleServiceAccountEmail } = require('.');

const jwtClient = new google.auth.JWT(
  googleServiceAccountEmail,
  null,
  googleServiceAccountKey.replace(/\\n/g, '\n'),
  ['https://www.googleapis.com/auth/spreadsheets'],
);

jwtClient.authorize((err, tokens) => {
  if (err) throw new Error(err);
  return tokens;
});

module.exports = { jwtClient };

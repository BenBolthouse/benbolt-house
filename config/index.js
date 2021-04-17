module.exports = {
  googleApiKey: process.env.GOOGLE_API_KEY,
  googleServiceAccountKey: process.env.GOOGLE_SERVICE_ACCOUNT_KEY,
  googleServiceAccountEmail: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
  googleSheetId: process.env.GOOGLE_SHEET_ID,
  port: process.env.PORT,
  prismicApiToken: process.env.PRISMIC_API_TOKEN,
  prismicClientId: process.env.PRISMIC_CLIENT_ID,
  prismicClientSecret: process.env.PRISMIC_CLIENT_SECRET,
  production: process.env.ENVIRONMENT === 'production',
  secret: process.env.SECRET,
};

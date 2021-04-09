module.exports = {
  port: process.env.PORT,
  prismicApiToken: process.env.PRISMIC_API_TOKEN,
  prismicClientId: process.env.PRISMIC_CLIENT_ID,
  prismicClientSecret: process.env.PRISMIC_CLIENT_SECRET,
  production: process.env.ENVIRONMENT === 'production',
};

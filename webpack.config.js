const path = require('path');

module.exports = {
  entry: './src',
  output: {
    filename: 'bundle.min.js',
    path: path.resolve(__dirname, 'dist', 'js'),
  },
};

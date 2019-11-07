const path = require('path');
const htmlWebPackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
      { test: /\.css$/, use: ['style-loader', 'css-loader'] },
    ]
  },
  output: {
    path: path.join(__dirname, '/dist'),
    filename: 'index_bundle.js'
  },
  plugins: [
    new htmlWebPackPlugin({
      template: './src/index.html'
    })
  ]
};

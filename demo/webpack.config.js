const path = require('path')

module.exports = {
  mode: 'none',
  entry: './src/a.js',
  output: {
    filename: 'a.js',
    path: path.resolve(__dirname, 'build')
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: 'babel-loader',
      }
    ]
  }
}
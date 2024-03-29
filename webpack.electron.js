const path = require('path');

module.exports = {
  // Build Mode
  mode: 'production',
  // Electron Entrypoint
  entry: './src/main.ts',
  target: 'electron-main',
  devtool: "source-map",
  resolve: {
    alias: {
      ['@']: path.resolve(__dirname, 'src')
    },
    extensions: ['.tsx', '.ts', '.js'],
  },
  module: {
    rules: [{
      test: /\.ts$/,
      include: /src/,
      use: [{ loader: 'ts-loader' }]
    },
    {
      test: /\.css$/i,
      use: [
        'css-loader',
      ],
    }]
  },
  output: {
    path: __dirname + '/dist',
    filename: 'main.js'
  }
}
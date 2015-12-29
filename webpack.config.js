module.exports = {
  entry: './client.js',
  output: {
    filename: 'public/bundle.js',
  },
  module: {
    loaders: [{
      exclude: /(node_modules|app-server.js)/,
      loader: 'babel-loader',
      query: {
        presets: ['es2015', 'react'],
      },
    }],
  },
};

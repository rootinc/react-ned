module.exports = {
  entry: [
    __dirname + '/src/NedDictionary.js',
    __dirname + '/src/Ned.js',
  ],
  output: {
    path: __dirname + '/build',
    filename: 'index.js'
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          cacheDirectory: true,
          presets: ["es2015", "stage-0", "react"],
          plugins: ["transform-es2015-arrow-functions"]
        }
      }
    ]
  }
}
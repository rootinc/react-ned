var NedDictionaryConfig = {
  entry: __dirname + '/src/NedDictionary.js',
  output: {
    path: __dirname + '/dist',
    filename: 'NedDictionary.js'
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

var NedConfig = {
  entry: __dirname + '/src/Ned.js',
  output: {
    path: __dirname + '/dist',
    filename: 'Ned.js'
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

module.exports = [
  NedDictionaryConfig,
  NedConfig
];
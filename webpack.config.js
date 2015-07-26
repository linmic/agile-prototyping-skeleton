/* eslint-disable */

var webpack = require('webpack');
var path = require('path');
var autoprefixer = require('autoprefixer-core');
var cssnext = require('cssnext');
var doiuse = require('doiuse');
var colors = require('colors');
var wordwrap = require('wordwrap')
var csswring = require('csswring');
var nested = require('postcss-nested');
// add your own mixins here
var mixins = require('postcss-mixins')({
  mixinsDir: path.join(__dirname, 'src/css/mixins/')
});
var simple_extend = require('postcss-simple-extend');
var assets  = require('postcss-assets');

module.exports = {
  entry: {
    app: ['./src/js/app.js']
  },
  output: {
    path: require('path').resolve('build'),
    publicPath: '/',
    filename: 'bundle.js'
  },
  resolve: {
    extensions: ['', '.js', '.coffee'],
    // by default, webpack will search in `web_modules` and `node_modules`. Because we're using
    // Bower, we want it to look in there too
    modulesDirectories: [ 'node_modules', 'bower_components' ]
  },
  module: {
    loaders: [
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader!cssnext-loader!postcss-loader'
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      }
    ]
  },
  // disable css compression to avoid a known bug of postcss-convert-values
  cssnext: {
    compress: false
  },
  // devServer: {
    // contentBase: "./build",
    // hot: true,
    // inline: true
  // },
  postcss: [
    simple_extend, // use this before "nested"
    mixins,
    nested,
    cssnext,
    // doiuse({
      // onFeatureUsage: function(info) {
        // var source = info.usage.source;
        // // file is whole require path, joined with !'s.. we want the last part
        // var sourceFile = path.relative('.', source.input.file.split('!').pop())
        // var sourceLine = sourceFile + ':' + source.start.line;
        // // take out location info in message itself
        // var message = info.message.split(': ').slice(1).join(': ')
        // console.log('[doiuse]'.red + ' ' + sourceLine + ': ' + info.featureData.title + '\n');
        // console.log(wordwrap(4, process.stdout.columns - 1)(message) + '\n');
      // }
    // }),
    autoprefixer,
    csswring,
    assets({
     loadPaths: ['images/', '/vr/images/']
    })
  ],
  plugins: [
    // add this back if in production
    // new webpack.optimize.UglifyJsPlugin({
      // compress: {
        // warnings: false
      // }
    // }),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery'
    })
  ]
};

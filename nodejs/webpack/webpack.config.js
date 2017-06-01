
const webpack = require('webpack');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  // devtool: 'source-map',
  // devtool: 'cheap-module-source-map',
  devtool: "eval-source-map",  
  // devtool: 'cheap-module-eval-source-map',

  entry: __dirname + "/app/main.js",

  output: {
    path: __dirname + "/public",
    filename: "[name].bundle.js"
  },
  
  module: {
    rules: [
      { 
        test: /\.json$/,
        use: [
          {
            loader: 'json-loader'
          }
        ]
      },
      {
        test: /\.js$/, 
        exclude: /node_modules/, 
        use: [
          {
            loader: 'babel-loader'
          }
        ]
      }, 
      {
        test: /\.css$/, 
        // use: ExtractTextPlugin.extract({
          use: [
            {
              loader: 'style-loader'
            },
            {
              loader: 'css-loader?modules'
              // loader: 'css-loader?importLoaders=1'
            },
            {
              loader: 'postcss-loader',
              //配置参数;
              options: {
                plugins: function() {
                  return [
                      require('autoprefixer')()
                  ];
                }
              }
            },
          ]
        // })
      }
    ]
  },

  plugins: [
    // new webpack.optimize.CommonsChunkPlugin({
    //   name: "commons",
    //   filename: "commons.js",
    //   minChunks: 2,
    // }), 
    
    // new ExtractTextPlugin({
    //   filename : './styles.css'
    // }),

    // new HtmlWebpackPlugin(),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: __dirname + '/app/index.html',
      minify: {
        minifyCSS: true, 
        // collapseWhitespace: true,
      }
    }), 

    //webpack内置js压缩插件;
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    })
  ],

  devServer: {
    contentBase: './public',
    historyApiFallback: true,
    inline: true
  }
}


const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  entry: "./src/index.js",

  output: {
    path: __dirname + '/build',    
    filename: 'js/build.js'
  },

  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      },
      {
        test: /\.(sass|scss|css)$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader']
      },
      {
        test: /\.(png|jpe?g|gif|svg|eot|ttf|woff|woff2)$/,
        loaders: [
          {
            loader: 'file-loader',
            options: {
              outputPath: 'img/',
              name: '[name].[ext]',
              publicPath: '../img'
            }
          }
        ]
      }
    ]
  },    
  
  resolve: {
    extensions: ['*', '.js', '.jsx']
  },

  devServer: {
    historyApiFallback: true,
    contentBase: './public',
    hot: true,
    port: 3000,
  },

  plugins: [  
    new CleanWebpackPlugin(),

    new MiniCssExtractPlugin({
      filename: 'style/build.css'
    }),  
    
    new HtmlWebpackPlugin({
      template: __dirname + '/public/index.html',
      inject: 'head',
      scriptLoading: 'defer'      
    })
  ],
};
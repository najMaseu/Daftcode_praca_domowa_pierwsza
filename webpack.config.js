const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin")
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const isProduction = (process.env.NODE_ENV === 'production');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: "main.js",
    path: path.resolve(__dirname, "dist")
  },
  plugins: [new HtmlWebpackPlugin(
    {
      template: 'src/index.html'
    }
  ),
    new MiniCssExtractPlugin({
      filename: "[name].css",
      chunkFilename: "[id].css"
    }),
    new CleanWebpackPlugin()
  ],
  module: {
    rules: [{
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      },
      {
        test: /.(png|jpg)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: '[name].[ext]',
              outputPath: 'img/',
              //publicPath: 'img/'
            }
          }
        ]
      },
      {
        test: /\.html$/,
        use: ['html-loader']
      },

      {
        test: /\.s(a|c)ss$/,
        use: [
          isProduction ?
          MiniCssExtractPlugin.loader : {
            loader: 'style-loader',
            options: {
              sourceMap: true
            }
          },
          {
            loader: 'css-loader',
            options: {
              sourceMap: isProduction
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: isProduction
            }
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: isProduction
            }
          }
        ]
      }
    ]
  }
};

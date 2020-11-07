const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

function config({mode}) {
  return {
    context: path.resolve(__dirname, './src'),
    entry: './index.js',
    output: {
      filename: 'bundle.[hash].js',
      path: path.resolve(__dirname, './dist')
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: './index.html'
      }),
      new CleanWebpackPlugin(),
      new MiniCssExtractPlugin({
        filename: 'bundle.[hash].css'
      })
    ],
    module: {
      rules: [
        {
          test: /\.m?js$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
            options: {
              presets: ['@babel/preset-env', '@babel/preset-react']
            }
          }
        },
        {
          test: /\.s[ac]ss$/,
          use: [
            MiniCssExtractPlugin.loader,
            'css-loader',
            'sass-loader'
          ]
        }
      ]
    }
  }
}

module.exports = (env, argv) => {
  if (argv.mode === 'production') {
    return config({
      mode: 'production'
    })
  }
  return config({
    mode: 'development'
  })
}

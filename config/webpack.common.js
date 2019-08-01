const path = require('path');
const webpack = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = (context) => {

  const { mode, config } = context;

  const framePath = path.resolve(__dirname, '..', 'src');
  const appPath = path.resolve(process.cwd(), 'src');

  return {
    mode,
    entry: {
      frame: mode === 'development' ? [
        'webpack-hot-middleware/client?noInfo=true&reload=true',    // 添加webpack-hot-middleware入口
        path.resolve(__dirname, '../src/index.tsx')
      ] : [
        path.resolve(__dirname, '../src/index.tsx')
      ]
    },
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(process.cwd(), 'dist'),
      publicPath: '/',
    },
    resolve: {
      extensions: [ '.tsx', '.jsx', '.ts', '.js' ],
      modules: [
        'node_modules',
        path.resolve(__dirname, '..', 'node_modules') // 使用框架中的module
      ]
    },
    resolveLoader: {
      modules: [
        'node_modules',
        path.resolve(__dirname, '..', 'node_modules') // 使用框架中的loader
      ]
    },
    module: {
      rules: [
        {
          test: /\.js(x?)$/,
          use: [
            { loader: 'babel-loader' }
          ],
          include: [framePath, appPath]
        },
        {
          test: /\.ts(x?)$/,
          use: [
            { loader: 'babel-loader' },
            { loader: 'ts-loader' }
          ],
          include: [framePath, appPath]
        },
        {
          test: /\.(less|css)$/,
          use: [
            { loader: 'style-loader' },
            { loader: 'css-loader' },
            { loader: 'postcss-loader' },
            { loader: 'less-loader' }
          ],
          include: [framePath, appPath]
        },
        {
          test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
          use: [
            {
              loader: 'url-loader',
              options: { limit: 8192 }
            },
            {
              loader: 'image-webpack-loader',
              options: { bypassOnDebug: true }
            }
          ],
          include: [framePath, appPath]
        },
        {
          test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
          use: {
            loader: 'url-loader',
            options: { limit: 8192 }
          },
          include: [framePath, appPath]
        }
      ]
    },
    plugins: [
      new CleanWebpackPlugin(),
      new HtmlWebpackPlugin({
        templateParameters: {
          title: config.title,
        },
        template: path.resolve(__dirname, '../src/index.html'),
        minify: {
          collapseWhitespace: true
        }
      }),
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify(mode)
      })
    ]
  };
};
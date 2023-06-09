const path = require('path');
const webpack = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = (context) => {

  const { mode, config } = context;

  const { appPath, framePath } = config;

  // 模板路径
  const weePath = path.resolve(appPath, '.wee');

  // 用户源码路径
  const srcPath = path.resolve(appPath, 'src');

  // 用户页面路径
  const pagesPath = path.resolve(srcPath, 'pages');

  // 用户布局路径
  const layoutsPath = path.resolve(srcPath, 'layouts');

  const include = [weePath, srcPath];

  return {
    mode,
    entry: {
      frame: mode === 'development' ? [
        'webpack-hot-middleware/client?noInfo=true&reload=true',    // 添加webpack-hot-middleware入口
        path.resolve(weePath, 'entry.tsx')
      ] : [
        path.resolve(weePath, 'entry.tsx')
      ]
    },
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(process.cwd(), 'dist'),
      publicPath: '/',
    },
    resolve: {
      extensions: [ '.tsx', '.jsx', '.ts', '.js' ],
      alias: {
        '@app': appPath,
        '@pages': pagesPath,
        '@layouts': layoutsPath,
      },
      modules: [
        'node_modules',
        path.resolve(framePath, 'node_modules') // 使用框架中的module
      ]
    },
    resolveLoader: {
      modules: [
        'node_modules',
        path.resolve(framePath, 'node_modules') // 使用框架中的loader
      ]
    },
    module: {
      rules: [
        {
          test: /\.js(x?)$/,
          use: [
            { loader: 'babel-loader' }
          ],
          include,
        },
        {
          test: /\.ts(x?)$/,
          use: [
            { loader: 'babel-loader' },
            {
              loader: 'ts-loader',
              options: {
                // 指定TS配置
                configFile: path.resolve(weePath, 'tsconfig.json'),
              },
            }
          ],
          include,
        },
        {
          test: /\.(less|css)$/,
          use: [
            { loader: 'style-loader' },
            { loader: 'css-loader' },
            { loader: 'postcss-loader' },
            { loader: 'less-loader' }
          ],
          include,
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
          include,
        },
        {
          test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
          use: {
            loader: 'url-loader',
            options: { limit: 8192 }
          },
          include,
        }
      ]
    },
    plugins: [
      new CleanWebpackPlugin(),
      new HtmlWebpackPlugin({
        templateParameters: {
          title: config.title,
        },
        template: path.resolve(weePath, 'public', 'index.html'),
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
const path = require('path');
const webpack = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');


module.exports = (context) => {

  const { mode, config } = context;

  const { appPath } = config;

  // 模板路径
  const weePath = path.resolve(appPath, '.wee');

  // 用户源码路径
  const srcPath = path.resolve(appPath, 'src');

  // 用户页面路径
  const pagesPath = path.resolve(srcPath, 'pages');

  // 用户布局路径
  const layoutsPath = path.resolve(srcPath, 'layouts');

  // 解析文件的范围
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
      path: path.resolve(appPath, 'dist'),
      publicPath: '/',
    },
    resolve: {
      extensions: [ '.tsx', '.jsx', '.md', '.ts', '.js', '.less', '.css' ],
      alias: {
        '@app': appPath,
        '@pages': pagesPath,
        '@layouts': layoutsPath,
      },
      modules: [
        'node_modules',
      ]
    },
    resolveLoader: {
      modules: [
        'node_modules',
        path.resolve(__dirname, 'loaders'),
      ]
    },
    module: {
      rules: [
        {
          test: /\.js(x?)$/,
          use: [
            {
              loader: 'babel-loader',
              options: {
                presets: ['@babel/preset-env', '@babel/preset-react'],
                plugins: []
              }
            }
          ],
          include,
        },
        {
          test: /\.ts(x?)$/,
          use: [
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
          test: /\.md$/,
          use: [
            {
              loader: 'babel-loader',
              options: {
                presets: ['@babel/preset-env', '@babel/preset-react'],
                plugins: []
              }
            },
            { loader: 'md-loader' },
          ],
          include,
        },
        {
          test: /\.less$/,
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
        },
        // 由于tailwind与less有冲突，所以分开处理
        {
          test: /\.css$/,
          use: [
            { loader: 'style-loader' },
            { loader: 'css-loader' },
            { loader: 'postcss-loader' }
          ],
          include: include.concat([path.resolve('node_modules')]),
        },
      ]
    },
    plugins: [
      ...(mode === 'development' ? [new CleanWebpackPlugin()] : []),
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
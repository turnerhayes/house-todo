const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const devPlugins = [
  {
    test: /\.js$/,
    use: 'source-map-loader',
    enforce: 'pre',
  },
];

const config = (env, argv) => {
  // Cypress doesn't pass argv
  argv = argv || {};
  const production = (env && env.production) || argv.mode === 'production';

  return {
    entry: [
      './src/index.tsx'
    ],
    output: {
      path: path.resolve(__dirname, 'dist'),

      // Cannot use 'contenthash' when hot reloading is enabled.
      filename: argv.hot ? '[name].[fullhash].js' : '[name].[contenthash].js',

      publicPath: '/',
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          use: 'babel-loader',
          exclude: /node_modules/
        },
        {
          test: /\.css$/,
          use: [
            MiniCssExtractPlugin.loader,
            {
              loader: 'css-loader',
              options: {
                importLoaders: 1
              }
            },
            'postcss-loader'
          ]
        },
        {
          test: /\.ts(x)?$/,
          loader: 'ts-loader',
          exclude: /node_modules/
        },
        {
          test: /\.scss$/,
          use: [
            MiniCssExtractPlugin.loader,
            'css-loader',
            'sass-loader'
          ]
        },
        {
          test: /\.svg$/,
          use: 'file-loader'
        },
        {
          test: /\.png$/,
          use: [
            {
              loader: 'url-loader',
              options: {
                mimetype: 'image/png'
              }
            }
          ]
        },
        ...(production ? [] : devPlugins),
      ],
    },
    devServer: {
      'static': {
        directory: './dist'
      }
    },
    plugins: [
      new HtmlWebpackPlugin({
        templateContent: ({ htmlWebpackPlugin }) => '<!DOCTYPE html><html><head><meta charset=\"utf-8\"><title>' + htmlWebpackPlugin.options.title + '</title></head><body><div id=\"app\"></div></body></html>',
        filename: 'index.html',
      }),
      new BundleAnalyzerPlugin({
        analyzerMode: 'static',
        openAnalyzer: false,
      }),
      new MiniCssExtractPlugin()
    ],
    resolve: {
      extensions: [
        '.tsx',
        '.ts',
        '.js'
      ],
      alias: {
      }
    },
    optimization: {
      runtimeChunk: 'single',
      splitChunks: {
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendors',
            chunks: 'all'
          }
        }
      }
    },
    devtool: 'eval-source-map',
  };
};

module.exports = config;

//loader  下载 使用（配置）
//plugins 下载 引入 使用（配置）
const { resolve } = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
process.env.NODE_ENV = 'development'
module.exports = {
  entry: './src/index.js',
  output: {
    //输出文件名
    filename: 'main.js',
    path: resolve(__dirname, 'build'),
    assetModuleFilename: 'assets/imgs/[hash:2][ext]',
  },
  target: 'web',
  //loader配置
  module: {
    rules: [
      //详细配置
      {
        //配饰那些文件
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [require('postcss-preset-env')()],
              },
            },
          },
        ],
      },
      {
        //配饰less文件
        test: /\.less$/,
        use: [
          //插入头部style 样式字符串注入
          'style-loader',
          //将样式变成样式字符串
          'css-loader',
          'less-loader',
        ],
      },
      {
        //配饰scss文件
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'sass-loader',
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [require('postcss-preset-env')()],
              },
            },
          },
        ],
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        type: 'asset/resource',
        // options: {
        //   filename: 'imgs',
        // },
      },
      {
        test: /\.html$/i,
        loader: 'html-loader',
        options: {
          esModule: false,
        },
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'eslint-loader',
        options: {
          fix: true,
        },
      },
      //   不隐藏会一直刷新 但是不知道原因  --！
      //   {
      //     test: /\.js$/,
      //     exclude: /node_modules/,
      //     loader: 'babel-loader',
      //     options: {
      //       presets: [
      //         [
      //           '@babel/preset-env',
      //           {
      //             useBuiltIns: 'usage',
      //             corejs: {
      //               version: 3,
      //             },
      //             targets: {
      //               chrome: '60',
      //               firefox: '50',
      //               ie: '8',
      //             },
      //           },
      //         ],
      //       ],
      //     },
      //   },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      //需要一个模板
      template: './src/index.html',
      minify: {
        collapseWhitespace: true,
        removeComments: true,
      },
    }),
    new MiniCssExtractPlugin({
      filename: 'assets/css/build.css',
    }),
  ],
  devtool: 'inline-source-map',
  mode: 'development',
  optimization: {
    minimizer: [new CssMinimizerPlugin()],
    minimize: true,
  },
  devServer: {
    contentBase: resolve(__dirname, 'build'),
    compress: true,
    port: 8080,
    open: true,
  },
  performance: {
    hints: 'warning',
    //入口起点的最大体积
    maxEntrypointSize: 50000000,
    //生成文件的最大体积
    maxAssetSize: 30000000,
    //只给出 js 文件的性能提示
    assetFilter: function (assetFilename) {
      return assetFilename.endsWith('.js')
    },
  },
}

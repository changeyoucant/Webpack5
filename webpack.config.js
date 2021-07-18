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
    assetModuleFilename: 'assets/[hash][ext][query]',
  },
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
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      //需要一个模板
      template: './src/index.html',
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
}

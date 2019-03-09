const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin"); // extract-text-webpack-plugin在webpack4中不好用
const config = require("./config/index.js");
const LodashModuleReplacementPlugin = require("lodash-webpack-plugin");

const HOST = process.env.HOST;
const PORT = (process.env.PORT && Number(process.env.PORT)) || 3000;
console.log(PORT);

const devMode = process.env.NODE_ENV !== "production";

module.exports = {
  // 模式
  mode: "development",
  entry: {
    // 入口文件
    app: "./src/app.js",
  },
  // 开发服务器，能实时重新加载
  devServer: {
    contentBase: path.resolve(__dirname, "dist"),
    // 开启模块热替换
    hot: devMode,
    host: HOST,
    port: 3000,
    proxy: {
      "/api": {
        target: config.SERVER_ADDRESS,
        secure: false
      }
    }
  },
  output: {
    // 所有输出文件的目标路径，必须是绝对路径
    path: path.resolve(__dirname, "dist"),
    // 输出文件名
    filename: "[name].bundle.js"
  },
  externals: {
    jquery: "jQuery",
    _: "lodash"
  },
  module: {
    rules: [
      // 使用babel-loader在webpack打包时处理js文件
      {
        test: /\.js$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
            plugins: ['lodash']
          }
        },
        include: [path.resolve(__dirname, "src")],
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          // { loader: devMode ? "style-loader" : MiniCssExtractPlugin.loader }, // 暂时不支持HMR
          { loader: MiniCssExtractPlugin.loader },
          { loader: "css-loader", options: { importLoaders: 1 } },
          {
            loader: "postcss-loader",
            options: {
              config: { path: path.resolve(__dirname, "./postcss.config.js") },
              plugins: [
                require("autoprefixer")({
                  browsers: ["last 2 versions, cover 99.5%"]
                })
              ]
            }
          },
          { loader: "sass-loader" }
        ]
      },
      {
        test: /\.html$/,
        use: [{
          loader: 'html-loader',
          options: {
            minimize: true
          }
        }],
      }
    ]
  },
  plugins: [
    // 每次构建前清理dist文件夹
    new CleanWebpackPlugin(["dist"]),

    // html-webpack-plugin插件默认生成index.html文件
    new HtmlWebpackPlugin({
      title: "spa-demo",
      template: path.join(__dirname, "./index.html"), // 模板位置
      filename: "./index.html", // 输出位置(相对于output的路径)
      hash: true, // 禁止缓存
      inject: true // 注入到body
    }),
    new MiniCssExtractPlugin({
      filename: "[name].css",
      chunkFilename: "[id].css"
    }),
    new webpack.HotModuleReplacementPlugin(),
    new LodashModuleReplacementPlugin,
  ],
};

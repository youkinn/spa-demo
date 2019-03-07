const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const webpack = require('webpack')

const HOST = process.env.HOST
const PORT = process.env.PORT && Number(process.env.PORT)

module.exports = {
    // 模式
    mode: 'development',
    entry: {
        // 入口文件
        app: './app.js'
    },
    // 开发服务器，能实时重新加载
    // devServer: {
    //     contentBase: path.join(__dirname, 'dist'),
    //     // 开启模块热替换
    //     hot: true,
    //     host: HOST,
    //     port: PORT
    // },
    plugins: [
        // 每次构建前清理dist文件夹
        new CleanWebpackPlugin(['dist']),
        // html-webpack-plugin插件默认生成index.html文件
        new HtmlWebpackPlugin({
            title: 'Output Management'
        }),
        // new webpack.HotModuleRyeplacementPlugin()
    ],
    output: {
        // 所有输出文件的目标路径，必须是绝对路径
        path: path.resolve(__dirname, 'dist'),
        // 输出文件名
        filename: '[name].bundle.js'
    },
    module: {
        rules: [
            // 使用babel-loader在webpack打包时处理js文件
            {
                test: /\.js$/,
                loader: 'babel-loader',
                include: [path.resolve(__dirname, 'src')]
            }
        ]
    }
}

const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const optimizeCss = require('optimize-css-assets-webpack-plugin');
const glob = require('glob');
const PurifyCssPlugin = require('purifycss-webpack');

const obj = {
    mode: 'production',
    entry: {
        index: './src/js/index.js'
    },
    output: {
        filename: './js/[name].js',
        path: path.resolve(__dirname, './obj')
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader
                    },
                    'css-loader'
                ]
            }

        ]
    },
    plugins:[
        new MiniCssExtractPlugin({
            filename:'./css/[name].css',
        }),
        new HtmlWebpackPlugin({
            minify:{
                removeComments:true,
                collapseWhitespace:true,
                minifyCSS:true,
                collapseBooleanAttributes: true,////是否简写boolean格式的属性如：disabled="disabled" 简写为disabled  默认false
                removeAttributeQuotes: true,////是否移除属性的引号 默认false
            },
            filename:'index.html',
            template:'./src/index.html',
            title:'快乐小二逼'
        }),
        new PurifyCssPlugin ({
            paths: glob.sync(path.join(__dirname,'./src/*.html'))
        }),
        new optimizeCss(),
    ],
    devServer:{ // 
        contentBase: "./",//本地服务器所加载的页面所在的目录
        historyApiFallback: true,//不跳转
        inline: true,//实时刷新
        port:8080,
        hot:true,
        open:true,
    },
}


    module.exports = obj;
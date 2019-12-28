const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
let obj =  {
    mode:'development', // 开发模式
    entry:{ // 入口
       index:'./src/index.js'
    },
    devServer:{ // webpack-dev-server是webpack官方提供的一个小型express服务器
        contentBase: "./",//本地服务器所加载的页面所在的目录
        historyApiFallback: true,//不跳转
        inline: true,//实时刷新
        port:8080, // 端口
        hot:true, // 热更新开启
        open: true // 使用系统默认浏览器打开网页
    },
    plugins:[
        new HtmlWebpackPlugin({
            template:'./src/index.html',
            filename:'index.html',
            title:'快乐小二逼',
            minify:{
                removeComments: true,//去除html中的注释
                collapseWhitespace: true,// 删除空白符与换行符
                collapseBooleanAttributes: true,////是否简写boolean格式的属性如：disabled="disabled" 简写为disabled  默认false
                removeAttributeQuotes: true,////是否移除属性的引号 默认false
            }
        }),  
    ],
    module:{
       rules: [
        {
            test:/\.css$/,
            use:[
                {
                    loader: 'style-loader'
                },
                {
                    loader: 'css-loader'
                },
            ],
            include:[
                path.resolve(__dirname,'./src/css/')
            ],
            exclude: [
                path.resolve(__dirname, "content")
            ],
        },
        {
            test:/\.less$/,
            use:[
                {
                    loader: 'style-loader'
                },
                {
                    loader: 'css-loader'
                },
                {
                    loader: 'less-loader'
                }
            ]
        },
       ]
    },
}

module.exports = obj;
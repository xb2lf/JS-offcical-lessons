const path = require('path');
const HtmlWebpackPlugin  = require('html-webpack-plugin');
const miniCssPlugin=require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const obj  = {
    mode:'production',
    entry:{
       index: path.resolve(__dirname,'./src/index.js')
    },
    output:{
        path:path.resolve(__dirname,'obj'),
        filename:'index.js',
    },
    module:{
        rules:[
            {
                test:/\.css$/,
                use: [{
                    loader: miniCssPlugin.loader
                }, 'css-loader'],// 'style-loader',
                //包含
                include:[
                   path.resolve(__dirname,'./src/css/') 
                ],
                //排除node_modules
                exclude: [
                    path.resolve(__dirname,'./node_modules')
                ],
                // use:[
                //     'style-loader'
                //     ,
                //     'css-loader'
                // ]
            },
            {
                test: /\.(png|jpg|gif|jpeg)$/,
                use: [
                  {
                    loader: 'file-loader',
                    
                    options: {
                        outputPath: 'images/'
                    }
                  }
                ],
                include:[
                    path.resolve(__dirname,'./src/images') 
                 ],
            }
        ]
    },
    devServer:{ // 
        contentBase: "./",//本地服务器所加载的页面所在的目录
        historyApiFallback: true,//不跳转
        inline: true,//实时刷新
        port:8080,
        hot:true,
        open:true,
    },
    plugins:[
        new HtmlWebpackPlugin({
            template:path.resolve('./src/index.html'),
            filename:path.resolve(__dirname,'obj/index.html' ),
            title:'旋风小子',
            minify:{
                removeComments: true,//去除html中的注释
                collapseWhitespace: true,// 删除空白符与换行符
                collapseBooleanAttributes: true,////是否简写boolean格式的属性如：disabled="disabled" 简写为disabled  默认false
                removeAttributeQuotes: true,////是否移除属性的引号 默认false
            }
        }),
        new miniCssPlugin({
            filename:'css/[name].css'
        }),
    ],
    optimization: {
        minimizer: [
            new TerserPlugin({
                cache: true,
                parallel: true,
                sourceMap: true, // Must be set to true if using source-maps in production
                terserOptions: {
                  // https://github.com/webpack-contrib/terser-webpack-plugin#terseroptions
                }
              }),
            new OptimizeCSSAssetsPlugin({})
        ]
    }
}

//导出配置项
module.exports = obj;
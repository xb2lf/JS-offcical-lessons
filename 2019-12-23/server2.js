const http = require('http'), // 引入模块，模块式开发
fs = require('fs'),
urlModel = require('url'), // 能够把url分割为路径，查询信息，hash等
qs = require('querystring'); // 能够把url序列化操作

const app = http.createServer((req,res)=> {
 const {pathname,query} = urlModel.parse(req,url);
 let lastName = ['\.js$','\.html$','\.css$','\.less$','\.jpg$'];
 // /\.js$|\.html/
 let re = new RegExp(lastName.join('|'));
 // console.log(re);
 if(pathname === '/'){
     let data = fs.readFileSync('www2/myindex.html');
     res.end(data.toString());
 }
});
let port = 80
app.listen(port);

app.on('error', (e) => {
    // console.log(e);
    if(e.code === 'EADDRINUSE') {// 当多次启动服务器时，端口被占用
      port ++;
      console.log(port);
      app.listen(port);
    }
})
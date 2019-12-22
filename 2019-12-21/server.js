const http = require('http');// node_moduldes中的文件也不用路径就可以引入  commonjs规范


let app = http.createServer(function(request,response) {
     if(request.url !== './favicon.ico') {
         let num = (/user=(\d)/.exec(request.url.split('?')[1]))[1];
         console.log(num);
         response.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'});
         if(num === '1') {
             response.write('{"name":"xiaomengmeng"}');
         }else if (num === '0') {
             response.write('{"name":"laotian"}');
         }
     }
}); //.listen(80);
app.listen(80);
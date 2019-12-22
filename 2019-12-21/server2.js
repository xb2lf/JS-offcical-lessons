const http = require('http');

let app = http.createServer(function(request,response) {
    response.writeHead(200, {'Content-Type': 'text/plain'});
    response.end('你妹的');
}).listen(80)
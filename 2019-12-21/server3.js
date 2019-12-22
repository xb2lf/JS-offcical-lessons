const http = require('http');
const fs = require('fs');

http.createServer(function (req, res) {
    //http://localhost/index.html
    console.log(req.url); //  /index.html  /index2.html
    fs.readFile('1.txt', function (err, data) {
        if (err) {
            res.write('404');
            res.end();
        }
        // console.log(data.toString());
        res.write(data.toString());
        res.end();
    })
}).listen(80);
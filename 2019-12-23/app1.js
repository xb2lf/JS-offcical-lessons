const express = require('express');
const app = express();
const bp = require('body-parser');
const fs = require('fs');

app.use(bp.urlencoded({extended:false}));// 解析urlencoded

let u = express.static('www');
app.use(u); // 静态文件

app.get('/login',(req,res) => {// req.res都是二次封装的对象
    // console.log(req.query);
    if (req.query.user === 'xxx') {
        // res.json({
        //     code:1,
        //     msg:'妥了'
        // });

        res.send({
            code:1,
            msg:'妥了'
        });
    }
});

app.post('/register',(req,res) => {
    console.log(req.body);
});


// app.get('*', function(req, res){
//     console.log('可能是404');
//     let a = fs.readFileSync('www/404.html');
//     // res.send(a);
//     res.end(a.toString());
// });
app.listen(80);
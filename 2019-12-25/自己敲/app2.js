const express = require('express');
const bodyParser = require('body-parser');// post能够用res.body
const app = express();
const session = require('express-session');
const multer = require('multer');

let sql = [
    {
        id:-1,
        name:'xl'
    },
    {
        id:0,
        name:'laotian',
        type:0
    },
    {
        id:1,
        name:'xiaomeng',
        type:1,
    },
    {
        id:2,
        name:'guangge',
        type:9
    }
];
app.use(session({
    secret:'12期',
    name:'session_id',
    cookie:{maxAge:5000},
    resave:false,
    saveUninitialized:true,
}));
app.use(express.static('www'));
app.use(multer({dest:'/uploads'}).array('filename'));//single单个，array数组
app.use('/',(req,res,next) => {
    req.sql = sql;
    console.log('进来了');
    if(req.session.userinfo || req.url === '/login2') {
        next();// 上面的步骤完成，下面继续执行
    }else {
        console.log('没有权限');
        res.json({code:100});
    }
});
app.use(bodyParser.json()); //解决axios不能用对象的问题
app.use(bodyParser.urlencoded({extended:false}));

//登录接口1
app.use('/login',require('./routers/user/login'));

//登录接口2
app.use('/login2',require('./routers/user/login2'));

//权限控制接口
app.use('/getary',require('./routers/data/getary'));

//无加载过程接口
app.use('/noloading',require('./routers/data/noloading'));

//上传接口
app.use('/upload',require('./routers/upload/upload'));

app.listen(80);
const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');// post能够用res.body
const app = express();

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
app.post('/login',(req,res) => {
    console.log(req.body);
    setTimeout(() => {
        res.json({code:0});
    }, 2000);
});

//登录接口2
app.post('/login2',(req,res) => {
    const {body} = req;
    let o = sql.find(item => item.name === body.name);
    let obj = null;
    if(o) {
        obj = {
            code:0,
            type:o.type,
            user:o.name
        }
    }else {
        obj = {
            code:1,
        }
    }
    res.json(obj);
});

//权限控制接口
app.get('/getary',(req,res) => {
    setTimeout(() => {
        res.json({code:0,ary:[1,2,3,4]});
    }, 4000);
});

//无加载过程接口
app.get('/noloading',(req,res) => {
    setTimeout(() => {
        res.json({code:1});
    }, 3000);
});

app.listen(80);
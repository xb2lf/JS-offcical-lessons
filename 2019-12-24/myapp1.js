const express = require('express');
const fs = require('fs');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const session = require('express-session');

app.use(express.static('www')); //Express内置的中间函数 express.static,传递一个包含静态资源的目录给 express.static 中间件用于立刻开始提供文件
app.use(bodyParser.urlencoded({extended:false})); // bodyParser.urlencoded 用来解析 request 中 body的 urlencoded字符， 只支持utf-8的编码的字符,也支持自动的解析gzip和 zlib
// 返回的对象是一个键值对，当extended为false的时候，键值对中的值就为'String'或'Array'形式，为true的时候，则可为任何数据类型。

app.use(session({
    secret:'12期',// secret，配置加密字符串，它会在原有的基础上再和secret的值去拼接加密
    name:'session_id',// 返回客户端（浏览器）key的名称，也可以自己设置
    resave:false,// 强制存储session，默认为true
    saveUninitialized:true,// 强制存储未初始化的session，默认为true
    rolling:true, // 刷新cookie重置时间，默认为false
}));

let sql = [
    {
        id:0,
        user:'xiaoliu',
        pw:'1234'
    },
];

//用户输入用户名之后，判断用户名是否已存在，在用户注册时判断

const userFn = (req,res) => {
    const {body} = req;
    let re = /^[a-zA-Z]\w{5,11}$/;//建立正则规则，来匹配用户所输入用户名是否合格（以字母开头，中间任意，6到12位）
    let msgObj = {};
    if(body.user && re.test(body.user)) {
        let o = sql.find(item => item.user === body.user);//让用户请求的user字段和已经存在user匹配
        if(o) {
            msgObj.code = 1;
            msgObj.msg = '用户名已存在';
        }else{
            msgObj.code = 0;
            msgObj.msg = '可以注册';
        }
    }else {
        msgObj.code = 2;
        msgObj.msg = '请正确输入用户名';
    }
    res.json(msgObj); // 发送一个json的响应。这个方法和将一个对象或者一个数组作为参数传递给res.send()方法的效果相同
}

app.post('/getName',userFn); // 调用这个接口去判断输入用户名是否已存在

// 注册接口
app.post('/register',(req,res) => {
    const {body:{user,pw}} = req; // 解构post中用户请求的body中的user和pw字段
    let re = /^[a-zA-Z]\w{5,11}$/;//建立正则规则，来匹配用户所输入用户名是否合格（以字母开头，中间任意，6到12位）
    let msgObj = {};
    if(user && pw && re.test(user)) {
        let o = sql.find(item => item.user === user);//让用户请求的user字段和已经存在user匹配
        if(o) {
            msgObj.code = 1;
            msgObj.msg = '用户名已存在';
        }else{
            msgObj.code = 0;
            msgObj.msg = '可以注册';
            sql.push({
                id:Date.now(),
                user,
                pw,
            })
        }
    }else {
        msgObj.code = 2;
        msgObj.msg = '请正确输入用户名';
    }
    res.json(msgObj); // 发送一个json的响应。这个方法和将一个对象或者一个数组作为参数传递给res.send()方法的效果相同
    
});

//登录接口
app.post('/login',(req,res) => {
    const {body:{user,pw}} = req;
    let msgObj = {};
    if(user && pw) {
        let o = sql.find(item => item.user === user);
        if(o) {//说明用户名存在，用户可以登录
            if(o.pw === pw) {
                 msgObj.code = 0;
                 msgObj.msg = '登录成功';
                 req.session.userinfo = user;//设置session值
            }else{
                msgObj.code = 3;
                msgObj,msg = '用户名或密码错误';
            }
        }else {
            msgObj.code = 1;
            msgObj.msg = '此用户未注册';
        }
    }else{
        msgObj.code = 2;
        msgObj.msg = '请核对用户信息';
    }
    res.json(msgObj);
});

//判断用户是否登录接口
app.get('/islogin',(req,res)=>{
    if(req.session.userinfo){ //登录过
        res.json({
            code:0,
            msg:'欢迎回来',
            user:req.session.userinfo
        })
    }else{
        res.json({
            code:1,
            msg:'没有登录'
        })
    }
    // console.log(req.session.userinfo);
});


app.get('/logout',(req,res)=>{
    req.session.destroy(function(err){// 销毁session值
        console.log(err);
    });
    res.send({
        code:0
    });
})

//多并发
app.get('/a',(req,res)=>{
    setTimeout(() => {
        res.json({user:'pjc'})
    }, 2000);
})

app.get('/b',(req,res)=>{
    setTimeout(() => {
        res.json({iphone:'123456'})
    }, 5000);
});

app.get('/c',(req,res)=>{
    let {user,iphone} = req.query
    if(user=='pjc'&& iphone=='123456'){
        res.json({
            code:0
        })
    }else{
        res.json({
            code:1
        })
    }
    
});

let port = 80;
app.listen(port);

app.use('*',(req,res)=>{
    let data = fs.readFileSync(path.resolve('./www/404.html'));
    res.send(data.toString());
});
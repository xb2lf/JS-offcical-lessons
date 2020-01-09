const express  = require('express');
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
/* bodyParser Module来做文件解析, 均支持自动的解析gzip和 zlib。urlencoded解析body中的urlencoded字符， 只支持utf-8的编码的字符,也支持自动的解析gzip和 zlib，.json这个方法返回一个仅仅用来解析json格式的中间件，能接受任何body中任何Unicode编码的字符。 */

let ary = ['老李','老田']; // 模拟数据
const jwt = require('jsonwebtoken'); // jsonwebtoken生成与解析token

 //  设置跨域
app.use((req,res,next) =>{
    res.header("Access-Control-Allow-Credentials",true)
    // 第二个参数表示允许跨域的域名，* 代表所有域名  
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Methods','GET, POST') // 允许的 http 请求的方法
    // 允许前台获得的除 Cache-Control、Content-Language、Content-Type、Expires、Last-Modified、Pragma 这几张基本响应头之外的响应头
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With')
    if (req.method == 'OPTIONS') {
        res.sendStatus(200)
    } else {
        next();
    }
});

// 测试get请求能否正常跨域(接口)
app.get('/test',(req,res) => {
res.json({
    conde:0,
    mdg:'test',
})
});

//post接口

const secret = 'jsonwebtoken202001090010';//配置jsonwebtoken生成token所需的secret，secret为加密密钥，不能泄露给其他人使用。

//登录接口
app.post('/login',(req,res) => {
    const {uname} = req.body;
    if(ary.includes(uname)) {
        res.json({
            code:0,
            msg:'登录成功',
            //登录成功后创建token
            token:jwt.sign({user:uname},secret,{
                expiresIn:60 // 默认单位为s，可以设为 6h，1day token有效期
            })
        })
    }else{
        res.json({
            code:1,
            msg:'登录失败',
        })
    }
});

//是否登录接口
// 前端发送token一般不是通过body发送，而是通过headers发送的
app.post('/islogin',(req,res) => {
    //Authorization值是可变的，一般是Authorization||token,到底是哪个根据Access-Control-Allow-Headers配置来（req.headers.authorization或者req.headers.token）
    const token = req.headers.authorization;
    if(token) {
        jwt.verify(token,secret,(error,data) => {
            if(error) {
                res.json({
                    code:2,
                    msg:'token失效',
                })
                return;
            }
            res.json({
                code:0,
                msg:'登录权限验证成功',
                //每次请求验证的时候，都发一个新的令牌给前端，保证令牌持久化操作
                token:jwt.sign({user:data.user},secret,{
                    expiresIn:60 // token续期的有效周期
                })
            })
        })
    }else{
        res.json({
            code:1,
            msg:'未登录',
        })
    }
})

// jsonwebtoken解析token
// jwt.verify(token,secret,(error,data)=>{
//     if(error){
//         console.log('失效')
//         return;
//     }
//     console.log(data);
// });
app.listen(80);
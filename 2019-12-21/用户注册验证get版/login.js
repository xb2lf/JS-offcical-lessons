const http = require('http');
const fs = require('fs');

/*      
       注册:
    /register?user=123 
        有没有这个人
        失败
            {
                code:0,
                msg:'有介个银了'
            }

        成功
            {
                code:1,
                msg:'可以注册'
            }
        
    localhost/register?user=123 

    user=123&pass=321  ^([^=]+)=([^&]+)&?

*/

function queryString(str) {
    let obj = {};
    str.replace(/([^=]+)=([^&]+)&?/g, ($0, $1, $2) => {
        obj[$1] = $2;
    });
    return obj;
}

let sql = [
    {
        id: 0,
        username: '彭锦程',
        password: 123
    },
    {
        id: 1,
        username: '尹德智',
        password: 321
    },
    {
        id: 2,
        username: '李淑磊',
        password: 123
    },
    {
        id: 3,
        username: 'tony',
        password: 123
    }
];

//get
http.createServer((req, res) => {
    let url = req.url;
    if (url !== '/favicon.ico') {
        if (url.includes('?')) {
            // 接口
            let ary = url.split('?');//从字段前开始截取
            let port = ary[0];// /register
            let param = queryString(ary[1]);// user=123&

            switch (port) {
                // 查询用户是否存在接口
                case '/getname':
                    // 给前端返回json
                    let msg = {
                        code: 0,
                        msg: '可以注册'
                    }
                    let select = sql.find(item => item.username === decodeURI(param.user));
                    console.log(select);
                    // 确定下填写的字段中是否已有这个用户
                    if (select) {
                        msg.code = 1;
                        msg.msg = '用户已经存在';
                    }
                    res.setHeader('content-type', 'text/html;chatset=utf-8');
                    res.write(JSON.stringify(msg));
                    res.end();
                    break;
                // 注册接口
                case '/register':
                    let message = {
                        code: 1,
                        msg: '注册成功'
                    }
                    let o = sql.find(item => item.username === decodeURI(opt.user));
                    if (o) {
                        message.code = 0;
                        message.msg = '用户已存在';
                    } else {
                        if (opt.password) {
                            sql.push({
                                id: Date.now(),
                                username: decodeURI(opt.user),
                                password: opt.password
                            });
                            console.log(sql);
                        } else {
                            message.code = 2;
                            message.msg = '参数不正确';
                            res.writeHead(400, { 'conten-type': 'text/html;charset=utf-8' });
                            res.write(JSON.stringify(message));
                            res.end();
                            return;
                        }
                    }
                    res.setHeader('content-type', 'text/html;charset=utf-8');
                    res.write(JSON.stringify(message));
                    res.end();
                    break;

                default:
                    break;
            }
            console.log(url);
        } else {
            // 文件
            try {
                if (url === '/') {
                    url = '/index.html';
                }
                let data = fs.readFileSync('www' + url);
                res.write(data.toString());
                res.end();
            } catch (error) {
                let data = fs.readFileSync('www/404.html');
                res.write(data.toString());
                res.end();
            }
        }
    }
}).listen(80);
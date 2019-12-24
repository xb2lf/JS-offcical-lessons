const http = require('http'),//模块化开发
    fs = require('fs'),
    urlModel = require('url'),//能够把url分割为路径，查询信息，hash....
    qs = require('querystring'); //能够url序列化操作

let sql = [
    {
        'id': 1,
        'name': '老田',
        'age': 18,
        'checked': false
    },
    {
        'id': 2,
        'name': '小萌萌',
        'age': 16,
        'checked': false
    }
];

const app = http.createServer((req, res) => {
    let originAry = [
        'http://localhost:81',
    ];

    if (originAry.includes(req.headers.origin)) {
        // 设置跨域白名单
        res.writeHead(200, {
            'Content-Type': 'text/html;charset=utf-8',
            'Access-Control-Allow-Origin': req.headers.origin
        });
    }
    const { pathname, query } = urlModel.parse(req.url);
    let lastName = ['\.js$', '\.html$', '\.css$', '\.less$', '\.jpg$'];
    // /\.js$|\.html/
    let re = new RegExp(lastName.join('|'));
    // console.log(re);
    if (pathname === '/') {
        let data = fs.readFileSync('www/index.html');
        res.end(data.toString());
    } else if (re.test(pathname)) {
        // console.log(urlModel.parse(req.url));
        // console.log('静态文件');
        try {
            let data = fs.readFileSync('www' + pathname);
            res.end(data.toString());
        } catch (error) {
            let data = fs.readFileSync('www/404.html');
            res.end(data.toString());
        }

    } else {
        res.setHeader('Cotent-Type', 'text/html;charset=uft-8');
        switch (pathname) {
            // /up?id=0  //上移
            case '/up':
                let { id } = qs.parse(query);
                let upmsg = {
                    code: 1,
                    msg: '上移成功'
                };
                if (sql[0].id == id) {
                    upmsg.code = 0;
                    upmsg.msg = '已经是第一层了';
                } else {
                    let index = sql.findIndex(item => item.id == id);
                    // console.log(index);// 输出当前操作项的index
                    let c = sql[index];
                    sql[index] = sql[index - 1];
                    sql[index - 1] = c;
                    upmsg.data = sql;
                }
                res.end(JSON.stringify(upmsg));
                break;
            case '/getdata':
                res.end(JSON.stringify({ code: 1, ary: sql }));
                break;
            case '/add':
                let addobj = {
                    code: 1,
                    msg: '添加成功',
                    response: sql
                };
                let obj = qs.parse(query);
                // console.log(obj,query);
                if (obj.name === 'undefined' || obj.age === 'undefined') {
                    addobj.code = 2;
                    addobj.msg = '参数错误';
                    res.statusCode = 400;
                    console.log('进参数错误')
                } else {
                    let user = sql.find(item => item.name === obj.name);

                    if (!user) {
                        sql.push({
                            'id': Date.now(),
                            'name': obj.name,
                            'age': obj.age,
                            'checked': false
                        });
                    } else {
                        addobj.code = 0;
                        addobj.msg = '名字已存在';
                    }
                }
                // res.writeHead(200, {
                //     'Content-Type': 'text/html;charset=utf-8'
                // });
                res.setHeader('Content-Type', 'text/html;charset=utf-8')
                res.end(JSON.stringify(addobj));
                break;
            default:
                break;
        }
    }
});

let port = 80;

app.listen(port);

/*
    当服务器报错的时候触发
*/
app.on('error', (e) => {
    console.log(e);
    //端口被占用的错误
    if (e.code === 'EADDRINUSE') {
        port++;
        // console.log(port)
        app.listen(port)
    }
})
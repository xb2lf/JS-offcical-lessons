const http = require('http'), // 引入模块，模块式开发
jquery = require('jquery'), // 在node_modules里面
fs = require('fs'),
urlModel = require('url'), // 能够把url分割为路径，查询信息，hash等
qs = require('querystring'); // 能够把url序列化操作

const app = http.createServer((req,res)=> {
    let originAry = [// 设置跨域白名单列表
        'http://localhost:81',
    ];
    // console.log(req.headers);
    if(originAry.includes(req.headers.origin)) {
        // 设施跨域白名单
        res.writeHead(200, {
            'Content-Type':'text/html;charset=uftf-8',
            'Access-Control-Allow-Origin':req.headers.origin
        });
    }
    const {pathname,query} = urlModel.parse(req.url);
    let lastName = ['\.js$','\.html$','\.css$','\.less$','\.jpg$'];
    // /\.js$ | \.html$/
    let re = new RegExp(lastName.join('|'));
    // console.log(re);//  /.js$|.html$|.css$|.less$|.jpg$/

    if(pathname === '/') {
        let data = fs.readFileSync('www/index.html');
        res.end(data.toString());
    }else if(re.test(pathname)) {
    //    console.log(urlModel.parse(req.url));// 请求路径对象
        try {
            let data = fs.readFileSync('www' + pathname);
            res.end(data.toString());
        } catch (error) {
            let data = fa.readFileSync('www/404.html');
            res.end(data.toString());
        }
    }else{
    // 接口 add?mkdirname=xxx
    switch (pathname) {
        case '/add':
            const {mkdirname} = qs.parse(query);
            fs.mkdir('www/' + mkdiname + '/',(err) => {
                console.log(err);
                if(err) {
                    if(err.code === 'EEXISt') {// 此状态表示命名已经存在
                        fs.readdir('www',(error,filesAry) => {
                            console.log(filesAry); // 返回的是一个数组，数组中放到是当前文件夹下所有的文件名字
                            let num = 0;
                            let inl = filesAry.includes(mkdirname);// 确定当前文件夹所有文件名是否有所命名的文件名字
                            let name = '';
                            while(b) {
                                name = mkdirname.replace(/\(\d+\)/,'');// 当有重复的带括号的同名文件，把当前文件名的括号和里边数组用去掉
                                //比对重复文件夹
                                b = filesAry.includes(name + '(' (++num) + ')');
                                name = name + '(' (++num) + ')';
                            }
                            fs.mkdir('www' + 'name' + '/',(err) => {
                                console.log('第二次创建成功');
                                res.end(JSON.stringify({
                                    code:1,
                                    msg:'创建文件夹成功'
                                }));
                            })
                        })

                    }
                    console.log('创建失败');
                    console.log(err);
                    return;
                }
                res.end(JSON.stringify({
                    code:1,
                    msg:'创建文件夹成功'
                }));
            });
            break;
        case '/jsonp':
            //wd=112&calback=fn
            let o = qs.query(query.toString());
            if(o.wd == 1) {
                let json = JSON.stringify({
                    code:1,
                    ary:[1,2,3,4,5] 
                });
                res.end(o.callback + '(' + json + ')');
            }else{
                let json2 = JSON.stringify({
                    code:1,
                    ary:[5,4,3,2,1]
                })
                res.end(o.callback+'('+ json2 +')');
            }
            break;
    
        default:
            break;
    }
    }
});
let port = 80
app.listen(port);

app.on('error', (e) => {
    // console.log(e);
    if(e.code === 'EADDRINUSE') {// 当多次启动服务器时，端口被占用
      port ++;
      console.log(port);
      app.listen(port);
    }
})
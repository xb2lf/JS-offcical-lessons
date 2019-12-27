[toc]

## JS正式课第四十天

### express中提供的Router
> `在express中使用路由Router：把不同的目录对应到不同的模块，实现功能的分开。相当于一个子服务，有router.post()   router.get   router.use`

+ 在模块目录下写入相对应的文件并导出路由

```
const express = require('express');
const router = express.Router();

/*
    router的根不是localhost是  /login/
*/
router.post('/',(req,res)=>{
    // console.log(req.body);
    setTimeout(() => {
        res.json({code:0})
    }, 2000);
});

module.exports = router; //导出路由
```
+ 在express文件中引入这个模块

```
app.use('/login',require('./routers/user/login'));// 模块目录
```

### express文件上传中间件Multer

```
Express默认并不处理HTTP请求体中的数据，对于普通请求体(JSON、二进制、字符串)数据，可以使用body-parser中间件。而文件上传(multipart/form-data请求)，可以基于请求流处理，也可以使用formidable模块或Multer中间件。

1. multer中间件

Multer是Express官方推出的，用于Node.jsmultipart/form-data请求数据处理的中间件。

它基于busboy构建，可以高效的处理文件上传，但并不处理multipart/form-data之外的用户请求。

2. 安装

npm install multer --save
3. 使用

Multer在解析完请求体后，会向Request对象中添加一个body对象和一个file或files对象（上传多个文件时使用files对象 ）。其中，body对象中包含所提交表单中的文本字段（如果有），而file(或files)对象中包含通过表单上传的文件。

基本使用示例如下：

var express = require('express')
var multer = require('multer')
var upload = multer({ dest: 'uploads/' })
var app = express()
app.post('/profile', upload.single('avatar'), function (req, res, next) {
// req.file 是 `avatar` 文件
// req.body 对象中是表单中提交的文本字段(如果有)
})
app.post('/photos/upload', upload.array('photos', 12), function (req, res, next) {
// req.files 是 `photos` 文件数组
// req.body 对象中是表单中提交的文本字段(如果有)
})
var cpUpload = upload.fields([{ name: 'avatar', maxCount: 1 }, { name: 'gallery', maxCount: 8 }])
app.post('/cool-profile', cpUpload, function (req, res, next) {
// req.files 是一个对象 (String -> Array)，文件的字段名是其 key，文件数组是 key的值
//
// 如：
// req.files['avatar'][0] -> File
// req.files['gallery'] -> Array
//
// req.body 对象中是表单中提交的文本字段(如果有)
})

在使用中，如果仅需要处理multipart表单中的文本字段，可以使用multer中的.single() 、 .array()或fields()方法。

如，可以像下面这样使用.array()方法：

var express = require('express')
var app = express()
var multer = require('multer')
var upload = multer()
app.post('/profile', upload.array(), function (req, res, next) {
// req.body 中包含文本字段
})
4. multer的API
4.1 文件对象

multer解析完上传文件后，会被保存为一个包含以下字段的对象：

       fieldname - 表单提交的文件名(input控件的name属性)
       originalname - 文件在用户设备中的原始名称
       encoding - 文件的编码类型
       mimetype - 文件的Mime类型
       size - 文件的大小
       destination - 文件的保存目录(DiskStorage)
       filename - 文件在destination中的名称(DiskStorage)
       path - 上传文件的全路径(DiskStorage)

       buffer - 文件对象的Buffer(MemoryStorage)

4.2 方法

multer(opts) - 创建对象

引用multer模块后，我们会获取到一个顶级方法。该方法是一个工厂函数，可以使用这个方法创建Multer对象。它接受一个选项对象，最基本的选项是dest，它告诉 Multer 文件的存储位置。如果忽略该选项，文件会被保存在内存中，并且永远不会写入硬盘中。

默认情况下，Multer会对文件进行重命令，以避免名称冲突。重命名函数，可以按需要自定义。

Multer的选项对象中可以包含以下值：

       dest或storage - 文件存储位置
       fileFilter - 函数，控制可上传的文件类型
       limits - 上传数据限制(文件大小)

在一般的Web应用中，只有dest选项需要设置。使用示例如下：

var upload = multer({ dest: 'uploads/' })

如果需要对上传文件做更多控制，可以使用storage代替dest，Multer会将存储引擎由DiskStorage(硬盘存储)切换为MemoryStorage(内存存储)。

创建multer对象后，我们可以使用以下实例来接收上传文件：

.single(fieldname) - 单个文件上传

接收一个名为fieldname的上传文件，所上传的文件会被保存在req.file。

.array(fieldname[, maxCount]) - 多个文件上传

接收名为fieldname的，多个上传文件数组。可选参数maxCount表示可接受的文件数量，上传文件数超出该参数指定的数据后会抛出一个错误。文件数组会被保存在req.files中。

.fields(fields) - 多个文件上传

接收通过fields指定的多个上传文件。文件数组对象会被保存在req.files中。

fields是一个包含对象的数组，对象中会包含name和maxCount两个属性：

[
{ name: 'avatar', maxCount: 1 },
{ name: 'gallery', maxCount: 8 }
]

.none() - 仅解析文本字段

仅解析文本字段。如果请求中有任何上传文件，会触发'LIMIT_UNEXPECTED_FILE'错误。这个方法与upload.fields([])类似。

.any() - 接收所有文件

接收请求中的所有文件。上传文件数组会被保存在req.files中。

4.3 选项参数

storage - 存储引擎

该选项有以下两个可选项：

       DiskStorage - 硬盘存储
       MemoryStorage - 内存存储

.diskStorage(obj)与硬盘存储

硬盘存储引擎提供了将文件存储到磁盘的完全控制：

var storage = multer.diskStorage({
destination: function (req, file, cb) {
cb(null, '/tmp/my-uploads')
},
filename: function (req, file, cb) {
cb(null, file.fieldname + '-' + Date.now())
}
})
var upload = multer({ storage: storage })

.diskStorage()方法提供了文件存储位置控制权限，该方法接收一个对象参数，其中包含两destination和filename两个属性。

destination用于设置文件的存储目录，可以是一个函数或字符串。若未提供该参数，将使用系统的临时目录。

filename用于设置文件名。若未提供该参数，将使用一个随机字符串，且文件名中不包含扩展名。

.memoryStorage()与内存存储

内存存储引擎会以Buffer的形式将文件保存在内存中。该方法没有任何参数：

var storage = multer.memoryStorage()
var upload = multer({ storage: storage })

limits - 文件尺寸

该选项用于设置文件尺寸，Multer 会将这个对象传递至busboy中。limits对象中可以包含以下可选值：

       fieldNameSize - 字段名最大尺寸。默认值：100 bytes
       fieldSize - 字段值最大尺寸。默认值：1MB
       fields - 非文件字段的最大数量。默认值：Infinity
       fileSize - multipart 表单中，文件的最大尺寸。默认值：Infinity
       files - multipart 表单中，文件最大数量。默认值：Infinity
       parts - multipart 表单中，最大组件(fields+files)数量。默认值：Infinity

       headerPairs - 默认值：2000

fileFilter - 文件筛选

fileFilter用于控制要哪些文件是可接受的，哪些是要被拒绝的。使用形式如下：

function fileFilter (req, file, cb) {
// 需要调用回调函数 `cb`，
// 并在第二个参数中传入一个布尔值，用于指示文件是否可接受
// 如果要拒绝文件，上传则传入 `false`。如:
cb(null, false)
// 如果接受上传文件，则传入 `true`。如:
cb(null, true)
// 出错后，可以在第一个参数中传入一个错误：
cb(new Error('I don\'t have a clue!'))
}
```

### FormData

```
FormData的主要用途有两个：
1、将form表单元素的name与value进行组合，实现表单数据的序列化，从而减少表单元素的拼接，提高工作效率。
2、异步上传文件
一、创建formData对象
1、创建一个空对象：
//通过FormData构造函数创建一个空对象
var formdata=new FormData();
//可以通过append()方法来追加数据
formdata.append("name","laotie");
//通过get方法对值进行读取
console.log(formdata.get("name"));//laotie
//通过set方法对值进行设置
formdata.set("name","laoliu");
console.log(formdata.get("name"));//laoliu

2、通过表单对formData进行初始化
创建表单：

<form id="advForm">
    <p>广告名称：<input type="text" name="advName"  value="xixi"></p>
    <p>广告类别：<select name="advType">
        <option value="1">轮播图</option>
        <option value="2">轮播图底部广告</option>
        <option value="3">热门回收广告</option>
        <option value="4">优品精选广告</option>
    </select></p>
    <p><input type="button" id="btn" value="添加"></p>
</form>
通过表单元素作为参数，实现对formData的初始化：

//获得表单按钮元素
var btn=document.querySelector("#btn");
//为按钮添加点击事件
btn.onclick=function(){
    //根据ID获得页面当中的form表单元素
    var form=document.querySelector("#advForm");
    //将获得的表单元素作为参数，对formData进行初始化
    var formdata=new FormData(form);
    //通过get方法获得name为advName元素的value值
    console.log(formdata.get("advName"));//xixi
    //通过get方法获得name为advType元素的value值
    console.log(formdata.get("advType"));//1 
}
二、操作方法
1、通过get(key)与getAll(key)来获取相对应的值
// 获取key为age的第一个值
formdata.get("age"); 
 // 获取key为age的所有值，返回值为数组类型
formdata.getAll("age");

2、通过append(key,value)在数据末尾追加数据
//通过FormData构造函数创建一个空对象
var formdata=new FormData();
//通过append()方法在末尾追加key为name值为laoliu的数据
formdata.append("name","laoliu");
//通过append()方法在末尾追加key为name值为laoli的数据
formdata.append("name","laoli");
//通过append()方法在末尾追加key为name值为laotie的数据
formdata.append("name","laotie");
//通过get方法读取key为name的第一个值
console.log(formdata.get("name"));//laoliu
//通过getAll方法读取key为name的所有值
console.log(formdata.getAll("name"));//["laoliu", "laoli", "laotie"]

3、通过set(key, value)来设置修改数据
key的值不存在，会添加一条数据

//通过FormData构造函数创建一个空对象
var formdata=new FormData();
//如果key的值不存在会为数据添加一个key为name值为laoliu的数据
formdata.set("name","laoli");
//通过get方法读取key为name的第一个值
console.log(formdata.get("name"));//laoli
key的值存在，会修改对应的value值

//通过FormData构造函数创建一个空对象
var formdata=new FormData();
//通过append()方法在末尾追加key为name值为laoliu的数据
formdata.append("name","laoliu");
//通过append()方法在末尾追加key为name值为laoliu2的数据
formdata.append("name","laoliu2");
//通过get方法读取key为name的第一个值
console.log(formdata.get("name"));//laoliu
//通过getAll方法读取key为name的所有值
console.log(formdata.getAll("name"));//["laoliu", "laoliu2"]

//将存在的key为name的值修改为laoli
formdata.set("name","laoli");
//通过get方法读取key为name的第一个值
console.log(formdata.get("name"));//laoli
//通过getAll方法读取key为name的所有值
console.log(formdata.getAll("name"));//["laoli"]

4、通过has(key)来判断是否存在对应的key值
//通过FormData构造函数创建一个空对象
var formdata=new FormData();
//通过append()方法在末尾追加key为name值为laoliu的数据
formdata.append("name","laoliu");
//判断是否包含key为name的数据
console.log(formdata.has("name"));//true
//判断是否包含key为age的数据
console.log(formdata.has("age"));//false

5、通过delete(key)可以删除数据
//通过FormData构造函数创建一个空对象
var formdata=new FormData();
//通过append()方法在末尾追加key为name值为laoliu的数据
formdata.append("name","laoliu");
console.log(formdata.get("name"));//laoliu
//删除key为name的值
formdata.delete("name");
console.log(formdata.get("name"));//null
三、通过XMLHttpRequest发送数据


创建表单：
<form id="advForm">
    <p>广告名称：<input type="text" name="advName" value="xixi"></p>
    <p>广告类别：<select name="advType">
        <option value="1">轮播图</option>
        <option value="2">轮播图底部广告</option>
        <option value="3">热门回收广告</option>
        <option value="4">优品精选广告</option>
    </select></p>
    <p>广告图片：<input type="file" name="advPic"></p>
    <p>广告地址：<input type="text" name="advUrl"></p>
    <p>广告排序：<input type="text" name="orderBy"></p>
    <p><input type="button" id="btn" value="添加"></p>
</form>


发送数据：

var btn=document.querySelector("#btn");
btn.onclick=function(){
    var formdata=new FormData(document.getElementById("advForm"));
    var xhr=new XMLHttpRequest();
    xhr.open("post","http://127.0.0.1/adv");
    xhr.send(formdata);
    xhr.onload=function(){
        if(xhr.status==200){
            //...
        }
    }
}
```
### FileReader
> `参考：https://blog.csdn.net/xianweizuo/article/details/88911364`
> `参考：https://www.jianshu.com/p/d3f4e91b02e0`
```
    /*
        FileReader可以把files[n]的数据，变成base64码(img原本的编码)
        fr.readAsDataURL(图片数据)
        fr.onload  解析完之后触发的事件
            这个事件里面有个ev.target.result 就是base64码
    */
```

```
FileReader 对象允许Web应用程序异步读取存储在用户计算机上的文件（或原始数据缓冲区）的内容，使用 File 或 Blob 对象指定要读取的文件或数据。

其中File对象可以是来自用户在一个<input>元素上选择文件后返回的FileList对象,也可以来自拖放操作生成的 DataTransfer对象,还可以是来自在一个HTMLCanvasElement上执行mozGetAsFile()方法后返回结果。

重要提示： FileReader仅用于以安全的方式从用户（远程）系统读取文件内容 它不能用于从文件系统中按路径名简单地读取文件。 要在JavaScript中按路径名读取文件，应使用标准Ajax解决方案进行服务器端文件读取，如果读取跨域，则使用CORS权限。
```

```
HTML5定义了FileReader作为文件API的重要成员用于读取文件，根据W3C的定义，FileReader接口提供了读取文件的方法和包含读取结果的事件模型。



FileReader的使用方式非常简单，可以按照如下步骤创建FileReader对象并调用其方法：

1.检测浏览器对FileReader的支持

if(window.FileReader) {
    var fr = new FileReader();
    // add your code here
}
else {
    alert("Not supported by your browser!");
}
1


2. 调用FileReader对象的方法

FileReader 的实例拥有 4 个方法，其中 3 个用以读取文件，另一个用来中断读取。下面的表格列出了这些方法以及他们的参数和功能，需要注意的是 ，无论读取成功或失败，方法并不会返回读取结果，这一结果存储在 result属性中。

方法名	参数	描述
abort	none	中断读取
readAsBinaryString	file	将文件读取为二进制码
readAsDataURL	file	将文件读取为 DataURL
readAsText	file, [encoding]	将文件读取为文本
readAsText：该方法有两个参数，其中第二个参数是文本的编码方式，默认值为 UTF-8。这个方法非常容易理解，将文件以文本方式读取，读取的结果即是这个文本文件中的内容。
readAsBinaryString：该方法将文件读取为二进制字符串，通常我们将它传送到后端，后端可以通过这段字符串存储文件。
readAsDataURL：这是例子程序中用到的方法，该方法将文件读取为一段以 data: 开头的字符串，这段字符串的实质就是 Data URL，Data URL是一种将小文件直接嵌入文档的方案。这里的小文件通常是指图像与 html 等格式的文件。


3. 处理事件

FileReader 包含了一套完整的事件模型，用于捕获读取文件时的状态，下面这个表格归纳了这些事件。

事件	描述
onabort	中断时触发
onerror	出错时触发
onload	文件读取成功完成时触发
onloadend	读取完成触发，无论成功或失败
onloadstart	读取开始时触发
onprogress	读取中
文件一旦开始读取，无论成功或失败，实例的 result 属性都会被填充。如果读取失败，则 result 的值为 null ，否则即是读取的结果，绝大多数的程序都会在成功读取文件的时候，抓取这个值。

fr.onload = function() {
    this.result;
};
1


下面通过一个上传图片预览和带进度条上传来展示FileReader的使用。

<script type="text/javascript">
		function showPreview(source) {
			var file = source.files[0];
			if(window.FileReader) {
				var fr = new FileReader();
				fr.onloadend = function(e) {
					document.getElementById("portrait").src = e.target.result;
				};
				fr.readAsDataURL(file);
			}
		}
	</script>
 
<input type="file" name="file" onchange="showPreview(this)" />
								<img id="portrait" src="" width="70" height="75">
1

如果要限定上传文件的类型，可以通过文件选择器获取文件对象并通过type属性来检查文件类型

if(!/image\/\w+/.test(file.type)){
    alert("请确保文件为图像类型");
    return false;
}
1
不难发现这个检测是基于正则表达式的，因此可以进行各种复杂的匹配，非常有用。

如果要增加一个进度条，可以使用HTML 5的progress标签，通过下面的代码实现。

<form>
    <fieldset>
        <legend>分度读取文件：</legend>
        <input type="file" id="File" />
        <input type="button" value="中断" id="Abort" />
        <p>
            <label>读取进度：</label><progress id="Progress" value="0" max="100"></progress>
        </p>
        <p id="Status"></p>
    </fieldset>
</form>
1

var h = {
    init: function() {
        var me = this;
         
        document.getElementById('File').onchange = me.fileHandler;
        document.getElementById('Abort').onclick = me.abortHandler;
         
        me.status = document.getElementById('Status');
        me.progress = document.getElementById('Progress');
        me.percent = document.getElementById('Percent');
         
        me.loaded = 0;
        //每次读取1M
        me.step = 1024 * 1024;
        me.times = 0;
    },
    fileHandler: function(e) {
        var me = h;
         
        var file = me.file = this.files[0];
         
        var reader = me.reader = new FileReader();
         
        //
        me.total = file.size;
         
        reader.onloadstart = me.onLoadStart;
        reader.onprogress = me.onProgress;
        reader.onabort = me.onAbort;
        reader.onerror = me.onerror;
        reader.onload = me.onLoad;
        reader.onloadend = me.onLoadEnd;
        //读取第一块
        me.readBlob(file, 0);
    },
    onLoadStart: function() {
        var me = h;
    },
    onProgress: function(e) {
        var me = h;
         
        me.loaded += e.loaded;
        //更新进度条
        me.progress.value = (me.loaded / me.total) * 100;
    },
    onAbort: function() {
        var me = h;
    },
    onError: function() {
        var me = h;
         
    },
    onLoad: function() {
        var me = h;
 
        if(me.loaded < me.total) {
            me.readBlob(me.loaded);
        } else {
            me.loaded = me.total;
        }
    },
    onLoadEnd: function() {
        var me = h;
         
    },
    readBlob: function(start) {
        var me = h;
         
        var blob,
            file = me.file;
         
        me.times += 1;
         
        if(file.webkitSlice) {
            blob = file.webkitSlice(start, start + me.step + 1);
        } else if(file.mozSlice) {
            blob = file.mozSlice(start, start + me.step + 1);
        }
         
        me.reader.readAsText(blob);
    },
    abortHandler: function() {
        var me = h;
         
        if(me.reader) {
            me.reader.abort();
        }
    }
};
 
h.init();
```





[toc]

## JS正式课第十八天

### jquery
+ 是一个js的类库，它简化了DOM操作,动画操作，兼容性，数据请求等操作
+ 如果用的少，之后就是不会
+  https://jquery.com/    官网
+  https://www.jquery123.com/     中文网
+  1.72左右的版本
+ jquery有多个版本
	+ 源码版 （学习版） jquery.js
	+ 正式版  jquery.min.js
+ 安装  npm init -y  生成一个package.json文件--> npm install  jquery -D(当前目录)       -g(全局)    两个参数选其一
+ 引入jquery   `<script src="./node_modules/jquery/dist/jquery.min.js"></script>`

####  选择器
+ $()  jquery对象
+ $()  函数调用
+ css如何去选择  ，jq就如何去选择

>`$('#box') 获取id`
>`$('li') 获取所有的li元素`
> `$('.active') 获取所有的.active元素`
> `$('#ul li')`
> `$('input[type = "button"]') 属性选择器`
> `$('input[type != "button"]')`
> `$('input[class $= "b"]')`
> `$('li even') 偶数，js从零开始计数`
> `$('li odd') 奇数  js从零开始计数`
> `$(':button') 伪类选择器（获取type为button的元素）`
> `$('div:eq(0)')  代表找到第一个div`

#### 属性操作
+  attr -> getAttribute,setAttribute
+  removeAttr -> removeAttrobute
+  prop ()  表单的状态布尔值(表单元素用)
+  val ()    ->value
+  html() -> innerHTML
+  text()  -> innerText

```
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
</head>
<body>
        <button>按钮1</button>
        <button>按钮2</button>
        <button>按钮3</button>
          
        <input type="checkbox" />
    <script src="./node_modules/jquery/dist/jquery.min.js"></script>
    <script>
    $(':button:eq(0)').click(function () {
        $(':checkbox').attr('checked',true);
    });
    $(':button:eq(1)').click(function () {
        $(':checkbox').attr('checked',false);
    })
    $(':button:eq(2)').click(function () {
        if($(':checkbox').prop('checked') === true) {
            $(':checkbox').attr('checked',false);
        }else{
            $(':checkbox').attr('checked',true);
        }
    })
    </script>
</body>
</html>
```

#### 样式操作
+ css()  设置行内的样式  ->  style

> `$('#box').css('width') -> 获取style的宽度`
> `$('#box').css('width'，200) 设置宽度`
> `$('#box').css({
         width:100,
         height:100,
         background:'red'
     });    批量添加` 

+ 显示: show()
+ 隐藏:  hide()

```
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
    <style>
    #box{
        width: 100px;
        height: 100px;
        background: hotpink;
    }
    </style>
</head>
<body>
    <div id="box"></div>
    <script src="./node_modules/jquery/dist/jquery.min.js"></script>
    <script>
    //  $('#box').css('display','none');
    $('#box').hide(); // display = none
    $('#box').show();
    </script>
</body>
</html>
```

#### jquery对象转原生对象，原生对象转jquery对象
+ 原生对象转jquery对象只需要包$()即可
> `box -> $(box) 就变成了jquery对象`
+ jquery对象转原生对象
> `$box -> $box.get(0) || $box[0]`

```
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
</head>
<body>
    <div id="box"></div>
    <script src="./node_modules/jquery/dist/jquery.min.js"></script>
    <script>
    /* 
    原生对象转jquery只需要包$()即可
    box  -> $(box)  就变成了jquery对象

    jquery对象转原生对象
    $box -> $box.get(0)  jquery就转换成了原生对象 或者$box[0]
    */  
   const box = document.getElementById('box');
   const $box = $('#box');
   $(box).css({
       width:200,
       height:200,
       background:'red'
   });

   console.log($box.get(0)); // 原生对象div
   console.log($box[0]); // 原生对象div
    </script>
</body>
</html>
```
### js_DOM

```
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
</head>
<body>
    <button id="btn">添加</button>
    <ul id="ul"></ul>
    <script src="./node_modules/jquery/dist/jquery.min.js"></script>
    <script>
    /* 
    DOM -> 文档对象模型

    增删改查   
       添加元素：
          $('<li></i>')

    关系  父子、祖先关系、祖孙关系

    回流和重绘

    盒子模型

    jquery都可以链式调用
    parent.prepend(child) 等同于insertBefore
    */  
   let num = 0; 
   $('#btn').click(function () {
    //  console.log( $('<li></i>'));
    //  console.log( $('<li></i>')[0]);
    //     console.log( $('<li>')[0]);

    // $('#ul').append($('<li>' + ++num +'</li>').css({
    //          width:30,
    //          height:30
    // }))

   let $li = $('<li>' + ++num +'</li>').css({
             width:30,
             height:30
    });
    $li.click(function() {
        $(this).remove();
    })
    // 一个是给ul添加样式，一个是给li添加样式
    // $('#ul').append($li).css('border','1px solid #000'); // $li.appendto($('#ul'));
    // $li.appendTo($('#ul')).css('border','1px solid #000');

    // $('#ul').append($li); // 每天都添加父元素内的末尾
    $('#ul').prepend($li); // 每次都U添加到父元素内的最前边
   });
    </script>
</body>
</html>
```

### 自己写jquery的css()方法

```
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
</head>
<body>
    <ul id="ul">
        <li>1</li>
        <li>2</li>
        <li>3</li>
        <li>4</li>
        <li>5</li>
    </ul>
    <div id="box"></div>
    <script>
    /*
        css('')  获取
        css({})  批量设置
        css('key','val')
    */
   ;(function(global,factory) {
       factory(global);
   })(this,function(global,NoGlobal) {
       function myQuery (selector) {
           return new fn.init(selector);
       }
       let fn = myQuery.prototype = {
           v: 'x.0',
           constructor:myQuery,
           isObject(val){
               return val !== null && typeof val === 'object';
           },
           css:function(...arg) {
             let len = arg.length;
             // 不带单位的
             let re = ['background','color','opacity','position','display'];
             let ary = Object.values(this);// 元素节点 ，每个li
            //  console.log(ary);
             if(len === 1) {// 当css方法只有一个参数时，存在两种情况，或者是获取属性值，或者是批量设置style
                if(typeof arg[0] === 'string') { // 获取
                    return getComputedStyle(this[0])[arg[0]];
                }else if(this.isObject(arg[0])){
                        let arr = Object.keys(arg[0]); // 外面传的对象
                        // console.log(arr);
                        // 批量设置
                        ary.forEach((ele,i) => {
                            arr.forEach((attr) => {
                                // console.log(attr,arg[0][attr]);
                                if(typeof arg[1] === 'number'){
                                    if(new RegExp(re.join('|')).test(attr)){
                                        ele.style[attr] = arg[0][attr];
                                    }else{
                                        ele.style[attr] = arg[0][attr] + 'px';
                                    }
                                }else{
                                    ele.style[attr] = arg[0][attr];
                                }
                            });
                        });
                }

             }else if(len === 2) {// css方法中有两个参数时，直接设置style
                ary.forEach((ele,i) => {
                  if(typeof arg[1] === 'number') {// 当设定的是style值为number类型时
                      if(new RegExp(re.join('|')).test(arg[0])) {// 将re以"|"分割为字符串（| 正则中的或），然后以正则规则进行匹配
                          ele.style[arg[0]] = arg[1];
                      }else{
                        ele.style[arg[0]] = arg[1] + 'px';
                      }
                  }else{
                    ele.style[arg[0]] = arg[1];
                  }
                });

             }
             return this; // 链式调用
           }
       }
       fn.init = function(selector) {
           let ele = document.querySelectorAll(selector);
           ele.forEach((ele,i) => this[i] = ele);
       }
       fn.init.prototype = fn;
       window.$ = myQuery;
   });
    // $('#box')//{0:div,1:div}
    // console.log( $('li').css('width',200) );
    // $('li').css('background','red')

    // console.log($('li').css('width'));

    $('li').css({
        width:200,
        height:'100px',
        background:'red',
        opacity:.5
    }).css('border','1px solid #000');

    // $('div').css('height',200); // 生效

    </script>
</body>
</html>
```
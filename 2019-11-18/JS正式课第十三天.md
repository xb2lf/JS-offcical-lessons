[toc]

## JS正式课第十三天

###  滚轮事件  ：onscroll
+ 当有滚动条的时候，滚轮即触发该事件

```
    <script>
       /* 
         滚轮事件  ：onscroll
             当有滚动条的时候，滚轮即触发该事件
        */
        const {offsetTop} = box; // 610
        onscroll = function () {
            let {scrollTop} = document.documentElement;
            // 元素的定位距离小于等于滚动条的距离，就让盒子fixed定位
            if(offsetTop <= scrollTop) {
                box.style.position = 'fixed';
                box.style.top = '10%';
            }else{
                box.style.position = 'absolute';
                box.style.top = '100%';
            }
        }

        box.onclick = function() {
           setTimeout(() => {
            document.documentElement.scrollTop = 0;
           }, 1000);
        }
    </script>
```

### DOM
+ 获取可视区的高度  clientHeight
	+ document.documentElement.clientHeight
+ 获取可视区的宽度 clientWidth 
	+ document.documentElement.clientWidth

> `注意：如果有滚动条，会减去滚动条的宽度或者高度`

### BOM
+  window
	+  window.innerHeight/ window.innerWitdh 如果有滚动条，不会减去滚动条的宽度
	+  window.pageXOffset/window.pageYOffset/  滚动条的距离
###  element.getBoundingClinetRect()
+  element.getBoundingClinetRect();// 它是一个对象，这个对象下放的是元素的绝对位置

```
    <script> 
    /* 
     DOM:获取可视区的高度  clientHeight
        document.documentElement.clientHeight
     
     DOM:获取可视区的宽度 clientWidth 
        document.documentElement.clientWidth  
           注意：如果有滚动条，会减去滚动条的宽度
       
    element.getBoundingClinetRect();// 它是一个对象，这个对象下放的是元素的绝对位置


     BOM:
        window
          window.innerHeight/ window.innerWitdh 如果有滚动条，不会减去滚动条的宽度

          window.pageXOffset/window.pageYOffset/  滚动条的距离
          

     */
     window.onscroll = function(){
        console.log(window.pageYOffset); // 随着滚动条的滚动而产生
    }
    </script>
```
### on事件记录
+ onmouseover  鼠标滑上时触发该事件
+ onmouseout   鼠标离开时触发该事件
+ onclick   鼠标点击时触发该事件
+ onchange 当光标离开输入框时触发
+ onkeyup  当用户释放键盘，输入完成时触发
+ oninput  当用户输入内容时触发
+ onscroll  当滚动条滚动式触发
+ onload  当资源加载成功后触发该事件
+ onerror 当资源加载失败后触发该事件
+  onfocus 当输入框聚焦时触发该事件
+  onblur  当输入框失去焦点时触发该事件

### 图片加载成功与失败后的相应处理

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
    <script>
    const img = document.createElement('img');
    img.src = './img/1x.jpg'; //路径中原图片名称为1.jpg，改为1x.jpg模拟图片加载不成功，以便进行测试和验证
    img.onload = function () {// 图片加载成功后触发该事件
      console.log('加载成功');
    }
    img.onerror = function() {// 图片加载失败后触发该事件
        console.log('加载失败');
        this.src = './img/timg.jpg';
    }
    box.append(img);
    </script>
</body>
</html>
```

### 加载图片进度条（动态）

```
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
    <style>
        * {
            margin: 0;
            padding: 0;
        }

        #box {
            width: 1280px;
            height: 5px;
            border: 1px solid hotpink;
        }

        #box2 {
            height: 5px;
            width: 0%;
            background: rebeccapurple;
            transition: .2s;
        }
    </style>
</head>

<body id="body">
    <div id="box">
        <div id="box2"></div>
    </div>
    <script>
        let ary = [
            'https://goss.veer.com/creative/vcg/veer/800water/veer-159497091.jpg',
            'https://goss.veer.com/creative/vcg/veer/800water/veer-152360031.jpg',
            'https://goss.veer.com/creative/vcg/veer/800water/veer-153725613.jpg',
            'https://goss.veer.com/creative/vcg/veer/800water/veer-153779846.jpg'
        ];// 讲网络资源图片放到一个数组中，以便模拟加载过程循环时使用
        let num = 0; // 给进度条表现样式设置一个初始值
        ary.forEach(item => {
            let img = document.createElement('img');
            img.src = item;
            img.onload = function () {
                box2.style.width = 25 * (++num) + '%';
                console.log(box2.style.width)
                if (25 * num === 100) {
                    body.style.transition = '1s';
                    body.style.background = 'hotpink';
                }
            }
            img.onerror = function () {// 当图片加载失败时，让加载成功继续进行，以进图条可以正常显示
                img.onload();
            }
        })
    </script>
</body>

</html>
```
### 重写forEach

```
    <script>
    /*
        forEach(function(item,index,all){},that)  -> undefined

        map(function(item,index,all){},that) -> 新数组，长度和旧数组一样

        replace()
            2个参数
                第一个参数可以为正则也可以为字符串

                第二个参数可以为字符串也可以为函数


    */
    let ary = [1,1,2,3,4];
    Array.prototype.myForEach = function(callback,that) {
      for (let i = 0; i < this.length; i++) {// this指代的是ary
        callback.call(that,this[i],i,this);
          
      }
    }
      let r = ary.myForEach(function(item,index,all){
        console.log(item,index,all,this);
        return 5;
    },document);// 这里默认window，修改为document
    console.log(r); // undefined
    </script>
```

### 重写map

```
  <script>
    /*
        forEach(function(item,index,all){},that)  -> undefined

        map(function(item,index,all){},that) -> 新数组，长度和旧数组一样

        replace()
            2个参数
                第一个参数可以为正则也可以为字符串

                第二个参数可以为字符串也可以为函数


    */
    let ary = [1,1,2,3,4];
    Array.prototype.myMap = function (callback,that) {
      let arr = [];
      for (let i = 0; i < this.length; i++) {// this指代的是ary
       arr.push(callback.call(that, this[i], i, this));

      }
      return arr;
    }
    let r = ary.myMap(function (item, index, all) {
      console.log(this);
      return '<li>' + item + '</li>';
    },document);// 默认为window，修改为document

    console.log(r);// ["<li>1</li>", "<li>1</li>", "<li>2</li>", "<li>3</li>", "<li>4</li>"]

  </script>
```
### 重写replace

```
    <script>
        /*
            forEach(function(item,index,all){},that)  -> undefined
    
            map(function(item,index,all){},that) -> 新数组，长度和旧数组一样
    
            replace()
                2个参数
                    第一个参数可以为正则也可以为字符串
    
                    第二个参数可以为字符串也可以为函数

                    分析情况，一共五种情况：
                    a字符串，b字符串
                    a字符串，b函数
                    a正则，b字符串
                    a正则，b函数
                    a和b都不满足

                    注：a为正则时，还可以进行分组
    
    
        */

        let str = '珠峰培训峰';//枫

        // console.log(str.replace('峰','枫'))



        String.prototype.myReplace = function (...arg) {
            // debugger
            let [a, b] = arg;
            let str = this.valueOf()
            if (typeof a !== 'string' && a.constructor !== RegExp || typeof b !== 'string' && typeof b !== 'function') {//a(字符串，正则)和b(字符串、函数)两者的要求都达不到，返回完整字符串
                return str;
            }

            //如果是字符串，那么就查找一次，如果是正则就按照规则来
            let s = '';
            if (typeof a === 'string') {
                let i = str.indexOf(a);// 查找的是字符串的话，i表示这个字符串第一次出现的位置
                if (i === -1) {
                    //如果没有找到要替换的内容，就直接返回原字符串
                    return str;// 返回原字符串
                } else {// i是一个正数，a在字符串中存在
                    if (typeof b === 'string') {// 如果b是字符串
                        //珠峰培训峰
                        let aa = str.substring(0, i); //珠 从0开始截取到a出现的位置（不包括a出现的位置）
                        //珠 + 峰培 + 训峰
                        let bb = str.substring(i + a.length);//训峰 从i之后一直截取到字符串末尾
                        return aa + b + bb; // 返回值是讲刚刚截取的两个字符串和作为替换值的字符串进行拼接
                    } else if (typeof b === 'function') {
                        let aa = str.substring(0, i); //珠
                        //珠 + 峰培 + 训峰
                        let bb = str.substring(i + a.length);//训峰
                        return aa + b(a, i, str) + bb;
                    }
                }
            } else if (a.constructor === RegExp) {// 如果a是正则的话
                //第一个参数是正则
                /*
                    match(/峰/g)
                    search(/峰/)  -1
                */
                let ary = str.match(a);
                if (ary === null) { //如果找不到匹配项就返回原字符串
                    return str;
                }

                let i = str.search(a);// a第一次出现的位置

                // console.log(ary);// 查看通过正则方法match匹配后返回的数组

                if (typeof b === 'string') {// 如果b是字符串的话
                    if (ary.length > 1) { //有g
                        //把所有的要替换字符的位置拿到
                        // let indeAry = [];//存每次匹配项的索引
                        // let index = 0;
                        // while(str.indexOf(ary[0],index)!=-1){
                        //     indeAry
                        // }
                        return str.split(ary[0]).join(b);

                    } else {
                        //珠峰培训峰
                        let aa = str.substring(0, i); //珠
                        //珠 + 峰培 + 训峰
                        let bb = str.substring(i + ary[0].length);//训峰
                        return aa + b + bb;
                    }
                } else if (typeof b === 'function') {// b为函数时

                    if (ary.length > 1) {
                        /*
                            此处需要循环，需要把每次匹配的索引获取到
                        */
                        return str.split(ary[0]).join(b(ary[0], i, str));
                    } else {
                        let aa = str.substring(0, i); //珠
                        //珠 + 峰培 + 训峰
                        let bb = str.substring(i + ary[0].length);//训峰
                        return aa + b(ary[0], i, str) + bb;
                    }

                }

            }

        }
        // console.log(str.myReplace('峰培','枫配'))


        // str.myReplace('峰培',($0,$1,$3,$4)=>{
        //     console.log($0,$1,$3,$4);
        //     return '枫配'
        // })

        console.log(str.replace(/峰/g, ($0, $1, $3, $4) => {
            console.log($0, $1, $3, $4);
        }))

    </script>
```


### search() 方法
+ 字符串方法
+ 用于检索字符串中指定的子字符串，或检索与正则表达式相匹配的子字符串。
+ stringObject.search(regexp)
> `regexp 该参数可以是需要在 stringObject 中检索的子串，也可以是需要检索的 RegExp 对象。注释：要执行忽略大小写的检索，请追加标志 i。`
+ 返回值   stringObject 中第一个与 regexp 相匹配的子串的起始位置。
> `注释：如果没有找到任何匹配的子串，则返回 -1`

> `search() 方法不执行全局匹配，它将忽略标志 g。它同时忽略 regexp 的 lastIndex 属性，并且总是从字符串的开始进行检索，这意味着它总是返回 stringObject 的第一个匹配的位置。`

```
<script type="text/javascript">

var str="Visit W3School!"
document.write(str.search(/w3school/i))

</script>
```


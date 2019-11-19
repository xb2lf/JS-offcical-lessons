[toc]

## JS正式课第十四天

### findIndex
+ findIndex(callback)   找到回调函数中return后符合条件的索引值，找不到返回-1
+ callback(数组每项，索引，all)

### 正则中exec

#### exec的小秘密

+ 如果是一个变量的正则，每次不断的去用正则调用exec，返回的结果总是下次匹配结果，如果匹配不到，返回nul
+ lastIndex是可以拿到当前匹配项之后第一个字符的位置

```
 <script>
    /* 
    exec的小秘密
       如果是一个变量的正则，每次不断的去用正则调用exec，返回的结果总是下次匹配结果，如果匹配不到，返回nul

       lastIndex是可以拿到当前匹配项之后第一个字符的位置
     */

    let str = 'abababab';
    let re = /a/g;
    console.log(re.lastIndex);// 0
    console.log(re.exec(str));// ["a", index: 0, input: "abababab", groups: undefined]
    console.log(re.lastIndex);// 1
    console.log(re.exec(str));// ["a", index: 2, input: "abababab", groups: undefined]
    console.log(re.lastIndex);// 3
    console.log(re.exec(str));// ["a", index: 6, input: "abababab", groups: undefined]
    console.log(re.lastIndex);// 5
    console.log(re.exec(str));// ["a", index: 8, input: "abababab", groups: undefined]
    console.log(re.exec(str));// null
    </script>
```

```
<script>
    /* 
    exec的小秘密
     */

    let str = 'abababab';
    let re = /(a)/g;
    console.log(re.exec(str));// ["a", "a", index: 0, input: "abababab", groups: undefined]
    console.log(re.exec(str));// ["a", "a", index: 2, input: "abababab", groups: undefined]
    console.log(re.exec(str));// ["a", "a", index: 4, input: "abababab", groups: undefined]
    console.log(re.exec(str));// ["a", "a", index: 6, input: "abababab", groups: undefined]
    console.log(re.exec(str));// null
    </script>
</body>
```

### 重写replace

#### 重写replace(第一个参数是正则，第二个参数是函数)

```
   <script>
        /* 
        
         re:匹配的正则
         str:整个字符串
         cb:回调函数

         返回的是一堆新的字符串

         解决的是replace，第一个参数是正则，第二个参数是函数
         */
        let str = 'abacababcbacabc';
        let re = /a/g;
        function replace(str, re, cb) {
            let str2 = ''; // 最后改变的结果
            let ary = re.exec(str);// 让第一次能够进去while中(找到第一次的位置)
            let rep = '';// 函数return的结果
            let reAry = []; //每次返回要修改字符的数组
            let num = 0;
            let noREp = [];// 不替换的
            while (ary) {
                // console.log(ary);
                let {index} = ary; // 解构出每次匹配的索引
                reAry.push(cb(...ary, index, str));
                noREp.push(str.substring(num,re.lastIndex-ary[0].length));
                num = re.lastIndex;
                ary = re.exec(str);
            }
            // 没修改的 + 修改的 = 最新的字符串
           noREp.forEach((old,i) => {
               str2 += (old + reAry[i]);
           })
           return str2;
        }
        let s = replace(str, /ba/g, function ($0,$1,$2,$3,$4,$5) {
            console.log($0,$1,$2,$3,$4,$5);
            return 'ac';
        });
        console.log(s);//'aaccaacbcac'
    </script>
```

### 防抖和节流

```
     /*
    
        第一个:（停下来才触发）  防抖
            当频率很高触发事件的的时候都不执行事件函数中的代码，
            只有停下来的时候再执行


            debounce(回调函数,延迟多少时间)


        第二个:（降频率） 节流
            每隔固定时间执行一次事件函数中的代码（0-100  10）
            
            比如每隔200s
    */  
```
#### 防抖

```
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
</head>
<body style="height: 3000px">
    <script>
         /*
    
        第一个:（停下来才触发）  防抖
            当频率很高触发事件的的时候都不执行事件函数中的代码，
            只有停下来的时候再执行


            debounce(回调函数,延迟多少时间)


        第二个:（降频率） 节流
            每隔固定时间执行一次事件函数中的代码（0-100  10）
            
            比如每隔200s
        防抖(debounce) 和 节流(throttling) 
    */ 
    function fn(ev) {
        console.log('触发了',ev,this); // 触发了 Event {isTrusted: true, type: "scroll", target: document, currentTarget: null, eventPhase: 0, …} #document

    }
    document.onscroll = debounce(fn,200);
    function debounce(cb,time) {
       let timer;
       return function(...arg) {
           // 当事件触发时的时候就先关闭上次的timer
           if(timer) {
               clearTimeout(timer);
           }
           timer = setTimeout(() => {
               cb.call(this,...arg);
           }, time);
       }
    }
    </script>
</body>
</html>
```

#### 节流

```
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
</head>
<body style="height:3000px">
    <script>
    /*
    
        第一个:（停下来才触发）  防抖
            当频率很高触发事件的的时候都不执行事件函数中的代码，
            只有停下来的时候再执行


            debounce(回调函数,延迟多少时间)


        第二个:（降频率） 节流
            每隔固定时间执行一次事件函数中的代码（0-100  10）
            
            比如每隔200s

     防抖(debounce) 和 节流(throttling)    
    */
    function fn(ev){
        // console.log(ev);
        console.log('触发了节流',ev,this);
    }
    document.onscroll = throttling(fn,200);
    function throttling(cb,time) {
        let prevtime = 0; // 触发事件前的上一次时间初始值
        return function(...arg) {
            let nowtime = +new Date;// new Date前加（+）是让时间格式从基本字符串样式转换为时间戳(数字)
            // console.log(nowtime - prevtime);
            if(nowtime - prevtime > time) {
                cb.call(this,...arg);
            }
            prevtime = nowtime;
        }
    }
    /* 
    document.onscroll = throttling(fn,200);
    console.log(nowtime - prevtime);
    经修改不同的阀值，进行测试，已生效
    */
     </script>
</body>
</html>
```

### 瀑布流加防抖或者节流终极版

##### 页面布局
```
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link rel="stylesheet" href="./css/index.css">
    <title>Document</title>
</head>
<body>
    <div id="box">
        <ul class="head">
            <li><img src="./img/head1.png" alt=""></li>
            <li><img src="./img/head2.jpg" alt=""></li>
            <li><img src="./img/head3.jpg" alt=""></li>
            <li><img src="./img/head4.jpg" alt=""></li>
            <li><img src="./img/head5.jpg" alt=""></li>
        </ul>
        <ul class="body">
            <!-- <li>
                <div class="img_box">
                    <img src="./img/1.jpg" alt="">
                    <p class="desc">所谓伊人，在水一方！</p>
                    <p class="author">泰勒·斯威夫特</p>
                </div>
            </li> -->
            
        </ul>
    </div>
<script src="./js/index.js"></script>
</body>
</html>
```
##### css样式

```
*{
    margin: 0;
    padding: 0;
    list-style: none;
}
body{
    background: #eee;
}
#box{
    margin: auto;
    /* width: 1244px; */
}
.head{
    width: 100%;
    height: 142px;
    overflow: hidden;
    display:none;
}
.head li{
    float: left;
    width: 236px;
    height: 126px;
    margin: 0 16px 16px 0;
    overflow: hidden;
}
.head li:nth-child(5){
    margin-right: 0;
}
.head li img{
    width: 100%;
}
.body{
    width: 100%;
    _overflow: hidden;
    position: relative;
    margin:0 auto;
}
.body li{
    /* float: left; */
    width: 236px;
    /* margin: 0 16px 16px 0; */
    border-radius: 5px;
    position: absolute;
    left:0;
    top:0;
   transition: .5s;
}
.body li:nth-child(5){
    margin-right: 0;
}
.body li div{
    transition: all 0.2s;
    margin-bottom: 16px;
    background: #fff;
}
.body li div:hover{
    box-shadow: 0px 5px 6px 6px #ccc;
    transform: translateY(-2px)
}
.img_box{
    width: 100%;
}
.img_box img{
    width: 100%;
    opacity: 0;
    transition: .5s;
}
.img_box .desc{
    font-size: 15px;
    padding:0 10px;
    color: #ccc;
    height: 35px;
    line-height: 35px;
    border-bottom: 1px solid #f2f2f2;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
}
.img_box .author{
    font-size: 15px;
    height: 30px;
    line-height: 30px;
    text-align: center
}
```

##### json数据

```
[{
    "id": 1,
    "pic": "./img/1.jpg",
    "author": "泰勒·斯威夫特",
    "desc":"所谓伊人，在水一方！",
    "height": "314"
},
{
    "id": 2,
    "pic": "./img/5.jpg",
    "author": "泰勒·斯威夫特",
    "desc":"所谓伊人，在水一方！",
    "height": "420"
},
{
    "id": 3,
    "pic": "./img/7.jpg",
    "author": "泰勒·斯威夫特",
    "desc":"所谓伊人，在水一方！",
    "height": "136"
},
{
    "id": 4,
    "pic": "./img/4.jpg",
    "author": "冉大师",
    "desc":"所谓伊人，在水一方！",
    "height": "354"
},
{
    "id": 5,
    "pic": "./img/2.jpg",
    "author": "泰勒·斯威夫特",
    "desc":"所谓伊人，在水一方！",
    "height": "342"
},
{
    "id": 8,
    "pic": "./img/5.jpg",
    "author": "泰勒·斯威夫特",
    "desc":"所谓伊人，在水一方！",
    "height": "420"
},
{
    "id": 52,
    "pic": "./img/2.jpg",
    "author": "泰勒·斯威夫特",
    "desc":"所谓伊人，在水一方！",
    "height": "342"
},
{
    "id": 38,
    "pic": "./img/5.jpg",
    "author": "泰勒·斯威夫特",
    "desc":"所谓伊人，在水一方！",
    "height": "420"
},
{
    "id": 6,
    "pic": "./img/6.jpg",
    "author": "泰勒·斯威夫特",
    "desc":"所谓伊人，在水一方！",
    "height": "354"
},
{
    "id": 7,
    "pic": "./img/8.jpg",
    "author": "泰勒·斯威夫特",
    "desc":"所谓伊人，在水一方！",
    "height": "197"
},
{
    "id": 9,
    "pic": "./img/3.jpg",
    "author": "泰勒·斯威夫特",
    "desc":"所谓伊人，在水一方！",
    "height": "354"
},
{
    "id": 10,
    "pic": "./img/4.jpg",
    "author": "泰勒·斯威夫特",
    "desc":"所谓伊人，在水一方！",
    "height": "354"
},
{
    "id": 11,
    "pic": "./img/6.jpg",
    "author": "泰勒·斯威夫特",
    "desc":"所谓伊人，在水一方！",
    "height": "354"
}]
```

##### js逻辑

```
/* 
window.onresize   当浏览器窗口缩放的时候触发
*/

const box = document.querySelector('.body');
const head = document.querySelector('.head');
const picw = 236; //图片的宽度
const ml = 10; // margin-left
const boxt = 66; // box的top值
let clinetW = document.documentElement.clientWidth;// 可视区的宽度
let len = Math.floor(clinetW / (picw + ml)); // 看下一行可以放下几个li元素
// 计算ul的宽度，以此来进行自适应窗口
box.style.witdh = (len * (picw + ml)) - ml + 'px';
// console.log(len); // 测试验证下ul的宽度（因为是被内容撑起来的）
let aryx = []; // 存放图片加左边距的lef值，初始值为零，以此作为定位，按照最小高度的li渲染页面
let aryy = []; // 存放图片的top值，初始值为零，以此作为定位，按照最小高度的li渲染页面
for (let i = 0; i < len; i++) {
    aryx[i] = i * (picw + ml);// 将每个li对应的初始letf值写进数组
    aryy[i] = 0; // 将每个li对应的初始 top值都设为零
}
function minIndex(ary) {
    let min = Math.min(...ary);
    // 根据最短的值，找到对应的索引，有了这个索引就能应对li
    let index = ary.findIndex(item => item === min);
    return {
        index,
        min,
    }
}

//根据找到每次渲染最短的li和相对应的索引值，对页面进行动态写入，渲染页面
function render() {
    fetch('./data.json').then(d => d.json()).then(ary => {
        //  console.log(ary);
        //在循环数组的过程当中去计算每个li的高度，找到最短的li
        ary.forEach((item, i) => {
            let { index } = minIndex(aryy);// 找出数组中top值最小的索引
            let li = document.createElement('li');// 创建一个li元素，以便按照顺序动态写入页面，来渲染页面
            // 设置每个li对应的top值和left值
            li.style.cssText = `top:${aryy[index]}px;left:${aryx[index]}px`;
            let div = document.createElement('div');
            div.className = 'img_box';
            let img = document.createElement('img');
            img.src = item.pic;

            let p1 = document.createElement('p');
            let p2 = document.createElement('p');
            p1.className = 'desc';
            p1.innerText = item.desc;
            p2.className = 'author';
            p2.innerText = item.author;
            div.append(img);
            div.append(p1);
            div.append(p2);
            li.append(div);
            box.append(li);
            setTimeout(() => {
                img.style.opacity = 1;
            }, 200);
            // 每次添加完一个li之后，把当前li的高度+左间距 赋值到数组的对应项中，以便下次再进行比较
            aryy[index] += (boxt + item.height * 1 + 20);// 按照数组中top值最小的索引对应的值加上每个里对应的内容撑起的高度再加上下边距20px
        });
    });
}
render();
// 防抖
function debounce(cb, time) {
    let timer;
    return function (...arg) {
        // 当事件触发时的时候就先关闭上次的timer
        if (timer) {
            clearTimeout(timer);
        }
        timer = setTimeout(() => {
            cb.call(this, ...arg);
        }, time);
    }
}

//节流
function throttling(cb, time) {
    let prevtime = 0,
        timer;
    return function (...arg) {
        let nowTime = +new Date;
        // console.log(nowTime - prevtime)
        if (nowTime - prevtime > time) {
            cb.call(this, ...arg);
        } else {
            clearInterval(timer);
            timer = setTimeout(() => {
                // console.log(+new Date - prevtime);
                if (+new Date - prevtime > time) {
                    cb.call(this, ...arg);
                }
            }, time);
        }
        prevtime = nowTime;
    }
}
// 滚动条滚动的时候判断是否触底
let wiH = window.innerHeight; // 可视区的高度
window.onscroll = debounce(fn, 200);
// window.onscroll = throttling(fn,1000);
function fn() {
    // 判断ul的高度是否比可视区要大，如果小于可视区高度，那么就终止加载代码执行
    // if (box.scrollHeight < wiH) return;
    let {index} = minIndex(aryy);// li最短的高度
    let scroll = window.pageYOffset; // 滚动条的距离
    if (wiH + scroll >= aryy[index]) {
        console.log('已到达页面底部');
        render();
    }
}
// 当浏览器缩放的时候，重新计算下可视区每一行能够放几个li
window.onresize = function () {
    clinetW = document.documentElement.clientWidth;// 可视区的宽度
    len = Math.floor(clinetW / (picw + ml)); // 看下一行可以放下几个li元素
    // 计算ul的宽度，以此来进行自适应窗口
    box.style.witdh = (len * (picw + ml)) - ml + 'px';
    // 把两个数组的长度归零清空，然后重新计算相应的值
    aryx.length = 0;
    aryy.length = 0;
    wiH = window.innerHeight; // 可视区的高度
    for (let i = 0; i < len; i++) {
        aryx[i] = i * (picw + ml);// 将每个li对应的初始letf值写进数组
        aryy[i] = 0; // 将每个li对应的初始 top值都设为零
    }
    // 获取所有的li，然后按照顺序重新动态写入页面，渲染页面
    const lis = box.querySelectorAll('li');
    lis.forEach((ele, i) => {
        let { index } = this.minIndex(aryy);//找出数组中top值最小的索引
        ele.style.cssText = `top:${aryy[index]}px;left:${aryx[index]}px`;// 设置每个li对应的top值和left值
        // 设置完每个li对应的top值和left值后，把当前li的高度+左间距 赋值到数组的对应项中，以便下次再进行比较
        aryy[index] += (ele.scrollHeight + 10); // 按照数组中top值最小的索引对应的值加上每个里对应的内容撑起的高度再加上下边距10px

    });

}
```
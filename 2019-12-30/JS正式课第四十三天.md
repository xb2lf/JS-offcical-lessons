[toc]

## JS正式课第四十三天

### Vue

    - jquery    52.8k
    - angular   55.8k
    - React     141k
    - vue       155k
        - MVVM框架  Model View  View Model(双向数据绑定)
        - M-model数据，V-view视图  C-控制器control

        - 难点:父子组件的传递,路由配置和使用,生命周期,vuex,**逻辑**,做项目

> https://cn.vuejs.org/

- 渐进式（弱主张，逐渐学习的，有过程的学习，vue全家桶:vue,vue-router,vuex,vue-cli）：JavaScript 框架

### 使用vue
    - 引vue
    - 在html里挂载一个根元素
        ```
            <div id="app"></div>
        ```
    - 实例化vue  -> new Vue({})

    - 配置参数
        - el:'挂载元素'（不能挂body和html）,
        - data（存数据）:在**new Vue**下值为***对象***

    - 输出数据用 双花括号 {{放数据名称即可}} 小胡子

### 指令
    - 为了方便开发者开发，vue中使用了指令，这些指令包含了很多元素身上的属性和js的一些内置方法

    v-text  ----> innerText
    v-html  ----> innerHTML
    v-show  ----> display:block/none  布尔值
    v-if  看下布尔值是否为true，为true就渲染否则就不渲染
    v-else 限制:它上面必须是v-if或者v-else-if
    v-else-if 限制：前一兄弟元素必须有 v-if 或 v-else-if。
    v-on:（缩写@）事件名="事件函数|简单语法"
        一般事件函数是放在methods下
        - $event  
            如果不传参，第一个参数就是事件对象
            *** 如果传了参还想拿到事件对象，需要在模板中的事件函数内传一个
        - 修饰符  .13  .enter .stop  .prevent .once ...
        - 解绑事件可以使用
            ```
                @mousedown="onoff && down($event)"
                当onoff是真的就添加事件，假的就解除事件
            ```

    v-for="val,key in 数据"  遍历对象或者数组
        如果是数组val就是数组的成员，key就是索引
        如果是对象val键值，key键名
#### v-bind

```
/*
        如果说属性需要**动态操作**，那么就使用v-bind:xx
        缩写:   :

        :style="{属性名:属性值（可以为数据）}"
        :style="[{属性名1:属性值1（可以为数据）},{属性名2:属性值2（可以为数据）}]"
        :class="{类名:布尔值}"
        v-bind="{data:1}"  没有具体的属性可以使用v-bind=对象（批量设置属性）
    */
```
#### v-model   在表单控件或者组件上创建双向绑定

```
预期：随表单控件类型不同而不同。

限制：
<input>
<select>
<textarea>
components


修饰符：
.lazy - 取代 input 监听 change 事件
.number - 输入字符串转为有效的数字
.trim - 输入首尾空格过滤

```

### 计算属性
#### computed   上来就执行一次，当数据发生了变化也会继续执行

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
    <div id="app">
        <input type="text" v-model="val">
        <p>{{reverseVal}}</p>
    </div>
    <script src="./vue.js"></script>
    <script>
    new Vue({
        el:"#app",
        data:{
            val:'学 大 华 清',
        },
        computed:{
            reverseVal() {
                return this.val.split('').reverse().join('')
            }
        }
    })
    </script>
</body>
</html>
```
### getter和setter

#### Object.defineProperty(obj, prop, desc)    数据拦截（劫持）  双向数据绑定

```
    <script>
     let obj = {name:'小李'};

     Object.defineProperty(obj,'age',{
         value:2,
         writable:false, // 属性是否可被修改，默认ture
         enumerable:false,// 属性是否可被枚举，默认ture
         configurable:false, // 是否可以被删除，默认ture
     })

     console.log(obj.age); // 2

     obj.age = 12;
     console.log(obj.age);//未被修改 输出为2，

     for (const attr in obj) {
         console.log(attr); // 未枚举到属性age，输出为name
     }

    console.log(delete obj.name); // ture
    console.log(delete obj.age); // false
    console.log(obj);  //age未被删除，输出为{age: 2}
    </script>
```

```
    <script>
     let obj = {name:'小李'};
     let num = 2;
     obj.age = 2;
     Object.defineProperty(obj,'age',{
         enumerable:false,// 属性是否可被枚举，默认ture
         configurable:false, // 是否可以被删除，默认ture
         get() {//当读取这个属性的时候触发
            console.log('在读取时已触发'); // 在读取时已触发(触发两次)  
            //return后的内容就是读操作后的结果（必须写return）

            return  num
         },
         set(val) {
             //当写操作（这个属性）的是时候触发(可以没有return的)
             console.log('在写入时已触发'); // 在写入时已触发
             console.log(val); // 12
             num = val; // 
         }
     })

     console.log(obj.age); // 2  读取

     obj.age = 12; // 写入
     console.log(obj.age);// 12  读取
    </script>
```
#### getter和setter相关面试题

```
    <script>
    let obj = {name:'小李'};
    let num = 0;
    Object.defineProperty(obj,"age",{
        get() {
            return num +=2.7;
        }
    });
    console.log(obj.age < 3 && obj.age > 5); // true
    console.log(obj.age); // 8.100000000000001
    </script>
```

#### vue中实例

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
    <div id="app">
        <input type="text" v-model:lazy="fullName">
        <p>{{fullName}}</p>
        <p>{{firstName}}</p>
        <p>{{lastName}}</p>
    </div>
    <script src="./vue.js"></script>
    <script>
        new Vue({
           el:"#app",
           data:{
               firstName:'晓光',
               lastName:'南',
           },
           computed:{
              fullName:{
                 //可以为一个对象，里面可以设置get，set
                 get() {
                     return this.firstName + ' ' + this.lastName;
                 },
                 set(val) {
                     let ary = val.split(' ');
                     this.firstName = ary[0];
                     this.lastName = ary[ary.length - 1];
                 } 
              }
           }
        })
    </script>
</body>
</html>
```
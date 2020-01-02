[toc]

## JS正式课第四十四天

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
        - 在组件里面data为函数，函数要return {num:0}

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
### 钩子函数

```
        钩子函数
        
        回调函数（某个条件成立触发这个函数）
```
### v-model回顾

```
    /*
        双向数据绑定（数据驱动视图，视图也可以改变数据）
        绑v-model的目的就是想让用户操作界面的时候，顺便帮我操作数据

        只要是遇到了表单元素，就要思考一下是否使用v-model
    */
```

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
        <!-- @input="change" id="txt"-->
    <!-- <input  v-model="val" type="text" /> -->
        <!-- {{val}} -->
        <input 
            type="text" 
            v-model="val"
            @keyup.13="click"
        />
        <!--  @keyup.13="click"还可以写成 @keyup.enter="click" -->
        <!-- @keyup="up" -->
        <button
            @click="click"
        >点击</button>
        <ul>
            <li 
                v-for="(val,key) in ary"
                @click="rm(key)"
            >{{val}}</li>
        </ul>
        <p>{{ary}}</p>
   </div>
    <script src="./vue.js"></script>
    <script>
    new Vue({
        el:'#app',
        data:{
            val:'',
            ary:[]
        },
        methods:{
            click(){
                // console.log(txt.value);
                this.ary.push(this.val);
                this.val = '';
            },
            rm(key){
                this.ary = this.ary.filter((e,index)=>index!==key);
            }
             // 直接这样调用太麻烦，不如直接在输入框写入@keyup.13="click"
            // up(ev){
            //     if(ev.keyCode === 13){
            //         this.ary.push(this.val);
            //         this.val = '';
            //     }
            // }
        }
    })
    /* 
    这么写可以实现功能，但有一个bug，如果几个目标元素的innerText一样的话，会把同时把这几个目标元素的数据都删除，所以需要改进
     */
    </script>
</body>
</html>
```
###  computed和管道符
+ computed: 数据的第二次处理
+ 管道符:（数据的第二次处理）

### 过滤器

```
局部注册:
                filters:{
                    fn(val管道符之前的值){
                        return 基于管道符之前的值进行二次处理
                    }
                }

            全局注册:
                Vue.filter('名字',function(val管道符之前的值){
                    return 基于管道符之前的值进行二次处理
                })

                全局注册了之后，只要是当前Vue实例下的所有组件都能享受到这个全局注册的过滤器
                局部注册，只有当前这个组件才能享受

```
+ 注册全局的过滤器，要放在new Vue的上方
+ 如果全局和局部都注册了相同名字的过滤器，那么优先级最高的是局部

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
        <input type="text" v-model:number="val">
        <p> {{ val | fnn }}</p>
        <p>{{val}}</p>
    </div>
    <script src="./vue.js"></script>
    <script>
        /* 全局注册过滤器 */
        //注册全局的过滤器，要放在new Vue的上方
        Vue.filter('fnn',function(val) {
            console.log(val);
            return val < 10 ? '0' + val : '' + val;
        });
    new Vue({
        el:"#app",
        data:{
            val:'清华大学',
        },
        methods: {
            // fn() {
            //     return this.val.split('').reverse().join('');
            // },
        },
        computed:{
            // reverse() {
            //     return this.val.split('').reverse().join('');
            // }
        },
        filters:{
            rever(val){
                return val.split('').reverse().join('');
            },
            clearNum(val){
                return val.replace(/\d+/,'')
            },
        }
    })
    </script>
</body>
</html>
```
### watch
+ watch监听的都是data中的数据
+ watch默认只能监听一层数据，如果有多层是监听不到的

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
    <div  id="app">
        <input type="text" v-model="txt" @keyup.add.13="add">
        <ul>
            <li
            v-for="(val) in ary"
            >
            <input type="checkbox" v-model="val.checked">
            <span>{{val.val}}</span>
            </li
                >
        </ul>
        <p>{{ary}}</p>
    </div>
    <script src="./vue.js"></script>
    <script>
    new Vue({
      el:"#app",
      data:{
          txt:'',
          ary:getIem(),
      },
      methods: {
          add() {
              this.ary.unshift({
                  id:Date.now(),
                  val:this.txt,
                  checked:false,
              });
              this.txt = '';
          },
      },
       //watch监听的都是data中的数据
        //watch默认只能监听一层数据，如果有多层是监听不到的
      watch: {
           ary(){
                console.log('触发');
                localStorage.setItem('data',JSON.stringify(this.ary))
            }
      },
    });

    function getIem(){
        let v = localStorage.getItem('data');
        return v && JSON.parse(v) || [{
                id:0,
                val:'vue真的好学',
                checked:true
            },{
                id:1,
                val:'vue真的简单',
                checked:false
            }]
    }
    </script>
</body>
</html>
```

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
    <div  id="app">
        <input type="text" v-model="txt" @keyup.add.13="add">
        <ul>
            <li
            v-for="(val) in ary"
            >
            <input type="checkbox" v-model="val.checked">
            <span>{{val.val}}</span>
            </li
                >
        </ul>
        <p>{{ary}}</p>
    </div>
    <script src="./vue.js"></script>
    <script>
    new Vue({
      el:"#app",
      data:{
          txt:'',
          ary:getIem(),
      },
      methods: {
          add() {
              this.ary.unshift({
                  id:Date.now(),
                  val:this.txt,
                  checked:false,
              });
              this.txt = '';
          },
      },
       //watch监听的都是data中的数据
        //watch默认只能监听一层数据，如果有多层是监听不到的
      watch: {
        ary:{
                handler(val,oldVal){
                    localStorage.setItem('data',JSON.stringify(val))
                    // console.log('新'+JSON.stringify(val))
                    // console.info('旧'+JSON.stringify(oldVal))
                },
                //深度监听
                deep:true
            }
      },
    });

    function getIem(){
        let v = localStorage.getItem('data');
        return v && JSON.parse(v) || [{
                id:0,
                val:'vue真的好学',
                checked:true
            },{
                id:1,
                val:'vue真的简单',
                checked:false
            }]
    }
    </script>
</body>
</html>
```

#### computed和watch的区别是什么？

+ watch（只有数据发生改变才触发，还可以进行深度监听）、computed（上来就触发一次，数据改变再继续触发）都是监听数据

### ref  快速定位一个元素或者组件
+  定义:    元素或者组件上添加一个ref的属性即可    <div ref="box">
+  获取: this.$refs.box

```
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Document</title>
<style>
</style>
</head>
<body>
    <div id="app">
        <button
            @click="fn"
        >点击取值</button
            >
       <div id="box" ref="box">123456</div>
    </div>
<script src="./vue.js"></script>
<script>
    /*
        ref:为了让你快速定位一个元素或者组件

        定义:
            元素或者组件上添加一个ref的属性即可
                <div ref="box">

        获取:
                this.$refs.box
        
    */
    new Vue({
        el:'#app',
        data:{
            val:'你是一直小狼'
        },
        methods:{
            fn(){
                console.log(this.$refs.box);
            }
        }
    });
</script>
</body>
</html
```
###  v-cloak 加载的时候不显示小胡子（`{{}}`）

```
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Document</title>
<style>
[v-cloak]{
    display: none;
}
</style>
</head>
<body>
    <div id="app">
       <div v-cloak>
            {{ msg }}
       </div>
    </div>
<script src="./vue.js"></script>
<script>
    /*
        v-cloak 加载的时候不显示小胡子
    */
    new Vue({
        el:'#app',
        data:{
            msg:'haha'
        },
        methods:{
            
        }
    });
</script>
</body>
```

### 组件

```
    
    /*
        定义子组件:
            Vue.component('组件的名字',{
                template:`<div></div>`,

            })
        组件的名字如果是直接引vue.js，那么尽量不要使用驼峰命名,
        因为命名之后，使用子组件的时候会报错，如果非要使用把
        子组件改成烤串命名
    */
    

    /*
        注册组件必须在new Vue上方   
    */
```


```
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Document</title>
<style>
[v-cloak]{
    display: none;
}
</style>
</head>
<body>
    <div id="app">
        我是父组件
        <hr />
       <my-app></my-app>
    </div>
<script src="./vue.js"></script>
<script>
    
    /*
        定义子组件:
            Vue.component('组件的名字',{
                template:`<div></div>`,

            })
        组件的名字如果是直接引vue.js，那么尽量不要使用驼峰命名,
        因为命名之后，使用子组件的时候会报错，如果非要使用把
        子组件改成烤串命名
    */
    

    /*
        注册组件必须在new Vue上方   
    */

    Vue.component('my-app',{
        template:`<div 
            @click="click"
        >我是子组件 {{ num }}</div>`,
        data(){
            return {
                num:0
            }
        },
        methods:{
            click(){
                alert(1);
            }
        }
    });

    new Vue({
        el:'#app',
        data:{
            msg:'haha'
        },
        methods:{
            
        }
    });

    

</script>
</body>
</html>
```

####     **** 模板中顶层只能有一个元素
+ 即：

```
 template:`
            <div>
                <div>1</div>
                <span>Vue真的太简单了</span>
                <btn></btn>
            </div>`,
```

####  父子组件的传递:
> `  1.子组件上写一个v-bind:自定义*行间属性*="父级中的数据"`
      `2.子组件（对象）上定义一个props的属性，属性的值可以为数组也可以为对象`
      `如果是数组['第一步自定义行间属性名字']`
          `props:['fnum']`
     ` 3.直接用{{}} + props中的名字就可以使用了`
         ` {{ fnum }}`

  `简单总结:`
     ` (1)往子组件的行间属性上传值`
      `(2)子组件通过props去接收`
```
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Document</title>
<style>
[v-cloak]{
    display: none;
}
</style>
</head>
<body>
    <div id="app">
        <button @click="++num">父级的按钮{{num}}</button>
        <hr>
        <btn :fnum="num" page="1" :ary="ary"></btn>
    </div>
<script src="./vue.js"></script>
<script>
    /*
        父子组件的传递:
            1.子组件上写一个v-bind:自定义*行间属性*="父级中的数据"
            2.子组件（对象）上定义一个props的属性，属性的值可以为数组也可以为对象
                如果是数组['第一步自定义行间属性名字']
                    props:['fnum']
            3.直接用{{}} + props中的名字就可以使用了
                    {{ fnum }}

            简单总结:
                (1)往子组件的行间属性上传值
                (2)子组件通过props去接收
    */
    const btn = {
        template:`<div>
            <button>按钮{{fnum}} {{page}}</button>
            <ul>
                <li v-for="val in ary">{{val}}</li>
            </ul>
        </div>`,
        props:['fnum','page','ary']
    }


    // //第一种注册组件方式:
    // Vue.component('btn',btn);

     //第二种注册组件方式:components

    new Vue({
        el:'#app',
        data:{
            num:0,
            ary:[1,2,3,4,5]
        },
        components:{
            btn //key为btn，val为叫btn
        }
    })
</script>
</body>
</html>
```
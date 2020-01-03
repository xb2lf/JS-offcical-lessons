[toc]

## JS正式课第四十五天
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

### filter过滤器
    Vue.filter('名字',(val)=>{
        return val.xxx
    })

    {{ val | '名字' }}


> 局部:
    - new Vue({filters:{
        名字:(val){

        }
    }})

### computed  计算属性（通过data中的数据变化进行二次操作且一上来就执行一次）
    ```
        computed:{
            //getter
            revers(){
                return xxx
            }

            revers:{
                get(){
                    return  xxx
                },
                set(){

                }
            }
        }
    ```
    - getter
    - setter

### watch 通过data中的**指定**数据变化进行二次操作
    ```
        watch:{
            //默认不会深度监听
            ary(){
                xxx
            },
            ary:{
                handler(){

                },
                deep:true   //深度监听
                immediate: true  //一上来就触发
            }
        }
    ```

### ref 为了快速定位元素或者组件
    ```
        <ppa ref="xx">

        this.$refs.xx
    ```

### 组件
    ```
        //放在new Vue上方
        Vue.component('组件名',{
            template:``,  注意的是顶层只能有一个元素
            data(){
                return {
                    ary:[]
                }
            }
        })



        {
            components:{
                组件名:对象
            }
        }

    ```
### 组件的传递
    ```
        传递:
            通过子组件的属性来传
            <div num="3"></div>（静态的） 或者
            <div :num="pnum"></div>（动态的）

        接收:
            {
                props:['num']
            }
    ```

    在父级传递数据给自己的时候，可以让自己拥有父级的数据并且不与父级数据相关联
        1.通过子组件的属性来传
            <div :num="pnum"></div>（动态的）

        2.使用props接收
            {
                props:['num']
            }

        3.把接收过来的数据变成自己的
            {
                props:['num'],
                data(){
                    return {
                        cnum:this.num
                    }
                }
            }


    ```
        子传父:
            1.父级需要定义一个改变自己数据的方法
            2.子级需要定义一个事件，去调用父级的方法
                this.$emit('自定义事件名',可以传参)
            3.在子组件的行间绑定子级的事件，值为父级的修改数据的方法
    ```

### Vue.nextTick  数据改变，DOM更新完成之后触发



    









### 虚拟DOM

```
 old {
                name:'ul',
                className:'list',
                children:[
                    {
                        key:0
                        name:'li',
                        className:'li1',
                        text:'哈哈'
                    }
                ]
            }

            new {
                name:'ul',
                className:'list',
                children:[
                    {
                        key:0,
                        name:'li',
                        className:'li1',
                        text:'哈哈'
                    },
                    {
                        key:1,
                        name:'li',
                        className:'li1',
                        text:'呵呵'
                    }
                ]
            }

            <ul class="list">
                <li class="li1">哈哈</li>
            </ul>

```

#### 上边数据如果只是展示一次

```
<ul id="ul1">
    <li v-for="(val,key) in ary" :key="key"></li>
</ul>

<ul id="ul2">
    <li v-for="(val,key) in ary2" :key="`ul2${key}`"></li>
</ul>
```

### 生命周期图示

![Alt text](./lifecycle.png)
### 组件回顾

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
        <first></first>
        <br />
        <second></second>
        <br />
        <third></third>
    </div>
    <template id="model">
          <div>
            <p>这是代表我的数字{{num}}</p>
            <br />
            <h2>{{txt}}</h2>
          </div>
    </template>
    <script src="./vue.js"></script>
    <script>
     // 第一个全局注册的组件
     const first =  {
         template: `<div>
            <p>第一个子组件</p>
           <h2>{{msg}}</h2>
         </div>`,
         data(){
             return {
                 msg:'看到没？我是第一个全局注册的子组件'
             }
         }
     }
    
    //将first局部注册，并在局部组件内使用
     const second = {
         template:`<div>
                 <p>第二个子组件</p>
                 <h2>{{info}}</h2>
                 <br />
                 <first>看到没？我还是第一个全局注册子组件</first>
                 <br />
         </div>`,
         components:{
             //局部注册的只能在局部组件中使用
             first
         },
         data() {
             return {
                 info:'看到没？我是第一个拥有了局部注册的子组件'
             }
         }
     }

     //第二个全局注册的子组件
     const third = {
         template:'#model',
         data(){
            return {
                num:222,
                txt:'看到没？我是全局注册的第二个子组件'
            }
         }
     }
     Vue.component('first',first);//全局注册在哪里用都可以
     Vue.component('second',second);
     Vue.component('third',third);
     new Vue({
         el:"#app",

     })
    </script>
</body>
</html>
```
#### 组件：父到子的数据传递

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
         <h2>我是父元素</h2>
         <button @click="++num">父元素按钮{{num}}</button>
         <hr />
         <!-- 使用组件 -->
         <module
         :nn="num"
         :yourname="name"
         ></module
            >
    </div>
    <template id="module">
        <div>
            <h5>我是子元素</h5>
        <button>子按钮{{nn+1}}</button>
        <p>我的名字叫:{{yourname}}</p>
        </div>
    </template>
    <script src="./vue.js"></script>
    <script>
        //定义组件
        const module = {
            template:'#module',
            // props:['nn'],
            props: {
                nn: {
                    //如果数据不是指定的数据类型，那么就报错
                    type: Number,//可以是下列原生构造函数中的一种：String、Number、Boolean、Array、Object、Date、Function、Symbol、任何自定义构造函数、或上述内容组成的数组。会检查一个 prop 是否是给定的类型，否则抛出警告 
                    default: 0,//为该 prop 指定一个默认值。如果该 prop 没有被传入，则换做用这个值。对象或数组的默认值必须从一个工厂函数返回。
                },
                yourname:{
                    required:true,// 定义该 prop 是否是必填项。在非生产环境中，如果这个值为 truthy 且该 prop 没有被传入的，则一个控制台警告将会被抛出。
                    validator:function(value) {
                        return /[\u4e00-\u9fa5]+/.test(value);
                    },// 自定义验证函数会将该 prop 的值作为唯一的参数代入。在非生产环境下，如果该函数返回一个 falsy 的值 (也就是验证失败)，一个控制台警告将会被抛出。你可以在这里查阅更多 prop 验证的相关信息。
                }
            },
        }
    new Vue({
        el:'#app',
        data:{
            num:0,
            name:'幸福小天使',
        },
        components:{
            // 在实例里注册组件
            module
        }

    })
    </script>
</body>
</html>
```
#### 组件：子到父的数据传递

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
        <h2>我是父元素</h2>
        <button @@click="changeFn">父元素按钮{{num}}</button>
        <hr /> 
        <!-- 使用组件 -->
        <module
        :nn='num'
        @child="changeFn"
        ></module
            >
    </div>
    <!-- 子组件模板 -->
    <template id="module">
        <div>
            <h5>我是子元素</h5>
            <button @click="add">子按钮{{nn}}</button>
        </div>
    </template>
<script src="./vue.js"></script>
<script>
// 定义子组件
const module = {
            template:'#module',
            props:['nn'],
            methods:{
                add() {
                    this.$emit('child');// 触发当前实例上的事件。附加参数都会传给监听器回调。
                }
            }
}
new Vue({
    el:'#app',
    data:{
        num:0,
    },
    methods: {
        changeFn() {
            this.num++;
        },
    },
    components:{
        // 注册组件
        module
    }
})
</script>
</body>
</html>
```
#### 组件：子接收父的变成自己的并且联动父一起操作数据

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
        <h2>我是父元素</h2>
        <button @click="changeFn">父元素按钮{{num}}</button>
        <hr /> 
        <!-- 使用组件 -->
        <module
        :nn='num'
        @childto="fromChild"
        ></module
            >
    </div>
    <!-- 子组件模板 -->
    <template id="module">
        <div>
            <h5>我是子元素</h5>
            <button @click="add">子按钮{{cnum}}</button>
        </div>
    </template>
<script src="./vue.js"></script>
<script>
// 定义子组件
const module = {
            template:'#module',
            props:['nn'],
            data (){
                return {
                    cnum:this.nn,
                }
            },
            methods:{
                add() {
                    this.cnum += 2;
                    this.$emit('childto',this.cnum);// 触发当前实例上的事件。附加参数都会传给监听器回调。
                }
            }
}
new Vue({
    el:'#app',
    data:{
        num:0,
    },
    methods: {
        changeFn() {
            this.num++;
        },
        fromChild(val) {
            this.num = val;
        }
    },
    components:{
        // 注册组件
        module
    }
})
</script>
</body>
</html>
```
### 自定义指令
+ 参考：https://cn.vuejs.org/v2/guide/custom-directive.html
```
Vue.directive( id, [definition] )
参数：

{string} id
{Function | Object} [definition]
用法：

注册或获取全局指令。

// 注册
Vue.directive('my-directive', {
  bind: function () {},
  inserted: function () {},
  update: function () {},
  componentUpdated: function () {},
  unbind: function () {}
})

// 注册 (指令函数)
Vue.directive('my-directive', function () {
  // 这里将会被 `bind` 和 `update` 调用
})

// getter，返回已注册的指令
var myDirective = Vue.directive('my-directive')
```

```
Vue.directive('my-directive', {
  bind: function () {},
   inserted: function () {},
   update: function () {},
   componentUpdated: function () {},
   unbind: function () {}
})

钩子函数
一个指令定义对象可以提供如下几个钩子函数 (均为可选)：

bind：只调用一次，指令第一次绑定到元素时调用。在这里可以进行一次性的初始化设置。

inserted：被绑定元素插入父节点时调用 (仅保证父节点存在，但不一定已被插入文档中)。

update：所在组件的 VNode 更新时调用，但是可能发生在其子 VNode 更新之前。指令的值可能发生了改变，也可能没有。但是你可以通过比较更新前后的值来忽略不必要的模板更新 (详细的钩子函数参数见下)。

componentUpdated：指令所在组件的 VNode 及其子 VNode 全部更新后调用。

unbind：只调用一次，指令与元素解绑时调用。
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
        <div>
            <p v-color="'red'">{{val}}</p>
        </div>
        <model></model>
    </div>
    <template id="model">
         <div v-size="50">小猫热爱鱼</div>
    </template>
    <script src="./vue.js"></script>
    <script>
    // 全局注册
    Vue.directive('color',function(el,val) {
        el.style.color = val.value ? val.value : 'skyblue';
    })


    new Vue({
        el:'#app',
        data:{
            val:'我热爱vue',
        },
        components:{
           model:{
               template:'#model',
               // 局部注册
               directives:{
                   size(el,val) {
                       el.style.fontSize = val.value ? val.value + 'px' : '14px'; 
                   }
               }
           }
        }

    })
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
    <div id="app">
      <input type="text" v-focus value="老猫枕咸鱼">
    </div>
    <script src="./vue.js"></script>
    <script>
    // 全局注册
    //方案一
    // Vue.directive('focus',{
    //    bind(el) {
    //     Vue.nextTick(() => {
    //         el.select();
    //     })
    //    }
    // })

   // 方案二
    Vue.directive('focus',{
       inserted(el) {
            el.select();
       }
    })


    new Vue({
        el:'#app',
    })
    </script>
</body>
</html>
```
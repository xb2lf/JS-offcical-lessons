[toc]

## JS正式课第四天
### 复习
> 封闭空间不是闭包，而闭包有封闭空间的功能

+ 单例模式：单独的实例
 + 高级单例模式
+ 工厂模式

```
obj = {
            name:'xx',
            age:19
        }
```

```
// 高级单例模式

 A同学
            let obj = (function(){
                // let obj = {}
                function sum(){

                }
                return {
                    sum:sum
                };
            })()

            B同学
            let obj2 = (function(i){
                function sum(){}
                obj.sum()
                return {

                }
            })(i)

```

```
// 工厂模式

 function fn(name,age){
                    let obj = {};
                    obj.name = name
                    obj.age = age
                    return obj;
                } 
```
### 面向对象:(谁来做这件事)
+ 封装、继承、多态，面向对象的特征
	+ 封装就是归类的过程
+ **换了一种编程方式**:
	+ 把具有相同特征特性的代码归为一类（类)，把描述这个类的特性(共有属性、方法)挂在这个类的原型下的一种编程方式
  > 面向过程: 思考如何把它实现

### new  函数的一元运算符，只能运算函数
  1. this变成了实例
  2. 默认return实例，如果手动设置了返回值，如果是原始类型的那么还是实例，如果是引用类型的那么返回的就是引用类型
  3. 加不加括号都能执行函数，括号主要为了传参
  4. 首字母大写

### 原型
+ 当声明函数的时候，函数天生自带的一个属性
> `prototype(key) : {}(val)`

+ prototype下的方法或者属性只能通过两种方式使用:
	+ 给自己的实例化对象使用 new fn().a
	+ 直接使用fn.prototype.a
#### 原型链
+ 实例化对象上都有一个叫做___proto__的属性
+ 它的值全等于构造函数的原型
+ 如果某个原型下没有想要的属性或者方法，那么还会通过这个原型下的原型链继续查找，直到找到Object.prototype为止，因为Object.prototype.__proto__为null

```
{
                prototype:{

                }
            }
```

```
function fn(){

    }
    Object.prototype.a = 20
    fn.prototype.a = function(){
        console.log(this);
    };
```

```
  function fn(){

    }
    Object.prototype.a = 20
    fn.prototype.a = function(){
        console.log(this);
    };

   console.dir(new fn().__proto__  === fn.prototype);
    console.log(fn.prototype)
    console.log(new fn().__proto__.a);
    new fn().__proto__.a();
    new fn().a();
     /*
        实例下的.a -> 实例.__proto__  -> 构造函数的原型(fn.prototype)

        fn.prototype.__proto__ -> Object.prototype -> 
        
        Object.prototype.__proto__ = null


        fn.prototype = {
            __proto__:Object.prototype
        }

      */
    
```

### 内置类:浏览器自带的类
+ 所有的类型都是构造函数构造出来的
	+ string  '', "", ``, new String()
	+  object ， {},  new Object()
	+   function ， new Function
	+  [ ]   ，  new Array 

### 函数的三种角色
+ function fn(){}  函数：能够调用的角色
+ 构造函数
	+ new 构造对象的
	+ fn.prototype  公共的属性或者方法挂在这个构造函数的原型下
>   `new Array().push()
      new Array().forEach()
      [].push`

+ Function的实例: new Function -> function(){}
	+ *_**_proto_**_*

#### constructor
+ 在函数的原型下有一个属性，constructor,这个属性指向构造函数, 但是当前的constructor并不是100%准确的，它的指针仅仅只是一个指向构造函数的方向(一个参考)，非常容易被修改
> `Fn.prototype = {
> }`

+ 注意的是在对象赋值给构造函数原型的时候，constructor指向会被修改，指向的是Object,所以手动修正constructor指向。
> `Fn.prototype = {
>  constructor:Fn
>   }`

```
function Fn(){

    }

    Fn.prototype = {
        constructor:Fn
    }  ;//Object

    // console.log(new Fn);



    console.dir(Fn.prototype.constructor);
```

### hasOwnProperty  查看某个属性是不是自身的
+ 它返回一个布尔值，是自身的属性就是true,否则就是flase
+ 用法：
	+ for in的时候会枚举原型，会把自定义的属性或者方法枚举出来
		+ 在for in的过程中，如果不能确定构造函数的原型下是否有自定义的属性或者方法，那么建议加一个if判断，判断枚举的属性都是自身的
	+ 查看某个属性或者方法是否为对象自身的（面向对象中）即查看某个属性是共有的还是私有的

```
function Person(name,age) {
         this.name = name;
         this.age = age;
     }
     let p1 = new Person('尹德志',18);
     console.log(p1); // Person {name:'尹德志',age:18}
     console.log(p1.hasOwnProperty('name')); //true
```

```
// 不加if条件判断，直接枚举

 Object.prototype.sex = '随便';
    let obj = {
        name: 'zf',
        age:10
    };
    for(let attr in obj) {
        console.log(attr); // 'name'  'age'  'sex'
        
    }
// 加if条件判断，然后再枚举

Object.prototype.sex = '随便';
    let obj = {
        name: 'zf',
        age:10
    };
    for(let attr in obj) {
        if(obj.hasOwnProperty(attr)) {
            console.log(attr); // 'name'  'age'
        }
        
    }
```

#### 封装hasOwnProperty

```
<script>
    /* 
       封装一个hasOwnProperty  某个属性是公共的
     */
     function hasOwnProperty(obj,attr) {
         return obj.hasOwnProperty(attr);
     }
     /* 
     obj  对象变量名
     attr：需要进行判断的属性或者方法
      */
    </script>
```

### 基于内置类扩展写法
#### 基于内置类扩展写push

```
<script>
    /* 
    push  

    Array.prototype.push
     */
     let ary = [1,2,3];
     Array.prototype.mypush = function(...arg) {
    //    console.log(ary);// [1,2,3]
        let nary = this.concat(arg);
        let len = nary.length; 
        for (let i = 0; i < nary.length; i++) {

            this[i] = nary[i];
            
        }
        return len;
     }
     console.log(ary.mypush(4,5,6)); // 6
     console.log(ary); // [1, 2, 3, 4, 5, 6]
    </script>
```

#### 基于内置类扩展写concat

```
<script>
    /* 
    concat  

    Array.prototype.myconcat
     */
     let ary = [1,2,3];
     //  console.log(ary.concat([4,5,6]) === ary)  //false 输出的是一个新数组，会改变原数组
    // 链式调用
    // console.log(ary.concat([4,5,6]).concat([7,8,9]));// [1,2,3,4,5,6,7,8,9]

    // console.log(ary.concat([4,5,6],[7,8,9])); // [1,2,3,4,5,6,7,8,9]
    Array.prototype.myconcat = function(...arg) {
        return [...this,...ary.flat(Infinity)];
    }
   console.log(ary.myconcat([4,5],[6,7]).myconcat([8,9]));// [1,2,3,4,5,6,7,8,9]
    
    </script>
```
### this
+ window
	+ 全局打印this
	+ 函数 + 括号（函数执行）
	+ 定时器
	+ (function(){})() 匿名函数自执行它的this就是window
+ 事件触发的元素
	+ 只要是事件函数内的this都指向事件触发的元素
+ 点前面的主
+ 实例
	+ 构造函数下的this是实例  （new 构造函数 如： new Fn）
	+ 构造函数原型的this是实例（前提实例调用）
	+ Fn.prototype.say()   自身调用，this是构造函数
+ 箭头函数
	+ 指向的是声明箭头函数上下文的this
> `箭头函数没有arguments，不能new`

+ 如果一个函数中有this，但是它没有被上一级的对象所调用，那么this指向的就是window
+ 如果一个函数中有this，这个函数有被上一级的对象所调用，那么this指向的就是上一级的对象。
+ 如果一个函数中有this，这个函数中包含多个对象，尽管这个函数是被最外层的对象所调用，this指向的也只是它上一级的对象

```
 <script>
        /* 
        this  
        1.window
            全局打印this
            函数 + 括号（函数执行）
            定时器
            (function(){})() 匿名函数自执行它的this就是window
        2.事件触发的元素
            只要是事件函数内的this都指向事件触发的元素
        3.点前面的主
            
        4.实例
            构造函数下的this是实例  （new 构造函数）
            构造函数原型的this是实例（前提实例调用）
            Fn.prototype.say()   自身调用，this是构造函数
        5.箭头函数
            指向的是声明箭头函数上下文的this
    
            没有arguments， 不能new
    
        如果一个函数中有this，但是它没有被上一级的对象所调用，那么this指向的就是window
    
        如果一个函数中有this，这个函数有被上一级的对象所调用，那么this指向的就是上一级的对象。
    
        如果一个函数中有this，这个函数中包含多个对象，尽管这个函数是被最外层的对象所调用，this指向的也只是它上一级的对象
         */
        /* 事件触发的元素 */
         document.onclick = fn;
         function fn() {
            console.log(this); // document
         }
        /* 函数 + 括号（函数执行） */
        document.onclick = fn();
         function fn() {
            console.log(this); // window
         }
        /* 匿名函数自执行 */
        document.onclick = (function () {
            console.log(this); // window
            return function fn() {
            console.log(this); // document
         }
        })();
        /* 定时器 */
        document.onclick = function () {
            setTimeout(function() {
                console.log(this); // window
            },1000);
        };
        /* 实例 */
        document.onclick = function () {
            setTimeout(new fn,1000);
            function fn() {
                console.log(this); // fn{}  1秒中后报错
            }
        };
        /* 箭头函数 */
        let fn = () => {
            console.log(this); // winodw
        }

        /* 点前面的主 */

            var o = {
            user:"追梦子",
            fn:function(){
                console.log(this.user);  //'追梦子'  这里指代o
            }
        }
        o.fn();  
        /* 事件触发的元素 */
        document.onclick = function () {
            let fn = () => {
                console.log(this); // document
            }
            fn();
        }
    </script>
```
#### 改写this

##### call, apply, bind   都是改变this指向的方法
> `共同特征：当一个函数创建的时候，天生自带的方,其中有call,bind,apply方法`

+ call：
	+ 有若干个参数
		+ 第一个参数   修改this指向
		+ 第二个参数以后  函数的实参
+ apply
	+ 有两个参数
		+ 第一个参数   修改this指向
		+ 第二个参数   数组，数组里面放的是实参
+ bind（惰性函数，柯里化函数，高阶函数）
	+ 多个参数
		+  第一个参数   修改this指向
		+  第二个参数之后  函数的实参 
>  `注意：它返回的是新函数，只要调用返回的函数才能执行函数内的代码`

> `细节：在使用它们修改this的时候，不要传null和undefined，因为传了也不认，还是走默认的window`

```
  */
     /* call */
    //  function fn() {
    //      console.log(this,a,b);
    //  }
    //  fn.call('哈哈',1,2); // 

    /* apply */
    //  function fn() {
    //      console.log(this,a,b);
    //  }
    //  fn.apply('哈哈',[1,2]); // 
    
     /* bind */
    function fn() {
         console.log(this,a,b);
     }
     fn.bind('哈哈',1,2)(); // 
     fn.bind(document)(1,2);
    </script>
```

### 小面试题一

```
 <script>
        /* 实现输出结果分别为1 2 3 */
        // function add() {
        //     var num = 0;
        //     num += 1;
        //     console.log(num);
        // }
        // add();
        // add();
        // add();

        // // 实现方法一:
        var num = 0;
        function add() {
            num += 1;
            console.log(num);
        }
        add();
        add();
        add();

        // 实现方法二：
        function add1(){
            var num = 0;
            return function() {
                num += 1;
                console.log(num);
            }
        }
        let add = add1();
        add();
        add();
        add();
    </script>
```
### 小面试题二

```
<script>
        /* 下面代码片段的输出结果是什么? */
        var name = "The Window"; //window.name = 'The Window'
        var object = {
            name: "My Object",  //obj.name = 'My Objec'
            getNameFunc: function () {
                //this -> obj
                return function () {
                    return this.name;
                }
            }
        };

        // let oo = object.getNameFunc();
        // console.log(oo())

        alert(object.getNameFunc()()); // 'The Window'
    </script>
```


[toc]

## JS正式课第六天
### 继承
> `面向对象的特征：封装、继承、多态`

+ 定义： 子类具有父类一部分特征（这部分相同的特征是从父类继承下来的），自己还有自己的特征
+ 好处： 继承的写法可以让子类的代码量减少很多，从而达到高内聚、低耦合的目的
+ 结果：  继承最后的结果是  能够继承父类的属性和方法
+ 继承方式
	+ 类式继承（call继承）
	+ 原型继承
	+ 寄生式组合继承
	+ 拷贝继承
	+ class继承
	+ ...
	
#### 属性继承
##### 类式继承（call继承）
+  继承属性：调用父类，通过call把this变为子类的实例即可
+  方式：
> `function Police (name,age) {
>   // this -> 实例
>   Person.call(this,name,age);
>    }`

```
<script>
/* 类式继承（call继承） */
     function Person(name,age) {
         this.name = name;
         this.age = age;
        //  console.log(this);// window
     }
     Person.prototype.say = function () {
         alert('我的名字叫' + this.name);
     }

     function Police (name,age) {
         // this -> 实例
        Person.call(this,name,age);
     }
    
     Police.prototype.say = function() {
         alert('我是警察');
     }
     let p2 =new Police('赵炎',100);
     let p3 =new  Police('大壮壮',88);
     p2.say();
     p3.say();
</script>     
```
#### 方法继承
##### 原型继承
+ 方案一

```
<script>
     function Person(name,age) {
         this.name = name;
         this.age = age;
         console.log('看我会出现几次'); // 出现了三次  第一次它本身打印  第二次Police属性继承  第三次Person实例(即 Police.prototype = new Person; )
     }
     Person.prototype.say = function () {
         alert('我的名字叫' + this.name);
     }

     function Police (name,age) {
         Person(this,name,age);
     }
    //  function Paohui () {}
    //  Paohui.prototype = Person.prototype;
    //  Police.prototype = new Paohui;

    Police.prototype = new Person; // 这样写，虽然逻辑可以实现，但性能太低，每次都会调用构造函数全部，可我们只需要Person.prototype.say,所以应该用上边Paohui类过渡一下
    Police.prototype.constructor = Police;
     Police.prototype.say = function() {
         alert('我是警察' + this.name);
     }
     Police.prototype.kongfu = function() {
         console.log(this.name + '弄某炎');
     }
     let p2 = new Police('赵炎',100);
     let p1 = new Person('刘成', 18);
     p2.say();
     p1.say();
     /* 
     p2.say -> p2.__proto__ -> Police.prototype -> new Paohui() -> new Paohui().__proto__ -> Paohui.prototype -> Person.prototype
      */
    </script>
```
##### 方案二

```
   function Person(name,age) {
         this.name = name;
         this.age = age;
     }
     Person.prototype.say = function () {
         alert('我的名字叫' + this.name);
     }

     function Police (name,age) {
         Person(this,name,age);
     }
     function Paohui () {}
     Paohui.prototype = Person.prototype;
     Police.prototype = new Paohui;
     Police.prototype.say = function() {
         alert('我是警察' + this.name);
     }
     Police.prototype.kongfu = function() {
         console.log(this.name + '弄某炎');
     }
     let p2 = new Police('赵炎',100);
     let p1 = new Person('刘成', 18);
     p2.say();
     p1.say();
     /* 
     p2.say -> p2.__proto__ -> Police.prototype -> new Paohui() -> new Paohui().__proto__ -> Paohui.prototype -> Person.prototype
      */
    </script>
```

#####  拷贝继承
###### 浅克隆（浅拷贝）
+ 通过浅拷贝，把父类上原型的方法或者属性都赋值给子类的原型（ Object.assign  对象的浅拷贝）
+  Object.assign(子类.prototype,父类.prototype);
	+  使用 Object.assign(obj2,obj1) 从右往左浅拷贝对象的属性，可以放若干的对象
	+   Object.assign(obj2,obj1，obj0)   最后改变的是obj2,obj1是不会被修改的
```
 <script>
        /* 
        
        Object.assign  对象的浅拷贝
         使用
             Object.assign(obj2,obj1)

             从右往左浅拷贝对象的属性，可以放若干的对象

             Object.assign(obj2,obj1，obj0)

             最后改变的是obj2,obj1是不会被修改的

         */
    let obj = {
        name:'阿里',
        age:10
    }
    let obj2 = {
        age:5,
        sex: '男',
        name: 'zf'
    }

    let obj3 = {
       aa:8
    }
    Object.assign(obj3,obj2,obj); // 越往右层级越高
    console.log(obj,obj2,obj3);// obj = {name:'阿里',age:10}   obj2= {age: 5,name: "zf",sex: "男"} obj3 = {aa: 8,age: 10,name: "阿里",sex: "男"}

    // let obj =  Object.assign(obj3,obj2,obj); // 越往右层级越高
    // console.log(obj,obj2,obj4);
    </script>
```

```
   <script>
        /* 
        
        如果不是赋址是赋值就解决了问题

        两个引用类型的赋值就是赋值地址

        原始类型的赋值就是普通赋值了，其实赋值引用类型的目的是拿到B拿到A下面的属性

        如何才能避免赋址呢
            1.需要两个不同地址
            2.B地址下拥有A地址下的原始类型的数据即可（原始类型的赋值）

         Object.assign  对象的浅拷贝
         使用
             Object.assign(obj2,obj1)

             从右往左浅拷贝对象的属性，可以放若干的对象

             Object.assign(obj2,obj1，obj0)
         */
    let prototype1 = {
        say() {
            console.log('我叫xxx');
        }
    }
    let prototype2 = {}
    // for (let attr in prototype1) {
    //     // for in会枚举当前对象原型下的属性或者方法，使用hasOwnProperty就能只找对象自身的属性了
    //     if (prototype1.hasOwnProperty(attr)) {
    //         prototype2[attr] = prototype1[attr];
    // }
    //     }

    Object.assign(prototype2,prototype1);
    prototype2.say = function () {
            console.log('我叫警察');
    }
    console.log(prototype2);
    prototype1.say();
    prototype2.say();
    </script>
```

###### 深克隆（深拷贝）

```
//  方案一
 <script>
    let ary = [1,2,3,[1]];

    function deepclone(obj) {
        let ary = [];
        for (let attr in obj) {
            // 如果碰到了引用类型就继续循环，到原始类型才赋值
           if (typeof obj[attr] === 'object' && obj[attr] !== null) {
             ary[attr] =  deepclone(obj[attr]);
           }
           ary[attr] = obj[attr]; 
        }
        return ary;
    }
    let ary2 = deepclone(ary);
    ary2[3].push(4);
    console.log(ary);
    </script>
```

```
// 方案二
<script>
    let ary = [1,2,3,[1]];

    function deepclone(obj) {
        let ary = [];
        for (let attr in obj) {
            // 如果碰到了引用类型就继续循环，到原始类型才赋值
           if (typeof obj[attr] === 'object' && obj[attr] !== null) {
             ary[attr] =  deepclone(obj[attr]);
           }
           ary[attr] = obj[attr]; 
        }
        return ary;
    }
    let ary2 = JSON.parse(JSON.stringify(ary));
    ary2[3].push(4);
    console.log(ary2);
    </script>

```

```
// 完美版

  <script>
    let ary = [1,2,3,[1],{name:123}];

    function deepclone(obj) {
        //看看obj是不是对象，不是对象就不执行deepclone
        if(typeof obj !== 'object' && obj !== null){return null};
        let o = Array.isArray(obj) ? [] : {}; // obj.push ? [] : {};
        for (let attr in obj) {
            // 如果碰到了引用类型就继续循环，到原始类型才赋值
           if (typeof obj[attr] === 'object') {
             o[attr] =  deepclone(obj[attr]);
           }else{
            o[attr] = o[attr]; 
           }
          
        }
        return ary;
    }
    let ary2 = deepclone(ary);
    ary2[3].push(4);
    console.log(ary);
    </script>
```

##### 寄生式组合继承
+ Object.create

```
<script>

     function Person(name,age) {
         this.name = name;
         this.age = age;
     }
     Person.prototype.say = function () {
         alert('我的名字叫' + this.name);
     }

     function Police (name,age) {
         Person(this,name,age);
     }
    //  function Paohui () {}
    //  Paohui.prototype = Person.prototype;
    //  Police.prototype = new Paohui;

    Police.prototype = Object.create(Person.prototype);
    /*  new Police()__proto__ = new person
     或 Police.prototype = new Person; 
     */
     Police.prototype.say = function() {
         alert('我是警察' + this.name);
     }
     Police.prototype.kongfu = function() {
         console.log(this.name + '弄某炎');
     }
     let p2 = new Police('赵炎',100);
     let p1 = new Person('刘成', 18);
     p2.say();
     p1.say();
     /* 
     p2.say -> p2.__proto__ -> Police.prototype -> new Paohui() -> new Paohui().__proto__ -> Paohui.prototype -> Person.prototype
      */
    </script>
```

##### class继承
+ 关键词 extends   super()
+ `在继承的constructor中，如果要使用this,一定要使用super`

```
    <script>
    class Person {
        constructor (name,age) {
            this.name = name;
            this.age = age;
        }
        say(){
            alert('我的名字叫' + this.name);
        }
    }
    class Police extends Person{
        // 在继承的constructor中，如果要使用this,一定要使用super
        constructor(job,name) {
            super(name);
            this.job =job;
        }
    }
    let p2 = new Police('警察','xxx');
    console.log(p2);
    </script>
```

```
<script>
    class Person {
        constructor (name,age) {
            this.name = name;
            this.age = age;
        }
        say(){
            alert('我的名字叫' + this.name);
        }
    }
    class Police extends Person{
        // 在继承的constructor中，如果要使用this,一定要使用super
        constructor(job,...arg) {// 剩余运算符['xxx',19]
            console.log(this);// 报错 super上方拿不到this
            super(...arg);// 扩展运算符
            this.job =job;
        }
        say() {
            alert('我是警察');
        }
    }
    let p2 = new Police('警察','xxx',19);
    let p1 = new Person('yyy',18);
    p2.say();
    p1.say();
    console.log(p2);
    </script>
```
###### class继承之static
+ 通过class中的static可以创建静态方法，只有类才能调用，实例是调用不到的
+ 就算是继承，也只能是继承子类去调用，子类的实例是调用不到的

```
<script>
        /* 
        
        Array.isArray
        Object.assigin
        Object.create
        Array.from
        ...
        通过class中的static可以创建静态方法，只有类才能调用，实例是调用不到的，
        就算是继承，也只能是继承子类去调用，子类的实例是调用不到的
         */
    class Person {
        static eat() {//静态方法，只有类可以调用，实例是调用不到的
           console.log('吃饭');
        }
        constructor (name,age) {
            this.name = name;
            this.age = age;
        }
        say(){
            alert('我的名字叫' + this.name);
        }
    }
    class Police extends Person{
        // 在继承的constructor中，如果要使用this,一定要使用super
        constructor(job,...arg) {// 剩余运算符['xxx',19]
            console.log(this);// 报错 super上方拿不到this
            super(...arg);// 扩展运算符
            this.job =job;
        }
        say() {
            alert('我是警察');
        }
    }
    let p2 = new Police('警察','xxx',19);
    let p1 = new Person('yyy',18);
    p2.say();
    p1.say();
    Police.eat();
    console.log(p2);
    </script>
```

### 补充
+ function fn(){} -> new Function
+ Function是个内置类 -> 它也是个函数
+ Function.prototype  给所有的小写function使用也包括它自己
+ Function.prototype是个函数，不是对象，而且这个函数还不是new Function构造出来的

```
/*
        函数
        类
        实例

        function fn(){} -> new Function


        Function是个内置类 -> 它也是个函数

        Function.prototype  给所有的小写function使用也包括它自己




        fn : {
            __proto__:Function.prototype,

            prototype:{
                constructor:fn
            },

            执行栈:{
                console.log(1);
                this.a = 6;
            },
            a:5
        }

        fn() -> 执行栈
        new fn() -> prototype
        fn.a -> Function.prototype


        Function.prototype是个函数，不是对象，而且这个函数还不是new Function
        构造出来的

    */    

```
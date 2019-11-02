[toc]

## JS正式课第二天
### 变量提升
+ js引擎会一开始就会解析全局作用域中的所有var的变量和function
+ 会通过函数比undefined要大(留下的是函数)，还有后面的函数会把前面的函数覆盖的原则进行变量值最后的赋值确认
+ 逐行解读代码
	+ 读打印、输出、赋值（=）
> 形参赋值 变量提升     执行上下文      销毁执行栈（作用域）
```
 <script>
    alert(a); // 空函数
    var a  = 10;
    function a() {
        var b = 30;
        alert(5);
    };
  function a() {

  };
    alert(a); //10
    </script>
```

```
 <script>
    alert(a); // function a() {};
    var a  = 10;
    function a() {
        var b = 30;
        alert(5);
    };
  function a() {};
    alert(a);// 10
    a = 30;
    alert(a); // 30
    var a = function() {
        alert(333);
    };
    function a() {};
    a(); // 333
    alert(a); // function() {alert(333);};
    </script>
```

### 作用域
+ 域：范围 JS执行的范围（环境）
+ 全局作用域（window执行栈）
	+ 如果有多个script标签，上一个script标签报错是不会影响下面script中的代码执行的
	+ 查找的方式，先看当前的script有没有，没有还会去上一个script标签中查找（不会往下找），如果确实找不到那就报错
	+ 
+ 局部作用域（函数中的执行栈）
	+ 当函数执行的时候，开辟了一个执行栈，把函数中存的字符串运行在这个执行栈中
		+  形参赋值 变量提升     执行上下文（逐行解读代码）      销毁执行栈（作用域）
		+  如果局部作用域中没有变量（var let)、函数、形参的时候，就会查找函数外面的变量，直到window为止（这种机制叫做作用域链（Scope Chain））
		+  如果局部作用域中有变量（var let)的时候，会直接中这个变量，是不会去函数外边进行查找的
		+  如果局部作用域中有变量（var let），还有形参，那么会优先形参
		+  如果局部作用域中有函数、变量，还有形参，那么会优先函数体内的函数，并不是形参
		+  局部作用域也会进行预解析
	+ 块级作用域

```
    <script>
        /* 
        局部作用域
         */
    //  形参赋值 
    //  变量提升 var function
    //  执行上下文   
    //  销毁执行栈（作用域）
  var a = 20;
  function fn(a) { // var a = 20
      alert(a); //20
      var b = 30;
      a = 40;
      alert(a); // 40
  }
  fn(a);
  alert(a);//20
    </script>
```

```
   <script>
        /* 
        局部作用域
         */
    //  形参赋值 
    //  变量提升 var function
    //  执行上下文   
    //  销毁执行栈（作用域）
  var a = 20;
  function fn() { 
      alert(a); // 20
      var b = 30;
      a = 40;
      alert(a); // 40
  }
  fn(a);
  alert(a); //40
    </script>
```

```
    <script>
        /* 
        局部作用域
         */
    //  形参赋值 
    //  变量提升 var function
    //  执行上下文   
    //  销毁执行栈（作用域）
  var a = 20;
  function fn(a) { // var a = 20
      alert(a); // 20
      var b = 30;
      a = 40;
      var a;
      alert(a); // 40
  }
  fn(a);
  alert(a); //20
    </script>
```

```
  <script>
        /* 
        局部作用域
         */
    //  形参赋值 
    //  变量提升 var function
    //  执行上下文   
    //  销毁执行栈（作用域）
    /* 
     形参赋值：
       a = 20;
     ****************************************
     预解析：
       var b
       var a
        a = function(){alert(5);}
     ****************************************
     执行上下文：
       a = 20
       b = 30
       a = 40

     */
  var a = 20;
  function fn(a) { 
      alert(a); // function(){alert(5);}
      var b = 30;
      a = 40;
      var a;
      alert(a); // 40
      function a() {
          alert(5);
      }
  }
  fn(a);
  alert(a);// 20
    </script>
```
### this
+ 事件触发是谁，this就是谁
+ window  全局打印this  fn()  this就是window
+ 对象下的this 就是.前面的主
+ 匿名函数自执行的this也是window
> 全局this  widow   console.log(this)    fn()  window
> 事件this  事触发的对象
>  btn.onclick = function() {
>  console.log(this);// btn
>  }
>  
> 对象下的this  指向.前面的主
> obj = {
> style: {
>fn:function) {
>console.log(this); // obj.style
>}
> }
>  }
>  obj.style.fn();
>  
>  (function fn() {
> console.log(this); // window
> }) ();

### 闭包运行机制
+  闭包 教科书上说的是，一个函数访问外部变量就这个函数叫闭包
+  自己理解
	1. 函数是嵌套函数
    2. 子函数引用父函数的参数或者变量
    3. 子函数被外界所引用
    4. 父级就形成了闭包环境，父级的参数或者变量就不会被浏览器垃圾回收机制所回收
    5. 打印父级函数返回值，那么就会发现，scopes下面有个closure，就是闭包
+ 作用 为了存储变量或者参数，好累积计算
+ 内部的变量不被外界污染，函数的特性之一

```
 <script>
    /* 
    闭包
       教科书上说的是，一个函数访问外部变量就这个函数叫闭包

    1. 函数是嵌套函数
    2. 子函数引用父函数的参数或者变量
    3. 子函数被外界所引用
    4. 父级就形成了闭包环境，父级的参数或者变量就不会被浏览器垃圾回收机制所回收
    5.打印父级函数返回值，那么就会发现，scopes下面有个closure，就是闭包

    作用
       为了存储变量或者参数,好累积计算

    内部的变量不被外界污染，函数的特性之一
     */
     function fn() {
         var a = 10;
         function f() {
             console.log(a);
         }
         return f;
     }
     var ff = fn(); // fn就形成了闭包环境，fn中的参数或者变量就不会被浏览器垃圾回收机制所回收
     console.dir(ff); // Scopes  Closure
    </script>
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
  <button>按钮1</button>
  <button>按钮2</button>
  <button>按钮3</button>
    <script>
  //  const btns = document.querySelectorAll('button');
  //  for (var i = 0; i < btns.length; i++) {
  //    btns[i].index = i;
  //    btns[i].onclick = function() {
  //      alert(this.index);
  //    }
     
  //  }

  // const btns = document.querySelectorAll('button');
  //  for (var i = 0; i < btns.length; i++) {
  //   function fn(aa){
  //     btns[i].onclick = function() {
  //      alert(aa);
  //    }
  //   }
  //   fn(i);
  //  }

  const btns = document.querySelectorAll('button');
   for (var i = 0; i < btns.length; i++) {
    ;(function fn(aa){
      btns[aa].onclick = function() {
       alert(aa);
     }
    })(i);
   }
    </script>
</body>
</html>
```

### 小扩展
> for 一定比定时器快
>  window.onload 当页面的所有静态资源加载完成之后才执行里面的函数
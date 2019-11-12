[toc]

## JS正式课第八天

### 关于函数和局部作用域

```
/*

  函数 -> 局部作用域  

            let，var，参数，函数  正常情况下都不会跑外面

            在函数内如果没有变量声明、函数、参数，当前的变量是属于window的

            var a = b = 5; //b是window的 
            var a = 5,b = 5; //a和b都是局部作用域的

            函数 + 括号 函数中的this就是window

        
        预解析（变量提升） -> 代码从上而下执行（=,打印输出）
*/
```

### call

```
    /*
        call：
            只要是个函数就有call方法  (是个啥？)
            改变this的指向的（干嘛用的？）
            参数:（怎么用？）
                多个参数
                第一个是修改的this
                第二个之后实参
            注意:（有没有坑？）
                null，undefined都数据window

        如何改变this？

        this属于谁 -> 事件触发谁this就是谁？.前面的？
            document.onclick = function(){}
            把一个函数地址赋值给document.onclick

            obj.click = function(){
                console.log(this);
            }

            obj.fn() -> this是obj

            this就是.前面的主。

            document.xx = function(){
                console.log(this);
            }

            核心:
                也就是说，只要让一个函数地址，等于某个对象下的方法，
                this自然就变成了那个对象.

    */ 
```

#### 重写call

```
    <script>
        /*
            call：
                只要是个函数就有call方法  (是个啥？)
                改变this的指向的（干嘛用的？）
                参数:（怎么用？）
                    多个参数
                    第一个是修改的this
                    第二个之后实参
                注意:（有没有坑？）
                    null，undefined都数据window
    
            如何改变this？
    
            this属于谁 -> 事件触发谁this就是谁？.前面的？
                document.onclick = function(){}
                把一个函数地址赋值给document.onclick
    
                obj.click = function(){
                    console.log(this);
                }
    
                obj.fn() -> this是obj
    
                this就是.前面的主。
    
                document.xx = function(){
                    console.log(this);
                }
    
                核心:
                    也就是说，只要让一个函数地址，等于某个对象下的方法，
                    this自然就变成了那个对象.
    
        */
        Function.prototype.mycall = function (that, ...arg) {
            let type = typeof that;
            if (that === null || that === undefined) {
                that = window;
            } else {
                switch (type) {
                    case 'string':
                        that = new String(that);
                        break;
                    case 'boolen':
                        that = new Boolean(that);
                        break;
                    case 'number':
                        that = new Number(that);
                        break;
                }
            }
            that.fn =this;
            that.fn(...arg);
            // console.log(that);
        }

        function fn(a,b) {
            delete this.fn;
            console.log(this);
            console.log(a+b);
        }

        fn.mycall(123,1,2);//Number{123}

    // fn.call(123,1,2);//Number{123}
    </script>
```

####  关于call一点小知识

```
// fn.call(fn2);
    // fn.call.call(fn2); //如果有多个call，第一个参数一定是会被调用的（this）

    /*
        如果有多个call，最后一个call的第一个参数为调用的那个函数，第二个参数是this指向，之后才是实参
    */
    // Function.prototype.call.call.call.call.call(fn2,1);
```

```
 /*
        如何检测一个变量是什么类型的？
        [] -> typeof 'object'

        Object.prototype.toString.call(数据) === 
    */
```

### 数据类型检测库

```
  <script>
        // 通过对象方式去检测
        class Tools {
            static type(data) {
                let obj = {
                    objcet: 'Objcet',
                    array: 'Array',
                    null: 'Null'
                };
                let toS = Object.prototype.toString;
                if (typeof data !== 'object') {
                    return typeof data;
                }
                for (let attr in obj) {
                    if (toS.call(data) === `[object ${obj[attr]}]`) {
                        return attr;
                    }
                }
            }
        }
        let dete = Tools.type(null);
        console.log(dete);


        // class Tools {
        //     static type(data) {
        //        let ary = ['Null','Array','Object'];
        //     //    let ary2 = ['null','array','objcet'];
        //         let toS = Object.prototype.toString;
        //         if (typeof data !== 'object') {
        //             return typeof data;
        //         }
        //        for (let i = 0; i < ary.length; i++) {
        //           if (toS.call(data) === `[objcet ${ary[i]}`) {
        //               return ary[i].toLowerCase();
        //           }
                   
        //        }
        //     }
        // }
        // let dete = Tools.type(null);
        // console.log(dete);
    </script>
```
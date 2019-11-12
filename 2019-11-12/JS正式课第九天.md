[toc]

## JS正式课第九天
### 正则表达式
> `专门用来（更擅长处理模糊范围的字符串）检索字符串的一种规则`

+ 两种写法
	+ // -> 字面量的写法
		+  /规则或者不带引号的查询字符/ 'a' /a/
	+ new实例的写法
		+ new RegExp(字符串或者变量,修饰符)
		+ new RegExp(规则【可以为字符串的，可以进行字符串拼接】，修饰符)

```
\*
            \      ：转义字符   把正则中有特殊含义的字符 转成字符本身(不再有任何特殊的含义)
            \d     ：代表了 0-9之间的数字
            \D     ：代表除了 0-9 的任意字符；
            \w     ：代表了 数字 字母  下划线；
            \W     ：代表除了 数字 字母 下划线 之外的任意字符 
            ^      ：代表以什么 字符 开头
            $      ：代表以什么 字符 结尾
            .      ：代表除了换行以外的所有字符
            \n     ：代表换行
            x|y    ：代表 x 或者 y
            [ab]   ：代表a或者b
            [^ab]  ：代表非ab
            [a-z]  ：代表 a-z之间的任意字符
            [^a-z] ：代表除了 小写字母
            ()     ：分组和提升优先级的意思
            (?:)   ：非捕获 匹配
            (?=)
            (?!)

        量词元字符：一般都是用在了其他元字符的后边 
            ?   ： 代表 前边的字符出现 0或1次
            +   :  代表 前边的字符出现 1或多次
            *   :  代表 前边的字符出现 0或多次
            {n} ： 代表 前边的字符出现 n次
            {n,m} ： 代表 前边的字符出现 n到m次
            {n,} ： 代表 那边的字符出现 n到多次

        修饰符 ：
            i : 忽略大小写  ignoreCase
            m : 多行匹配  mutiline
            g : 全局匹配  global

    */
```
#### 正则特性
1. 懒惰
	+ 你让它找一个，绝对不会找第二个；你让它找一堆，它绝对不会找第二堆
2. 贪婪
	+ 只要符合某个规则就不停的找，直到找不到为止

### 转义符：\
> `把正则有特殊含义的字符  转成字符本身((不再有任何特殊的含义)),转义符转的是\后面的字符`

```
 <script>
    /* 
    正则表达式
         专门用来（更擅长处理模糊范围的字符串）检索字符串的一种规则
         /规则或者不带引号的查询字符/ 'a' /a/
         new RegExp(字符串或者变量,修饰符)
       难点：
         1. 规则 -> 规律，现象（积极总结）
         2. 如果今天的课没有听，明天就会是天书
         3. 在写的时候清晰明白自己在干啥，当你写完之后写的到底是啥？
      容易点：
         没有逻辑  只有拼命背  拼命用

         {}  [] ''
         new Objcet ,new Array

         // -> 字面量的写法
         new RegExp(规则【可以为字符串的，可以进行字符串拼接】，修饰符) -> new实例的写法

     \: 转义符  把正则有特殊含义的字符  转成字符本身((不再有任何特殊的含义)),转义符转的是\后面的字符

     */
     let str  = 'abc';
     let aa = 'a';
     // *** 什么时候用//    什么时候用new  RegExp
    //  console.log(/aa/); // 找的是字符aa(正则里面放的是不带引号的字符串或者规则)
     console.log(new RegExp(aa));// 找的的是变量aa，其实就是字符串aa

     alert('通知:\n 明天考试');// 一次转义，进行换行
     alert('通知:\\n 明天考试');// 两次转义，将\n转成正常字符，进行保留

     let s = 'abcd\\';
     console.log(s); // abcd\

     console.log(/a/); // /a/
     console.log(new RegExp('a'));// /a/
     console.log(new RegExp('/a/')); // /\/a\//

     let srr = 'a\da';
     console.log(new RegExp('\\d'));// /\d/

     console.dir(/a/);  // exec  test  正则的两种方法
    </script>
```

### 四种方法

> ` exec  ->  把正则匹配到的字符放到数组中（首次出现的字符，一次），找不到返回null`
 > `      test  ->  某个字符串是否匹配正则规则，返回布尔值 `
 > `      match ->  把正则匹配到的字符放到数组中(可以依次也可以多次)，找不到返回null`
 > `      replace(''|正则,''|函数)`
 >`           第一个参数，匹配的结果`
 > `          第二个参数是根据是否有分组来计算值`
 > `              没有分组 -> 索引`
 >  `             有分组 -> 第一个分组，第三个参数遵循一样的查找规则`
            
 > `             后面的参数为:`
 > `           整个字符串 `
 >   `          undefined`

#### 正则身上的两种方法
+  //.exec(字符串)
> `找到正则匹配的字符串（首次出现的字符【就一次】），并且放到数组中（返回的是数组），找不到返回null`
+ //.test(字符串)
> ` 查看字符串是否有规则匹配选，如果有就返回true，否则就false`

```
<script>
    /* 
    正则身上的方法
    //.exec(字符串)
         找到正则匹配的字符串（首次出现的字符【就一次】），并且放到数组中（返回的是数组），找不到返回null


    //.test(字符串)
         查看字符串是否有规则匹配选，如果有就返回true，否则就false

    特殊转义符：
    \d 一个0到9的数字

    量词：
       +  至少出现一次  最多不限

    修饰符：
       g -> global 全局查找
     */
     console.log(typeof /a/); // 'object'
     console.log(Object.prototype.toString.call(/a/)); // [object RegExp]

     let str = 'dh81z9dx1';

    /* 
    ["1", index: 3, input: "dh819dx1", groups: undefined]
     '1'为找到的字符串
      index: '1'首次出现的位置
      input: 整个字符
      groups：undefined
      length:1(因为找的是'1'这个字符串)

    
     */
     console.log(/1/.exec(str)); // 查看字符串中是否有正则匹配项 ["1", index: 3, input: "dh819dx1", groups: undefined]
     console.log(/\d+/.exec(str)); // ["819", index: 2, input: "dh819dx1", groups: undefined]
     console.log(/\d+/g.exec(str)); // ["819", index: 2, input: "dh819dx1", groups: undefined]

     console.log(/z/.test(str)); //  找当前字符串是否有z这个字符  true
    </script>
```
#### 字符串的两种方法
+ match
	+ string.match(//)  字符串方法
	+ 找到正则匹配的字符，并且把它们放到数组中（返回值是数组）（可以一次也可以多次）,找不到返回null
	+ 跟exec类似，exec是正则身上的方法，而match是字符串的方法
+ replace
	+  string.repalce('','')  替换  字符串方法
	+  规则：string.repalce(''或者放正则,'替换字符'或者放函数)
	> `函数的第一个参数就是每次匹配的字符，如果匹配多次那么就会多次调用`
##### replace的细节
+ 默认情况下：
	+ 函数的第一个参数是每次匹配字符，第二个参数是匹配字符索引，第三个参数是整个字符串，第四个参数undefined
+ 如果有分组：
	+ 形式： ()  一个括号是一个分组  从左往右数
	+ 作用：
		+ 分组  如：【 (((\d+))(((\D)+))((\d+)))    8个分组 】
		+ 提权  如：【 (1+1) * 5 】
	+ 第一个参数是每次匹配字符，第二个参数是第一个分组，之后有几个分组，参数就是分组项，直到分组读完就正常走索引、整个字符串、undefined
> `注意：如果分组的后面有量词，那么分组项为最后一个字符
> + (\d+)  这个分组是最后一个数组`

```
<script>
    /* 
    match  字符串方法  string.match(//)  
        找到正则匹配的字符，并且把它们放到数组中（返回值是数组）（可以一次也可以多次）,找不到返回null

        跟exec类似，exec是正则身上的方法，而match是字符串的方法

    正则特性
    1.懒惰
         你让它找一个，绝对不会找第二个；你让它找一堆，它绝对不会找第二堆
    2.贪婪
         只要符合某个规则就不停的找，直到找不到为止
    
     i : 忽略大小写  ignoreCase
     */

     let str = 'dnn92';
     console.log(str.match(/\d/)); // ["9", index: 3, input: "dnn92", groups: undefined]  找一个数字  只找一次
     console.log(/\d/.exec(str)); // ["9", index: 3, input: "dnn92", groups: undefined]

     let srr = '32632321323rgb087yr23n6x832321';
     console.log(srr.match(/\d+/g));// ["32632321323", "087", "23", "6", "832321"]

     let stt = '378937Z2189';
     console.log(stt.match(/Z/)); // ["Z", index: 6, input: "378937Z2189", groups: undefined]
     console.log(stt.match(/z/i));// ["Z", index: 6, input: "378937Z2189", groups: undefined]
     let lett = '37z89z37Z218Z9';
     console.log(lett.match(/z/ig));// ["z", "z", "Z", "Z"]
    </script>
```

```
    <script>
    /* 
     string.repalce('','')  替换  字符串方法
     string.repalce(''或者放正则,'替换字符'或者放函数)

     过滤敏感词
     */
     let  str = '珠枫';
     console.log(str.replace('枫','峰')); // '珠峰'

     let srr = '1珠266枫3';
     console.log(str.replace(/\d+/g,'')); // '珠枫'

     let stt = '冉德鹏和李磊见不得光的新鲜事';
    //  console.log(stt.replace(/冉德鹏|李磊|不得光/g,'*')); // '*和*见*的新鲜事'

    /* 
      函数的第一个参数就是每次匹配的字符，如果匹配多次那么就会多次调用
     */
    console.log(stt.replace(/冉德鹏|李磊|不得光/g,function($0){
        console.log ($0);
        let temp = '';
        for (let i = 0; i < $0.length; i++) {
             temp += '*';
            
        }
        return temp;
    })); // ***和**见***的新鲜事
    </script>
```
##### replace例子（和谐关键词）

```
<script>
    /* 
    
    replace例子
       和谐关键词

     */
    btn.onclick = function() {
        let {value} = txt;
        let fhx = value;
        let li = document.createElement('li');
        let btns = document.createElement('button');
        let span = document.createElement('span')
        btns.innerText ='反和谐';
       btns.onclick = function () {
           span.innerText = fhx;
       }
        let sql = ['卧槽','艹','羊驼','你妹','我靠','去你的','傻叉']; // /卧槽|艹|羊驼/
        let str = '*%#$@^!';// 这个字符串是替换的文字
        let re = new RegExp(sql.join('|'),'g');// /卧槽|艹|羊驼/g
        value = value.replace(re,($0) => {
           // $0是每次匹配到的敏感词
           // 拿到敏感词之后要看下length，通过length去添加替换文字的个数

           // 拿到0-替换字符串长度的数字
           let temp = '';
           for (let i = 0; i < $0.length; i++) {
               temp +=   str[ Math.round(Math.random() * (str.length - 1))];
               
           }
         
           return temp;
        });
        // console.log(re);  // 验证正则匹配后是否生效
        span.innerText = value;
        li.appendChild(span);
        li.appendChild(btns);
        ul.insertBefore(li,ul.children[0]);
        txt.value = '';
    }
    </script>
```
##### replace面试题

```
 <script>
    /* 
      2019年11月12日
      2019/11/12
      2019-11-12
      2019-_-!~11_-__-_^_^!12

      1. 把数字拿出来拼接一波     
      2. 把所有非数字拿出来

      \d 一个数字
      \D 一个非数字

      replace的细节
           默认情况下，函数的
           第一个参数是每次匹配字符
           第二个参数是匹配字符索引
           第三个参数是整个字符串
           第四个参数undefined
        如果有分组：
           ()  一个括号是一个分组  从左往右数
           提权： (1+1) * 5
           第一个参数是每次匹配字符
           第二个参数是第一个分组
           之后有几个分组，参数就是分组项
           直到分组读完就正常走索引、整个字符串、undefined

          (((\d+))(((\D)+))((\d+)))    8个分组

        如果分组的后面有量词，那么分组项为最后一个字符  (\d+)  这个分组是最后一个数组
    */
    let str = ' 2019/11/12';
    // let ary = str.match(/\d+/g);
    // console.log(ary[0]+'年'+ ary[1] + '月' + ary[2] + '日' ); // '2019年11月11日'

    // str.replace(/(\d+)\D+(\d+)\D+(\d+)/,function($0,$1,$2,$3) {
    //    console.log($0,$1,$2,$3); // 2019/11/12 1  2019/11/12 undefined
    // });

    let s = str.replace(/((\d)+)\D+(\d+)\D+(\d+)/,function($0,$1,$2,$3,$4) {
    //    console.log($0,$1,$2,$3,$4); // 2019/11/12 2019 9 11 12
       return $1 + '年' + $3 + '月' + $4 + '日';
    });
    console.log(s);// 2019年11月12日
    </script>
```

###特殊转义符
+ \d  一个0到9的数字
+ \D  一个除0到9的任意字符
+ \n 换行
+ (?:)表示非捕获分组，和捕获分组唯一的区别在于，非捕获分组匹配的值不会保存起来
+   ^      ：代表以什么 字符 开头(字符串开头)
+   $      ：代表以什么 字符 结尾（字符串结尾）
	+  ^ + $ = 整个字符串都必须要匹配我的规则
    > `注意：如果^在中括号（[]）中，那么代表排除`
+  |  或者  如: [1 | 2 | 3]  就是或者1或者2或者3

```
// 整个字符串都要符合123才能匹配，但是只要12
     console.log(/12(?=(?:3))/.exec('123')); // ["12", index: 0, input: "123", groups: undefined]
```

```
<script>
    /* 
    16-108岁才能注册
    如何进行验证
    16,17,18,19，20,21,22...,99
    16,17,18,19 1[6-9] 16-19
    20-99 [2-9][0-9]
    100-108 10[0-8]
    ^ 字符串开头
    $ 字符串结尾
    ^ + $ = 整个字符串都必须要匹配我的规则

     */
   let str = '107';
   let srr = '666';
  console.log(/1[6-9]|[2-9][0-9]|10[0-8]/.test(str)); // true
  console.log(/^(1[6-9]|[2-9][0-9]|10[0-8])&/.test(srr)); // false
    </script>
```

### 量词: {}
> `含义： {}代表量词,描述{}前面的字符的数量`

+  {m,} 最少m个，最多不限
+  *+*  -> {1,}  最少一个  最多不限
+   {m,n} -> {2,5} 最少两个，最多5个
+  {n}  最少出现n次，最多出现也只能是n次
+  ?  最少可以没有，最多出现一次 -> {0,1}
+  `*`  最少可以没有，最多无限 -> {0,}

```
    <script>
    /* 
     {}代表量词
      描述{}前面的字符的数量
      {m,} 最少m个，最多不限
      + -> {1,} 最少一个，最多不限
      {m,n} -> {2,5} 最少两个，最多5个
      {n}  最少出现n次，最多出现也只能是n次
      ?  最少可以没有，最多出现一次 -> {0,1}
      *  最少可以没有，最多无限 -> {0,}
     */
     let str = 'a12ca456ca6789ca123456caca1c';
     console.log(str.match(/a\d{0,3}c/g)); // ["a12c", "a456c", "ac", "a1c"]
     console.log(str.match(/a\d{2}c/g)); // ["a12c"]
     console.log(str.match(/a\d?c/g)); // ["ac", "a1c"]
     console.log(str.match(/a\d{0,1}c/g));// ["ac", "a1c"]
     console.log(str.match(/a\d*c/g)); // ["a12c", "a456c", "a6789c", "a123456c", "ac", "a1c"]
     console.log(str.match(/a\d{0,}c/g));// ["a12c", "a456c", "a6789c", "a123456c", "ac", "a1c"]
    </script>
```
### []
> `在[]中的字符在正则中是找任意一个字符
> 如：[123] -> 要没找1要么找2要么找3`
+  [ab]   ：代表a或者b
+  也可以使用`多少-多少`的写法来写
	+  [0-9] --> \d ascll码来编排的
	+  小写英文：[a-z]
	+  大写英文：[A-Z]
	+  如果要拿到大写和小写的字母:
		+  正确写法：[A-Za-z]
		+  错误写法：[A-z];    因为acsll码的91-96是别的字符不算字母
+  中文的区间范围：[\u4e00-\u9fa5]
> `如： /[\u4e00-\u9fa5]/.test('龍'); //true`

```
<script>
    /* 
     [ab]   ：代表a或者b
     在[]中的字符在正则中是找任意一个字符
     [123] -> 要么找1要么找2要么找3

     也可以使用`多少-多少`的写法来写
     [0-9] --> \d ascll码来编排的
     小写英文：[a-z]
     大写英文：[A-Z]
     如果要拿到大写和小写的字母:
        错误写法：[A-z];    因为acsll码的91-96是别的字符不算字母
        正确写法：[A-Za-z]
     */
     let str = 'a1ca2ca3ca4c';
     console.log(str.match(/a\dc/g)); // ["a1c", "a2c", "a3c", "a4c"]
     console.log(str.match(/a(1|2)c/g));// ["a1c", "a2c"]
     console.log(str.match(/a(1|2|3)c/g)); // ["a1c", "a2c", "a3c"]
     console.log(str.match(/a[1|2|3]c/g)); // ["a1c", "a2c", "a3c"]
     console.log(str.match(/a[123]c/g)); // ["a1c", "a2c", "a3c"]
     console.log(str.match(/a[1-3]c/g)); // ["a1c", "a2c", "a3c"]

     let str2 = 'a1cA2ca3^b2b';
     console.log(str2.match(/[A-Za-z]\d[A-Za-z]/g));// ["a1c", "A2c", "b2b"]
    </script>
```
####  ^ 在 []中的特殊含义及使用
> `^本来表示字符串的开头，但如果放在中括号当中，那么代表排除`

```
 let str = 'a12ca456ca6789ca123456caca1ca78c';
     console.log(str.match(/a[^1]+c/g));// a开头，c结尾，中间排除1 ["a456ca6789c", "a78c"]
     console.log(str.match(/a[^123]+c/g)); // ["a456ca6789c", "a78c"]
```
#### [] 面试题

```
 <script>
        /* 
        计算出下列字符字节，假设英文是1个字节，中文是2个字节

        中文的区间范围：[\u4e00-\u9fa5]
        /[\u4e00-\u9fa5]/.test('龍'); //true

         */
        let str = '大渣好,是兄弟就来砍我,come.on!'; // 30
        let num = 0; // 计数
        for (let i = 0; i < str.length; i++) {
            if (/[\u4e00-\u9fa5]/.test(str[i])) {
                num += 2;
            } else {
                num++;
            }
        }
        console.log(num);


        // for (let i = 0; i < str.length; i++) {
        //     if (/[a-z.,!]/i.test(str[i])) {
        //         num++;
        //     } else {
        //         num += 2;
        //     }
        // }
        // console.log(num);
    </script>
```

### 修饰符
> `含义：`
+ g -> global  全局查找
+  i  -> ignoreCase  忽略大小写 


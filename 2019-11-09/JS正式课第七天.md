[toc]

## JS正式课第七天
### map使用复习

```
<script>
    let ary = [1,2,3];
    //返回值是个新的数组，这个新数组的长度和原数组的长度是一致的
    let ary2 = ary.map(()=>{
        return //'<li>';
    });    
    console.log(ary2)
</script>
```

### filter使用复习
+ filter返回的是一个新数组
+ 循环数组的每一项数据，把符合条件的数据返回出去生成一个新的数组（过滤了条件不符合的数据）

```
<script>
    let ary = [1,2,3,4,5,6,7];
    //要拿到4-6之前的数字，包含4,6
    /*
        filter返回的是一个新数组

        循环数组的每一项数据，把符合条件的数据返回出去生成一个新的数组（过滤了条件不符合的数据）

    */
    let ary2 = ary.filter((item,index)=>{
        return item >= 4 && item <= 6;  //把符合大于等于4的和小于等于6的数据放到数组中
    });
    console.log(ary2);
</script>
```
###  sort()使用及复习
> `高阶函数:参数允许传入一个函数，一般来说都是传一个函数返回一个新函数`

+ sort()  默认按照ascll码进行排列  1,12,2
+ 传参的三种排序方式

```
从小到大
                (a,b)=>{
                    return 必须返回合法的数字  > 0 正数 交换位置 a - b;  3,5
                }
            从大到小
                (a,b) =>{
                    return b - a
                }
                
            随机排序
                ()=>{
                    return Math.random() - 0.5;
                }
```

###  live server 插件
> `live-server是一个具有实时加载功能的小型服务器，可以使用它来破解html/css/javascript，但是不能用于部署最终站点。就是说我们可以在项目中实时用live-server作为一个实时服务器实时查看开发的网页或项目效果` 

+ 使用
	+	http://127.0.0.1:5500/index.html 使用右键选择 open with live server

### json获取
+ json文件需要通过服务器环境去拿，安装live server的目的是在编辑器中开一个服务器。当开了服务器之后，就可以通过http请求（fetch）的方式拿到json文件

```
// 固定获取方式

  fetch(文件路径).then(d=>d.json())
        .then(data=>{
            console.log(data);
        })
```

### less
> `通过js方式把相应标签、class或者直接属性名和属性值写进去，生成css文件，将css文件引入html文件中，即html文件所表现样式`

### 关于dataset
+ HTMLElement.dataset属性允许无论是在读取模式和写入模式下访问在 HTML或 DOM中的元素上设置的所有自定义数据属性(data-*)集。
+ 注意，dataset 属性本身可以被读取，但不能直接写入。相反，所有的写入必须是它的“属性”，这反过来表示数据属性。
+ 自定义的数据属性名称是以 data- 开头的。 它必须要遵循 the production rule of xml names 规则，该规则是说它只可以包含字母，数字和下面的字符： dash (-), dot (.), colon (:), underscore (_)。此外不应包含ASCII 码大写字母。

```
HTMLElement.dataset属性允许无论是在读取模式和写入模式下访问在 HTML或 DOM中的元素上设置的所有自定义数据属性(data-*)集。

它是一个DOMString的映射，每个自定义数据属性的一个条目。

请注意，dataset 属性本身可以被读取，但不能直接写入。相反，所有的写入必须是它的“属性”，这反过来表示数据属性。

还要注意，一个HTML data-attribute 及其对应的DOM dataset.property 不共享相同的名称，但它们总是相似的：

在HTML中的一个自定义数据属性的名称以 data- 开头。它只能包含字母，数字和以下字符： dash (-), dot (.), colon (:), underscore (_)  - 但不是任何ASCII大写字母（A到Z）。
JavaScript 中的一个自定义数据属性的名称是相同HTML属性的名称，但在 camelCase中，没有破折号，点等。
 

自定义的数据属性名称是以 data- 开头的。 它必须要遵循 the production rule of xml names 规则，该规则是说它只可以包含字母，数字和下面的字符： dash (-), dot (.), colon (:), underscore (_)。此外不应包含ASCII 码大写字母。

自定义的data 属性名称转化成 DOMStringMap 的键值时会遵循下面的规则：

前缀  data- 被去除(包括减号)；
对于每个在ASCII小写字母 a到 z前面的减号 (U+002D)，减号会被去除，并且字母会转变成对应的大写字母。
其他字符（包含其他减号）都不发生变化
与此相反的转换，即将键值转换为一个属性的名称，会遵循下面的规则：

约束：减号在转变前一定不能紧跟一个ASCII小写字母 a 到 z之间；
添加 data- 前缀;
任何ASCII大写字母 A 到 Z 将转化成一个减号紧跟对应的小写字母；
其他字符不会发生变化
上面规则的约束是为了保证这两种转换是正好相反的转换。
```

#### 语法

```
string = element.dataset.camelCasedName;
element.dataset.camelCasedName = string;
```

```
<div id="user" data-id="1234567890" data-user="johndoe" data-date-of-birth>John Doe
</div>

var el = document.querySelector('#user');

// el.id == 'user'
// el.dataset.id === '1234567890'
// el.dataset.user === 'johndoe'
// el.dataset.dateOfBirth === ''

el.dataset.dateOfBirth = '1960-10-03'; // set the DOB.

// 'someDataAttr' in el.dataset === false

el.dataset.someDataAttr = 'mydata';
// 'someDataAttr' in el.dataset === true
```




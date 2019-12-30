[toc]

## JS正式课第四十二天
### webpack常用的插件和loader

```
style-loader css-loader html-webpack-plugin mini-css-extract-plugin 
optimize-css-assets-webpack-plugin 

webpack-dev-server webpack webpack-cli


-- save-dev 开发模式 （打包之后不会处理这个里面的代码） -D
-- save     生产模式（打包必须处理里面的代码） -S



1.node完结
2.webpack完结
3.ajax考试
```
### vue

```
### Vue

    - jquery    52.8k
    - angular   55.8k
    - React     141k
    - vue       155k
        - MVVM框架  Model View  View Model
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
        - el:'挂载元素',
        - data（存数据）:在**new Vue**下值为***对象***

    - 输出数据用 双花括号 {{放数据名称即可}} 小胡子
```
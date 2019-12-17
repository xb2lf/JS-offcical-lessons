//用户打开页面后，先判断下设置样式是否存在，如果没有就获取并设置到本地存储，如果有则直接应用
let style = localStorage.getItem('style');
if (!style) {
    fetch('./index.css').then(e => e.text()).then(d => {
        let link = document.createElement('style');
        link.innerHTML = d;
        document.querySelector('head').append(link);
        localStorage.setItem('style', d);
    })
} else {
    let link = document.createElement('style');
    link.innerHTML = style;
    document.querySelector('head').append(link);
}

const lis = document.querySelectorAll('#ul1 li');// 获取所有的商品列表
let ary = JSON.parse(localStorage.getItem('gwc')) || [];// 获取设置的本地存储

render(ary);// 每次刷新时用获取到的本地存储刷新购物车列表

// 添加购物车
lis.forEach((ele,i) => {
    ele.onclick = function() {
        if(!ary.includes(this.innerText)) {
            ary.push(this.innerText);
            localStorage.setItem('gwc',JSON.stringify(ary));// 设置本地存储时，会默认转字符串所以需要先通过JSON方法转成对象(数组)
            render(ary);
        }
    }
});

// 只要修改了localStorage的值，兄弟页面就会触发这个事件
window.onstorage = function () {
    ary = JSON.parse(localStorage.getItem('gwc')) || [];
    render(ary);
}

//通过点击ul2删除购物车列表对应项
ul2.onclick = function(ev) {
    if(ev.target.tagName === 'LI') {
        ary = ary.filter(item => item !== ev.target.innerText);// 过滤ary，返回所有不等于已删掉li的项
        render(ary);
        localStorage,setItem('gwc',JSON.stringify(ary));
    }
}

//渲染页面
function render(ary) {
    let html = ary.map(item => `<li>${item}</li>`).join('');
    ul2.innerHTML = html;
}
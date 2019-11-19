/* 
window.onresize   当浏览器窗口缩放的时候触发
*/

const box = document.querySelector('.body');
const head = document.querySelector('.head');
const picw = 236; //图片的宽度
const ml = 10; // margin-left
const boxt = 66; // box的top值
let clinetW = document.documentElement.clientWidth;// 可视区的宽度
let len = Math.floor(clinetW / (picw + ml)); // 看下一行可以放下几个li元素
// 计算ul的宽度，以此来进行自适应窗口
box.style.witdh = (len * (picw + ml)) - ml + 'px';
// console.log(len); // 测试验证下ul的宽度（因为是被内容撑起来的）
let aryx = []; // 存放图片加左边距的lef值，初始值为零，以此作为定位，按照最小高度的li渲染页面
let aryy = []; // 存放图片的top值，初始值为零，以此作为定位，按照最小高度的li渲染页面
for (let i = 0; i < len; i++) {
    aryx[i] = i * (picw + ml);// 将每个li对应的初始letf值写进数组
    aryy[i] = 0; // 将每个li对应的初始 top值都设为零
}
function minIndex(ary) {
    let min = Math.min(...ary);
    // 根据最短的值，找到对应的索引，有了这个索引就能应对li
    let index = ary.findIndex(item => item === min);
    return {
        index,
        min,
    }
}

//根据找到每次渲染最短的li和相对应的索引值，对页面进行动态写入，渲染页面
function render() {
    fetch('./data.json').then(d => d.json()).then(ary => {
        //  console.log(ary);
        //在循环数组的过程当中去计算每个li的高度，找到最短的li
        ary.forEach((item, i) => {
            let { index } = minIndex(aryy);// 找出数组中top值最小的索引
            let li = document.createElement('li');// 创建一个li元素，以便按照顺序动态写入页面，来渲染页面
            // 设置每个li对应的top值和left值
            li.style.cssText = `top:${aryy[index]}px;left:${aryx[index]}px`;
            let div = document.createElement('div');
            div.className = 'img_box';
            let img = document.createElement('img');
            img.src = item.pic;

            let p1 = document.createElement('p');
            let p2 = document.createElement('p');
            p1.className = 'desc';
            p1.innerText = item.desc;
            p2.className = 'author';
            p2.innerText = item.author;
            div.append(img);
            div.append(p1);
            div.append(p2);
            li.append(div);
            box.append(li);
            setTimeout(() => {
                img.style.opacity = 1;
            }, 200);
            // 每次添加完一个li之后，把当前li的高度+左间距 赋值到数组的对应项中，以便下次再进行比较
            aryy[index] += (boxt + item.height * 1 + 20);// 按照数组中top值最小的索引对应的值加上每个里对应的内容撑起的高度再加上下边距20px
        });
    });
}
render();
// 防抖
function debounce(cb, time) {
    let timer;
    return function (...arg) {
        // 当事件触发时的时候就先关闭上次的timer
        if (timer) {
            clearTimeout(timer);
        }
        timer = setTimeout(() => {
            cb.call(this, ...arg);
        }, time);
    }
}

//节流
function throttling(cb, time) {
    let prevtime = 0,
        timer;
    return function (...arg) {
        let nowTime = +new Date;
        // console.log(nowTime - prevtime)
        if (nowTime - prevtime > time) {
            cb.call(this, ...arg);
        } else {
            clearInterval(timer);
            timer = setTimeout(() => {
                // console.log(+new Date - prevtime);
                if (+new Date - prevtime > time) {
                    cb.call(this, ...arg);
                }
            }, time);
        }
        prevtime = nowTime;
    }
}
// 滚动条滚动的时候判断是否触底
let wiH = window.innerHeight; // 可视区的高度
window.onscroll = debounce(fn, 200);
// window.onscroll = throttling(fn,1000);
function fn() {
    // 判断ul的高度是否比可视区要大，如果小于可视区高度，那么就终止加载代码执行
    // if (box.scrollHeight < wiH) return;
    let {index} = minIndex(aryy);// li最短的高度
    let scroll = window.pageYOffset; // 滚动条的距离
    if (wiH + scroll >= aryy[index]) {
        console.log('已到达页面底部');
        render();
    }
}
// 当浏览器缩放的时候，重新计算下可视区每一行能够放几个li
window.onresize = function () {
    clinetW = document.documentElement.clientWidth;// 可视区的宽度
    len = Math.floor(clinetW / (picw + ml)); // 看下一行可以放下几个li元素
    // 计算ul的宽度，以此来进行自适应窗口
    box.style.witdh = (len * (picw + ml)) - ml + 'px';
    // 把两个数组的长度归零清空，然后重新计算相应的值
    aryx.length = 0;
    aryy.length = 0;
    wiH = window.innerHeight; // 可视区的高度
    for (let i = 0; i < len; i++) {
        aryx[i] = i * (picw + ml);// 将每个li对应的初始letf值写进数组
        aryy[i] = 0; // 将每个li对应的初始 top值都设为零
    }
    // 获取所有的li，然后按照顺序重新动态写入页面，渲染页面
    const lis = box.querySelectorAll('li');
    lis.forEach((ele, i) => {
        let { index } = this.minIndex(aryy);//找出数组中top值最小的索引
        ele.style.cssText = `top:${aryy[index]}px;left:${aryx[index]}px`;// 设置每个li对应的top值和left值
        // 设置完每个li对应的top值和left值后，把当前li的高度+左间距 赋值到数组的对应项中，以便下次再进行比较
        aryy[index] += (ele.scrollHeight + 10); // 按照数组中top值最小的索引对应的值加上每个里对应的内容撑起的高度再加上下边距10px

    });

}

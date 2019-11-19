const box = document.querySelector('.body');
const lis = box.querySelectorAll('li');
const head = document.querySelector('.head');

// 找到classNane名为body的div下每次渲染最短(高度)的li，并找到相对应的索引值

function minEle(lis) {
    // ary就是每个li被内容撑开的高度
    let ary = [...lis].map(ele => ele.scrollHeight);
    // console.log(ary);
    // 找到最小高度的li的高度值
    let min = Math.min(...ary);
    // 根据最短的值，找到对应的索引，有了这个索引就能应对li
    let index = ary.findIndex(item => item === min);
    return {
        ele: lis[index],
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
            let { ele } = minEle(lis);
            //console.log(ele)
            //怼结构
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
            ele.append(div);
            setTimeout(() => {
                img.style.opacity = 1;
            });
        });
    });
}
render();
// 滚动条滚动的时候判断是否触底
let wiH = window.innerHeight;
window.onscroll = fn;
function fn() {
    // 判断ul的高度是否比可视区要大，如果小于可视区高度，那么就终止加载代码执行
    if(box.scrollHeight < wiH)return;
    let {min} = minEle(lis);// li最短的高度
    let scroll = window.pageYOffset; // 滚动条的距离
    if(wiH + scroll >= min + head.offsetHeight){
        console.log('已到达页面底部');
        render();
    }
}

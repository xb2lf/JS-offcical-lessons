class Tools {
    getMinIndex(obj) {
        // 如果获取到的不是数组
        if (!Array.isArray(obj)) {
            obj = [...obj].map(item => {
                return item.scrollHeight;
            });
        }
        // console.log(obj);
        let min = Math.min(...obj);
        let index = obj.findIndex(item => item === min);
        return {
            min,index
        }
    }
    throttling(cb, time) {
        let prevtime = 0;
        return function (...arg) {
            let nowTime = +new Date;
            // console.log(nowTime - prevtime);
            if (nowTime - prevtime > time) {
                cb.call(this, ...arg);
            }
            prevtime = nowTime;
        }
    }

    debounce(cb, time) {
        let timer;
        return function (...arg) {
            //当事件触发的时候就先关闭上次的timer
            if (timer) {
                clearTimeout(timer);
            }
            timer = setTimeout(() => {
                cb.call(this, ...arg);
            }, time);
        }
    }

}

class Waterfall extends Tools {
    constructor(name) {
        super();
        this.box = document.querySelector(name);
        this.list = this.box.children;// li
        this.wh = window.innerHeight; // 可视区的高度
        this.bodyT = this.box.offsetTop; // ul的定位距离
        this.loading = document.getElementById('loading');
        this.onoff = true;
        // console.log(this.getMinIndex(this.list));
    }
    api(url, cb) {
        let that = this;
        fetch(url).then(d => d.json()).then((data) => {
            cb.call(that,data);
        });
    }
    render() {
        this.onLd(); // 当开关为true时
        this.changeLoading(); // 最下边加载的动画进行显示或者不显示
        setTimeout(() => {
            this.api('./data.json', function (data) {
                // console.log(data);
                this.offLd();// 当开关为false时
                this.changeLoading();// 最下边加载的动画进行显示或者不显示
                data.forEach((d, i) => {
                    let {index} = this.getMinIndex(this.list); // 获取最小高度的li对应索引
                    let div = this.create(d); // 创建一个div，并将相应子元素和属性添加
                    // console.log(div);
                    // console.log( this.list[index]);
                    this.list[index].append(div);// 将对应的div写入到页面已存在的li
                    setTimeout(() => {
                        div.children[0].style.opacity = 1; // 即div里的img，透明度初始值已设置为零，在渲染完成后，通过计时器的方式逐渐将透明度的值调1.
                    }, i * 100);
    
                });
            }); // 获取到数据进行操作
        }, 1000);
    }
    create({height,pic,desc,author}) {
        let div = document.createElement('div');
        div.className = 'img_box';
        div.innerHTML = `
        <img height="${height}" src="${pic}" alt="">
        <p class="desc">"${desc}</p>
        <p class="author">"${author}</p>`;
        return div;
    }
    scroll() {
        let fn = () => {
            let { index } = this.getMinIndex(this.list);// 获取最小高度的li对应索引
            if ((window.pageYOffset + this.wh) > (this.list[index].scrollHeight + this.bodyT)) {
                console.log('触底');
                this.render(); // 继续加载渲染页面
            }
        }
        window.onscroll = this.debounce(fn, 200); // 防抖
        window.onresize = () => {this.wh = window.innerHeight;}; // 当可视区大小调整时，宽度自适应
    }
    changeLoading() {
        this.loading.style.display = this.onoff ? 'block' : 'none';
    }
    onLd() {
        this.onoff = true;
    }
    offLd() {
        this.onoff = false;
    } 
}
let w = new Waterfall('.body');
w.render(); // 渲染页面
w.scroll();// 当滚动条向下滑动时，页面继续进行加载渲染
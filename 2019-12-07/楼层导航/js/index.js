const $content = $('.content');
const $leftNav = $('.leftNav');
const $img_contents = $('.img-contents');
const $showList = $('.showlist');
const $lis = $('.show-item');
// 渲染页面
function render() {
    let ary = ['1.jpg', '2.jpg', '3.jpg', '4.jpg', '5.jpg', '6.jpg', '7.jpg', '8.jpg', '9.jpg', '10.jpg', '11.jpg'];
    ary.forEach((ele, i) => {
        let $img_item = $(`<li class="img-content" id="item-${i}">
        <img src="./images/${ele}" alt="">
    </li>`);
        $img_contents.append($img_item);
    });
}
render();

const $contents = $content.find('.img-content');
let h = -$contents[0].clientHeight;

// 点击导航切换页面显示
$lis.on("click", function () {
    $(this).addClass('active').siblings().removeClass('active');
    let index = $(this).index();
    $('.img-contents').css({ top: h * index + 'px' })
    let timer = setTimeout(() => {
       $(this).removeClass('active');
        clearTimeout(timer)
    }, 2000);
});

// 鼠标滑动事件
let num = 0;
window.addEventListener('mousewheel', throttling(wheel, 200));
function wheel(ev) {
    // $leftNav[0].style.display = 'block';
     $leftNav.fadeIn('slow');
    //如果 ev.wheelDelta>0 表示上滚 图片向下向下否则表示下滚
    if (ev.wheelDelta > 0) {
        num++;
        if (num === 10) {
            let timer1 = setTimeout(() => {
                // $leftNav[0].style.display = 'none';
                $leftNav.fadeOut('slow');
                clearTimeout(timer1);
            }, 3000);
        }
        if (num > 10) {
            num = 10;

        }
    } else {
        num--;
        if (num === 0) {
            let timer2 = setTimeout(() => {
                // $leftNav[0].style.display = 'none';
                $leftNav.fadeOut('slow');
                clearTimeout(timer2);
            }, 3000);
        }
        if (num < 0) {
            num = 0;
        }
    }

    //$img_contents[0].style.top = (h * num) + 'px';
    $img_contents.css({top:(h * num) + 'px'});
    $lis.eq(num).addClass('active').siblings().removeClass('active');

}
//节流  
function throttling(cb, time) {
    let prevtime = 0;
    return function (...arg) {
        let nowTime = +new Date;
        // console.log(nowTime - prevtime)
        if (nowTime - prevtime > time) {
            cb.call(this, ...arg);
        }
        prevtime = nowTime;
    }
}
const $content = $('.content');
const $showList = $('.showlist');
const $as = $showList.find('a');
const $lis = $('.show-item');
// 渲染页面
function render() {
    let ary = ['1.jpg', '2.jpg', '3.jpg', '4.jpg', '5.jpg', '6.jpg', '7.jpg', '8.jpg', '9.jpg', '10.jpg', '11.jpg'];
    ary.forEach((ele, i) => {
        let $img_item = $(`<div class="img-content" id="item-${i}">
        <img src="./images/${ele}" alt="">
    </div>`);
        $content.append($img_item);
    });
}
render();

const $contents = $content.find('.img-content');

// 鼠标滑动事件
$content.on('scroll', function () {
    let $scrollTop = $content.scrollTop();// 滚动条的高度
    let $activeIndex;
    $contents.each((index, floor) => {
        let t = $(floor).offset().top;// 每个图片的在当前视口的相对top值
        console.log(t);
        t - 50 <= $scrollTop ? $activeIndex = index : null;
    });
    $as.each((index, nav) => {
        index === $activeIndex ? $(nav).addClass('active') : $(nav).removeClass('active');

        if (index === $activeIndex && index === 0) {
            setTimeout(() => {
                $(nav).removeClass('active');
            }, 3000);
        }
    });
})

// 点击导航事件

$.each($lis,(index,item) => {
   $(item).on('click',function(ev) {
        // let itemindex = index;
        let $scrollTop = $content.scrollTop();
        $contents.each((i,floor) => {
            let t = $(floor).offset().top;
            if(i === itemindex) {
                $scrollTop = t;
            }
        })
    })
})

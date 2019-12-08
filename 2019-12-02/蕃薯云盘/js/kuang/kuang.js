const $fBox = $('#fBox');
const $kuang = $fBox.find('.kuang');
const {left:box_l,top:box_t} = $fBox.offset();
const $dui2 = $fBox.find('#dui2');
$fBox.on('mousedown',function (ev) {
    let disX = ev.pageX,disY = ev.pageY,
    $folder = $folders.find('.file-item');

    /* 
     *  在鼠标按下时，通过ev.target去判断，当前元素是不是文件夹，或者看看目标元素的父级是*  不是文件夹，如果是就不让画的框显示出来
     */

     if($(ev.target).closest('.flle-item').length) return;

     $kuang.show().css({
         left:disX - box_l,
         top:disY - box_t,
         border: '1px dashed #000',
     });

     $fBox.on('mousemove',function(ev) {
         $kuang.css({
             // 移动的距离减去之前按下的
             width:Math.abs(ev.pageX - disX),
             height:Math.abs(ev.pageY - disY),
             // 鼠标移动的距离（基于可视区的）- fBox的距离
             left:Math.min(ev.pageX - box_l,disX - box_l),
             top:Math.min(ev.pageY - box_t, disY - box_t),
         });

         // 鼠标移动的时候去判断下鼠标是否碰到了文件夹，如果碰到了，碰到了几个
         $folder.each((i,ele) => {
             if(impact($kuang[0],ele)) {
                 list.forEach(item => {
                     // 数据的id和碰到文件夹的did去比较，如果相等就把item的checked值设为true
                     if(item.id === $(ele).attr('did') * 1) {
                         item.checked = true;
                         $(ele).find('i').show();
                         $(ele).addClass('active');
                         
                     }
                 });
             }else {
                list.forEach(item => {
                    if(item.id === $(ele).attr('did') * 1) {
                        item.checked = false;
                        $(ele).find('i').hide();
                        $(ele).removeClass('active');
                    }
                });
             }

             // 如果全选就把把全选的勾勾上，否则全部取消

             if(list.every(item => item.checked)) {
                 $dui1.show();
                 every = true;
             }else {
                 $dui1.hide();
                 every = false;
             }
         });
         return false;
     });
     $(document).on('mouseup',function (ev) {
        $fBox.off('mousemove');
        $(document).off('mouseup');
        $kuang.css({
            width:0,
            height:0,
            display:'none',
            border:'none',
            top:0,
            left:0
        });
        // returnVal 只要是returnVal为true(不需要阻止默认行为，就没必要画框)
        if(ev.pageX === disX && ev.pageY === disY && !returnVal) {
            list.forEach(item => item.checked = false);
            $folder.each((i,ele) => {
                $(ele).find('i').hide();
                $(ele).removeClass('active');
            });
            every = false;
            $dui1.hide();
        }
     });

     ev.originalEvent.returnValue = returnVal;
});

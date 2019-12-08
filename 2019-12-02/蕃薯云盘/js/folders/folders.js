const $folders = $('.folders');// 放文件夹的盒子
const $f_empty = $('.f-empty');
const $checkall = $('.checkall'); // 全选选择框外边的大盒子
const $checkedAll = $('#checkedAll'); // 全选选择框
const $dui1 = $('#dui1');
let  every = true;
let returnVal = false;

function render(num = 0) {
    every = true; // 初始状态设为true
    $folders.html('');
    let d = tools.getChild(data,num);
    list = d; // 每次render的时候都把最新的当前需要显示的数据更新
    ownpid = num;
    if(!d.length) {
        $fBox.hide();
        $f_empty.show();
        return;
    }

    $f_empty.hide();
    $.each(d,(i,item) => {
        // 只要有一个数据的布尔值为false，就不可能全部选中，只要不是全部选中checkedALl就不能被勾选
        if(!item.checked) {
            every = false;
            $dui1.hide();
        }
        const {checked,id,title} = item;
       
        let $folder = $(`<div class="file-item ${checked?'active':''}" did="${id}">
        <img src="images/folder-b.png" alt="">
        <span class="folder-name">${title}</span>
        <input type="text" class="editor" value="${title}">
        <div class="checked"></div>
        <i id="dui2" class="iconfont icon-duihao" style="display:${checked ? 'block': 'none'}"></i></div>`);  // style="display:${checked ? 'block': 'none'}"

        // 单选
        let $img = $folder.find('img');
        let $checked = $folder.find('.checked');
        let $dui2 = $folder.find('#dui2');
      
        // console.log(data[id].checked); // false
        $checked.click(function() {
            data[id].checked = true;
            render(num);
        })

        $dui2.click(function() {
            data[id].checked = false;

            render(num);
        })
        
        $img.dblclick(function() {
            let id = $(this).parent().attr('did') * 1;// 获取每个文件夹的自定义属性did
            // 只要双击文件夹，先把当前对应数据的布尔值清掉
            d.forEach(item => item.checked = false);
            $dui1.hide();
            render(id);
            createMenu(id); // 为了联动面包屑
            return false;
        });
        $folder.mousedown(function() {return false}); // 阻止按下文件夹的默认行为
        $folders.append($folder);

    });

    // 点击全选按钮
    $checkall.off().click(function () {
        // 如果list是个空数组，就不用render
        if(!list.length)return;
        d.forEach(item => item.checked = !every);// 先同步数据
        render(num); // 再次通过数据渲染页面
    });
    if(every) {
        $dui1.show();
    }
}

render(0);
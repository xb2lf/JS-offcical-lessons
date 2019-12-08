const $newcreate = $('#newcreate');
const $del = $('#delete');
const $rename = $('#rename');
const $move = $("#move");
const $tanbox = $('#tanbox');
const $iclose = $('.iclose');
const $conf_btn = $('.conf-btn');
const $sure = $('.sure');
const $cancel = $('.cancel');
const $full_tip_box = $('.full-tip-box');
const $del_tip_box = $('.del-tip-box');
let ownpid;
//新建文件夹
$newcreate.click(function (ev) {
    returnVal = true;
    $f_empty.hide();
    $fBox.show();
    let $folder = $(`<div class="file-item">
       <img src="images/folder-b.png" alt="">
       <span class="folder-name"></span>
       <input type="text" class="editor" placeholder="请设置文件名" value="新建文件夹"">
       <div class="checked"></div>
       <i id="dui2" class="iconfont icon-duihao"></i></div>`);
    $('#folders').append($folder);
    let $txt = $folder.find('input');
    let $span = $folder.find('span');
    $span.hide();
    $txt.css('display', 'block');
    $txt.select();
    $txt.blur(function blur() {
        let val = $txt.val();
        if (val === '') {
            alert('命名不能为空哦');
            render(list[0].pid);
            return;
        }
        let bool = list.map(item => item.title).includes(val);
        let nval = '';
        let num = 1;
        nval = val;
        while (bool) {
            let s = val.replace(/\(\d\)$/, '') + '(' + num++ + ')';
            bool = list.map(item => item.title).includes(s);
            nval = s;
        }
        // console.log(ownpid,list[0]);
        //向数据中添加id和title

        data[+new Date] = {
            "id": +new Date,
            "pid": ownpid,
            "title": nval,
            "type": "file",
            "checked": false
        }
        render(ownpid);
        $full_tip_box.show();
        $del_tip_box.hide();
        setTimeout(() => {
            $full_tip_box.hide();
           
        }, 500);
    })
    ev.originalEvent.returnValue = false;
})


// 关闭鼠标按下新建文件夹默认事件 
$newcreate.on('mousedown', function (ev) {
    ev.originalEvent.returnValue = false;
})

//删除
$del.click(function () {
    $tanbox.show();

    // 去判断至少要有一个文件被选中，如果都没被选中，说明找不到要删除的文件
    if (list.some(item => item.checked)) {
        let { pid } = list[0];
        $sure.click(function () {
            $tanbox.hide();
            $sure.css('background', '#00BFFF');
            $cancel.css('background', '#ccc');

            list.forEach(item => {
                if (item.checked) {
                    delete data[item.id];
                }
            });
            render(pid);
            $full_tip_box.hide();
            $del_tip_box.show();
            setTimeout(() => {
                $del_tip_box.hide();
            }, 500);
        });

        //点击取消，关闭删除状态
        $cancel.click(function () {
            $sure.css('background', '#ccc');
            $cancel.css('background', '#00BFFF');
            $tanbox.hide();
        });


        // 点击x关闭提醒框
        $iclose.click(function () {
            $tanbox.hide();
        });

    } else {
        $tanbox.hide();
        alert('请您选择文件后，再进行操作');
    }

});



//重命名
$rename.click(function () {
    returnVal = true;
    let reData = list.filter(item => item.checked);
    if (list.some(item => item.checked)) {
        if (reData.length === 1) {
            // reData.title = val  (不能重名)
            let $folder = $folders.find('.active');
            let $span = $folder.find('span');
            let $txt = $folder.find('input');
            $span.hide();
            $txt.css('display', 'block');
            $txt.select();
            $txt.blur(function () {
                /* 
                不能重名：
                       1. 用户修改了吗？如果没有就恢复原先命名，如果有就进行修改案
                       2.命名有没有重名
                */
                let val = $txt.val();
                if ($span.text() === val) {
                    $span.show();
                    $txt.hide();
                } else {
                    if (!val) {
                        console.log('请您填写新名字');
                        $txt.val($span.text());
                        $txt.select();
                        return;
                    }
                    let { id, pid } = reData[0];
                    let siblings = list.filter(item => item.id != id);
                    if (siblings.some(item => item.title === val)) {
                        console.log('您所填写的内容已重复');
                        $txt.select();
                    } else {
                        // 当用户修改文件名字成功后要阻止默认行为
                        returnVal = false;
                        data[id].title = val;
                        data[id].checked = false;
                        render(pid);
                    }
                }
            });
        } else {
            alert('不好意思，您只能选择一个文件');
        }
    } else {
        alert('请您选择文件,后再进行操作');
    }
})

// 菜单树

let that = null;
let okcode = -1;
function createModelTree(num) {
    // 通过num找到对应的子级
    let ary = getChild(data, num);
    if (!ary.length) return;
    // 只要有子级就创建一个ul，因为ul中要插入li
    let $ul = $('<ul style="padding-left:5px"></ul>');
    // 循环子级数据，生成很多的li
    ary.forEach(item => {
        let $li = $(`<li>
        <div class="tree-title tree-ico">
        <span><i></i>${item.title}</span>
         </div>
         </li>`);

        if (!getChild(data, item.id).length) {
            $li.find('i').css('background', 'none');
        }

        $li.off().click(function () {
            let reData = list.filter(item => item.checked);
            // 点击li的时候，看看点击的文件和要移动的文件是不是有直接关系;如果有直接关系就点不开
            if (reData.some(d => d.id === item.id)) {
                okcode = 'error';
                return;
            } else {
                okcode = item.id;
            }

            if (that) {
                that.css({ background: 'none' });
            }
            $(this).find('span').css({
                background: 'rgba(0,0,0,0.1',
            });
            that = $(this).find('span');

            if (this.children[0].classList.toggle('open')) {
                $(this).append(createModelTree(item.id));
            } else {
                $(this).find('ul').remove();
            }

            return false;
        });
        $ul.append($li);
    });
    return $ul;
}

//移动到功能
const $model_list = $('#model_list').children();
$move.off().click(function () {
    let reData = list.filter(item => item.checked);
    if (!reData.length) {
        console.log('请您选择文件后再进行操作');
    } else {
        $('.modal-tree').show();
        $model_list.find('ul').remove();
        $model_list.append(createModelTree(0));
    }

    const ok = $('.modal-tree').find('.ok');
    const cancel = $('.modal-tree').find('.cancel');
    const icon_close = $('.modal-tree').find('.icon_close');
    ok.off().click(function () {
        if (okcode === 'error') {
            console.log('这是非法操作');
            return;
        }

        let id = reData[0].pid;// 保存下之前修改的pid，为了一会刷新页面
        reData.forEach(item => {
            item.pid = okcode;
            item.checked = false;
        });
        $menuArea.children().children().append(createTree(0, true));
        render(id);
        $('.modal-tree').hide();
    })
    cancel.off().click(function () {
        $('.modal-tree').hide();
    });
    icon_close.off().click(function () {
        $('.modal-tree').hide();
    })
})
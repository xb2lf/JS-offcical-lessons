//面包屑功能

const {getParents,getChild,getChilds,impact} = tools;
const $breadnNav = $('.bread-nav');
 

let list = null;

function createMenu(id) {
    $breadnNav.html('');
    let pary = getParents(id); // 找点前id下的所有父级包括自己
    pary.forEach((item,i,all) => {
        let $navChild = null;
        if(i === all.length - 1) {// 如果item是数组的最后一项，那么元素应该为span
            $navChild = $('<span>' + item.title + "</span>");
            // console.log($navChild);
        }else{
            $navChild = $('<a href="javascript:void(0);">'+ item.title +'</a>');
            // console.log($navChild);
        }
  
        // 点击面包屑，让文件夹和面包屑一起动
        $navChild.on('click',function() {
            $fBox.show();
            tools.getChild(data,id).forEach(item => item.checked = false);
            render(item.id);
            createMenu(item.id);
        })
        $breadnNav.append($navChild);
    });
}

createMenu(0);

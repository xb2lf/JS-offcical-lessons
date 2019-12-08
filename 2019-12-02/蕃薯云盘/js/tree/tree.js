let $menuArea = $('.menuArea');

function createTree(num,onoff) {

    // 如果在盒子第三层有ul则可以删除
    if(onoff) {
        $menuArea.children().children().find('ul').remove();
    }

    // 通过num找到对应的子级
    let ary = getChild(data,num);
    if(!ary.length)return;
    let $ul = $('<ul style="padding-left:5px"></ul>');
    // 循环子级数据，生成很多的li
    ary.forEach(item => {
        let $li = $(`<li>
        <div class="tree-title tree-ico">
        <span><i></i>${item.title}</span>
         </div>
         </li>`);

         if(!getChild(data,item.id).length) {
             $li.find('i').css('background','none');
         }

         $li.off().click(function () {
            if(this.children[0].classList.toggle('open')) {
                $(this).append(createTree(item.id));
                render(item.id);
                createMenu(item.id);
            }else {
                $(this).find('ul').remove();
            }

            return false;
            });
            $ul.append($li);
    });
    return $ul;
} 

$menuArea.children().children().append(createTree(0));
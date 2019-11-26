class Tab{ // 切换功能
    constructor(that) {
        this.box = that;
        // console.log(this.box);// jquery对象 k.fn.init [div#box]
        this.opts = {
            btns:['按钮一','按钮二','按钮三'],
            content:[
                '1111',
                '222',
                '3333'
            ]
        }
    }

    init(opts){
        $.extend(true,this.opts,opts);
        this.createBtn();
        this.createDiv();
        this.events();
    }

    createBtn() { // 创建btn，并插入到div当中,切换按钮
        this.opts.btns.forEach((item,i) => {
            this.box.append($(`<button class="${i == 0 ? 'active' : ''}">${item}</button>`))
        });
    }
    
    createDiv() {// 创建div，并插入到大div中，具体展示内容
        this.opts.content.forEach((item,i) => {
            this.box.append($(`<div class="${i == 0 ? 'show' : ''}">${item}</div>`))
        });
    }
    events() {// 点击切换，并变换相应的样式
        this.btns = this.box.find('button');
        this.divs = this.box.find('div');

        let that = this;

        this.btns.click(function() {
            $(this).addClass('active').siblings('button').removeClass('active');
           
            that.divs.eq($(this).index('button')).addClass('show').siblings('div').removeClass('show');
        });
    }
    
}

class Drag{// 拖拽功能
    constructor(that) {// 初始化位置
        this.box = that;
        this.disX = 0;
        this.disY = 0;
    }

    position() {// 做好大div的绝对定位
       this.box.css({
           position:'absolute',
           top:0,
           left:0,
       })
    }
   
   mousedown() {// 当鼠标点击按住大div时
     let that =this;
     this.box.mousedown(function(ev) {
        that.disX = ev.pageX - $(this).offset().left;
        that.disY = ev.pageY - $(this).offset().top;
        that.mousemove(); // 执行mousemove事件，因为mousemove和mouseup都是在mousedown总触发
        that.mouseup(); // 执行mouseup事件，因为mousemove和mouseup都是在mousedown总触发
        return false;// 阻止系统默认事件
     });
   }

   mousemove() {// 当鼠标开始拖拽时
     let that = this;
     $(document).mousemove(function (ev) {
        that.box.css({
            top:ev.pageY - that.disY,
            left:ev.pageX - that.disX
        })
     });
   }

   mouseup(){ // 当鼠标抬起时
    $(document).mouseup(function(ev){
        $(this).off('mousemove');
        $(this).off('mouseup');
    });
}

}
$.fn.extend({
    tabs:function(opts) {// 实现切换功能
        let t = new Tab(this);
        t.init(opts);
        return this; // 做链式调用
    },
    dialog:function() {
      let d = new Drag(this);
      d.position();
      d.mousedown();
    }
});
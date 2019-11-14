class Verify {
    constructor() {
        this.inputs = document.querySelectorAll('#contain input');
        // console.log(this.inputs);
        this.qq = document.querySelector('#qq');
        // console.log(this.qq);
        this.email = document.querySelector('#email');
        // console.log(this.email);
        this.phone = document.querySelector('#phone');
        // console.log(this.phone);
        this.birth = document.querySelector('#birth');
        // console.log(this.birth);
        this.btn = document.querySelector('#btn');
        // console.log(btn);
        // this.infolist = [];    
    }
    init() {
        this.onfocus();
        this.onblur();
        this.onkeyup();
        this.onchange();
        this.btnchange();
    }
    onfocus() { // 当输入框聚焦时，改变输入框样式
        // const that = this;
        this.qq.onfocus = function () {
            this.className = 'focus';
        };
        this.email.onfocus = function () {
            this.className = 'focus';
        };
        this.phone.onfocus = function () {
            this.className = 'focus';
        };
        this.birth.onfocus = function () {
            this.className = 'focus';
        }
    }
    onblur() { // 当输入框失去焦点时，改变输入框样式
        this.qq.onblur = function () {
            this.className = 'ok';
        };
        this.email.onblur = function () {
            this.className = 'ok';
        };
        this.phone.onblur = function () {
            this.className = 'ok';
        };
        this.birth.onblur = function () {
            this.className = 'ok';
        };
    }

    onchange() { //光标离开时改变输入框样式
        this.qq.onchange = function () {
            this.className = 'ok';
        };
        this.email.onchange = function () {
            this.className = 'ok';
        };
        this.phone.onchange = function () {
            this.className = 'ok';
        };
        this.birth.onchange = function () {
            this.className = 'ok';
        };

    }
    onkeyup() {// 检查输入内容是否符合规则
        // 检查qq输入是否正确
        this.qq.onkeyup =function () {
            if (/^[1-9]\d{4,11}$/.test(this.value)) {

                this.className = 'ok';
            } else {
                this.className = 'error';
            }
        }

        // 检查邮箱是否输入正确
        this.email.onkeyup =function () {
            console.log(this.value);
            if (/^[a-zA-Z][\w.-]{5,17}@[0-9a-zA-Z]{2,10}\.c(om|n)$/.test(this.value)) {

                this.className = 'ok';
            } else {
                this.className = 'error';
            }
        }

        // 检查手机号是否输入正确
        this.phone.onkeyup =function () {
            if (/^1[3-9]\d{9}$/.test(this.value)) {

                this.className = 'ok';
            } else {
                this.className = 'error';
            }
        }

        // 检查生日是否输入正确
        this.birth.onkeyup =function () {
            if (/^((?:19[2-9]\d{1})|(?:20[01][0-8]))\-((?:0?[1-9])|(?:1[0-2]))\-((?:0?[1-9])|(?:[1-2][0-9])|30|31)$/.test(this.value)) {

                this.className = 'ok';
            } else {
                this.className = 'error';
            }
        }
       
    }
    btnchange() { // 检查前四个input是否都输入合格，如果合格允许点击注册，否则不允许
        const that = this;
        this.btn.onmouseover = function () {
            if((/^[1-9]\d{4,11}$/.test(that.qq.value)) && (/^[a-zA-Z][\w.-]{5,17}@[0-9a-zA-Z]{2,10}\.c(om|n)$/.test(that.email.value)) && (/^1[3-9]\d{9}$/.test(that.phone.value)) && (/^((?:19[2-9]\d{1})|(?:20[01][0-8]))\-((?:0?[1-9])|(?:1[0-2]))\-((?:0?[1-9])|(?:[1-2][0-9])|30|31)$/.test(that.birth.value))) { 
               that.btn.style.cursor = 'pointer';
            }
        }
        this.btn.onclick =function () {
        that.qq.value = that.email.value = that.phone.value = that.birth.value = '';
        window.location.href="http://www.zhufengpeixun.cn/";

        }
    }
}

let info = new Verify();
info.init();

    new Vue({
        el:'.todoapp',
        data:{ 
            all:false,
            val:'',
            hash:window.location.hash || '#/all',
            ary:[],
        },
        created(){
           window.onhashchange = () => {
               this.hash = window.location.hash;
           }
           this.ary = getData();
        },
        methods:{
            //按回车创建数据
           add() {
               if(!this.val) return;
               this.ary.unshift({
                id:Date.now(),
                txt:this.val,
                checked:false,
                onoff:false
            },);
            this.val = '';
           },
           //删除数据
           rm(id) {
               this.ary = this.ary.filter(e => e.id !== id);
           },
           // 切换是否全选
           changeAll(ev) {
                    this.ary = this.ary.map(e => {
                     e.checked = ev.target.checked;
                     return e;
                 })
           },
           // 双击修改
           replace({id},num) {
              this.onoff_FN(id,true); // 打开开关，切换到输入框
              this.$nextTick(() => {
                this.$refs.edit[num].select();// 自动聚焦并选中
            })
           },
           // 失焦
           off({id,txt,onoff},ev) {
               if(!onoff) return;
               const {value} = ev.target;
               //修内容并且内容不一样，这个时候才需要修改数据
               if(value && txt != value) {
                     this.ary.forEach(e => {
                         if(e.id === id) {
                             e.txt = value;
                         }
                     })
               } 
            this.onoff_FN(id,false);// 关闭开关
            
           },
           //公共是否失焦的开关
           onoff_FN(id,b) {
               this.ary.forEach(e => {
                if(e.id === id) {
                   e.onoff = b;
                }
            });
           }
        },
        // 未选中数据的条数，过滤进行判断
        filters:{
            unchecked(val) {
                return val.filter(e => !e.checked).length
            }
        },
        computed:{
            hashAry(){
               
                const {ary,hash} = this;
                // console.log(ary)
                return ary.filter(item=>{
                    switch(hash){
                        case '#/all':
                            return item;
                        case '#/unchecked':
                            return !item.checked;
                        case '#/checked': 
                            return item.checked;
                        default:
                            return item;
                    }
                })
            }
        },
        watch: {
            ary:{
                handler() {
                  this.all = !!this.ary.length && this.ary.every(e => e.checked);
                  this.ary.every(e => e.checked);
                  if(this.ary.length) {
                      localStorage.setItem('data',JSON.stringify(this.ary));
                  }
                },
                deep:true, // 深度监听
                immediate:true, // 一上来就触发
            },
        },
            
    });

    function getData(){
        let d = localStorage.getItem('data');
        return d?JSON.parse(d):[
            {
                id:0,
                txt:'哈哈',
                checked:false,
                onoff:false
            },
            {
                id:1,
                txt:'呵呵',
                checked:true,
                onoff:false
            }
        ]
    }
    new Vue({
        el:'.todoapp',
        data:{ 
            all:false,
            val:'',
            hash:window.location.hash || '#/all',
            ary:[],
        },
        //当数据挂载好之后(数据请求之后获取数据的地方)
        // created() {
        //     this.ary = [
        //         {
        //             id:0,
        //             txt:'哈哈',
        //             checked:true,
        //             onoff:false
        //         },
        //         {
        //             id:1,
        //             txt:'呵呵',
        //             checked:false,
        //             onoff:false
        //         }
        //     ],
        //     this.all = this.ary.every(e => e.checked);
        // },
        created() {
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
            //删除
            rm(id){
                this.ary = this.ary.filter(e=>e.id !== id)
            },
            // 切换是否全选
           changeAll(ev) {
                    this.ary = this.ary.map(e => {
                     e.checked = ev.target.checked;
                     return e;
                 })
           },
           // 双击切换输入框进行修改
           replace({id},num) {
            //   this.ary.forEach(e => {
            //       if(e.id === id) {
            //          e.onoff = true;
            //       }
            //   });
              this.onoff_FN(id,true);
            //   setTimeout(() => {
            //     this.$refs.edit[num].select();//this.$refs.edit[num].focus();
            //   });
            this.$nextTick(() => {
                this.$refs.edit[num].select();
            })
           },

           // 失焦判断数据进行复原还是修改
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
            // this.ary.forEach(e => {
            //     if(e.id === id) {
            //        e.onoff = false;
            //     }
            // });
            this.onoff_FN(id,false);
            
           },
           // 用于判断esc和失焦的公共开关
           onoff_FN(id,b) {
               this.ary.forEach(e => {
                if(e.id === id) {
                   e.onoff = b;
                }
            });
           }
        },
        // 未选中内容的条数
        filters:{
            unchecked(val) {
                return val.filter(e => !e.checked).length
            }
        },
        computed:{
        //   watchAll() {
        //       return this.ary.every(e => e.checked);
        //   },
        hashAry(){
            const {ary,hash} = this;
            return ary.filter(item => {
                switch (hash) {
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
        },
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
        return d ? JSON.parse(d) : [
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
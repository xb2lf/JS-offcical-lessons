<template>
    <div>
       <h1>This is an Login page</h1>
       <p>LOGIN 请登录</p>
       <div class="username">
           用户名:<input type="text" name="" placeholder="请输入用户名" autofocus v-model="val">
       </div>
       <button @click="login">点击登录</button>
       <button @click="islogin">是否登录</button>
    </div>
</template>

<script>
import {get,login} from '../api/api';
    export default {
        data() {
            return {
                val:'',
            }
        },
        methods:{
            login() {
                // get().then(data => {
                //     console.log(data);
                // }); // 测试后跨域成功
               login(this.val).then(data=>{
                    if(data.code === 0){
                        this.$router.push('/');
                    }else{
                        alert('登录失败');
                    }
                    this.val = '';
                })
            },
            islogin() {

            }
        }
    }
</script>

<style  scoped>
.username {
    font-size: 20px
}
   input,button {
       margin-right: 20px;
       margin-top:10px;
       font-size: 20px
   }
   button:first-child{
       margin-left: 20px
   }
</style>
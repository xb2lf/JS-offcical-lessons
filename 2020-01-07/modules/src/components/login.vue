<template>
  <div>
    <p>请登录</p>
    <div class="user">
        用户名:<input type="text" name value placeholder="请输入用户名" autofocus v-model="uname" />
    </div>
    <div class="pass">
        密  码:
    <input type="password" name value placeholder="请输入密码" v-model="pass" />
    </div>
    <button @click="login">登录</button>
  </div>
</template>

<script>
export default {
  created() {
    // console.log(this.$route)
    this.path = this.$route.query.topath;
  },
  data() {
    return {
      uname: '',
      pass: '',
      path: '',
    };
  },
  methods: {
    login() {
      let ary = [
        {
          un: '老李',
          pass: '123456',
          id: 0
        },
        {
          un: '老田',
          pass: '123456',
          id: 1
        }
      ];
      const { uname, pass } = this;
      setTimeout(() => {
        if (ary.some(item => item.un === uname && item.pass === pass)) {
          window.localStorage.setItem("login", uname);
          this.$router.push({
            path: this.path
          });
        }else {
            localStorage.clear();
        }
      }, 2000);
    }
  }
};
</script>

<style  scoped>
.user,.pass {
    font-size: 20px;
    color: #333;
    text-align: center;
}
input {
    text-align: left;
    margin-top: 10px;
    color: #333;
    font-size: 20px;
}
button {
    margin-top: 10px;
    font-size: 20px;
}
</style>
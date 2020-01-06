<template>
  <div>
     <button type="" @click="numFn">按钮{{num}}</button>
     <HelloWorld :n="num"></HelloWorld>
     <mySlot :arr="ary" #list="cdata">
            <h2>我是:{{cdata.n}}</h2>
            <p>我的年龄是:{{cdata.age}}</p>
            <p>我的编号是:{{cdata.id}}</p>
     </mySlot>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld';
import mySlot from './components/slot';
  export default {
      data() {
        return {
          num:0,
          ary:[
             {
               key:'老刘',
               age:18,
               id:0,
             },
             {
               key:'老张',
               age:18,
               id:1,
             },
          ],
        }
      },
      methods:{
        numFn() {
          this.num ++;
        }
      },
      components:{
        HelloWorld,
        mySlot
      }
  }
</script>

<style lang="scss" scoped>

</style>

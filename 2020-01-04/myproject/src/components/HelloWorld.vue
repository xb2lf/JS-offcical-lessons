<template>
  <div class="box">
    <p>我是children{{n}}</p>
  </div>
</template>

<script>
  export default {
      props:['n']
  }
</script>

<style  scoped>
  .box {
    width: 100px;
    height: 100px;
    background: hotpink
  }
</style>
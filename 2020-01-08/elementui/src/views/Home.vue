<template>
  <div class="home">
    <el-container>
      <el-header >
        <headnav></headnav>
      </el-header>
      <el-container>
        <el-aside width="300px">
          <sidebar></sidebar>
        </el-aside>
        <el-container>
          <el-main>
            <breadcrumb></breadcrumb>
            <list></list>
          </el-main>
          <el-footer>Footer</el-footer>
        </el-container>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import headnav from './headnav';
import sidebar from './sidebar';
import  breadcrumb from './breadcrumb';
import list from './list';
export default {
  name: "home",
  components:{
        headnav,
        sidebar,
        breadcrumb,
        list,
  }
};
</script>
<style>
  .home {
    width: 100%;
    height: 100%;
  }
  .el-container {
    width: 100%;
    height: 100%;
  }
   .el-header, .el-footer {
    background-color: #B3C0D1;
    color: #333;
    text-align: center;
    line-height: 60px;
  }
  .el-header{
    padding: 0 ;
  }
  .el-aside {
    background-color: #D3DCE6;
    color: #333;
    text-align: center;
    line-height: 200px;
  }
  
  .el-main {
    background-color: #E9EEF3;
    color: #333;
    text-align: center;
    line-height: 40px;
  }
  .el-col-12 {
    width:100%;
}
.el-breadcrumb{
    padding: 10px 8px;
    font-size: 16px;
}
  body > .el-container {
    margin-bottom: 40px;
  }
  
  .el-container:nth-child(5) .el-aside,
  .el-container:nth-child(6) .el-aside {
    line-height: 260px;
  }
  
  .el-container:nth-child(7) .el-aside {
    line-height: 320px;
  }
</style>

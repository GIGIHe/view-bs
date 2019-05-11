<template>
  <div class="list">
    <div class="left">
      <el-menu
        class="el-menu-vertical-demo"
        :router=true
      >
        <el-menu-item index="/cat1">
          <span slot="title">有机蔬菜</span>
        </el-menu-item>
        <el-menu-item index="/cat2">
          <span slot="title">新鲜水果</span>
        </el-menu-item>
        <el-menu-item index="/cat3">
          <span slot="title">滋补养生</span>
        </el-menu-item>
        <el-menu-item index="/cat4">
          <span slot="title">米面粮油</span>
        </el-menu-item>
        <el-menu-item index="/cat5">
          <span slot="title">禽蛋肉奶</span>
        </el-menu-item>
      </el-menu>
    </div>
    <div class="right">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.list {
  display: flex;
  justify-content:space-between;
  position: relative;
  margin-bottom: 60px;
  .left {
    width: 220px;
    // height: 400px;
     margin-top: 80px;
    position: absolute;
    left: 50px;
    top: 70px;
    // margin-top: 550px;
    text-align: center;
    font-size: 16px;
    border: 1px solid #ddd;
    background-color: #fff;
    border-radius: 4px;
    overflow: hidden;

    /deep/ .el-menu {
      border: none;
      background: none;
      color: #19aa4b;
    }
    /deep/ .el-menu-item {
      color: #19aa4b;
      border-bottom: 1px solid #eee;
    }
    /deep/ .el-menu-item:hover {
      color: #f40;
    }
  }
  .right{
    flex: 1;
    // height: 400px;
    // margin-right: 100px;
    // background-color: #409eff;
    margin-left: 300px;
  }
}
</style>

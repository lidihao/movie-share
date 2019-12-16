<template>
  <aside class="side-menu">
    <Menu active-key="1" theme="dark" width="auto">
      <div class="headSculpture">
        <img src="../assets/1.png" alt="">
        <p>昵称：李帝豪</p>
      </div>
      <Menu-item key="1">
        <Icon type="ios-navigate" :size="iconSize"></Icon>
        <span class="layout-text">选项 1</span>
      </Menu-item>
      <Menu-item key="2">
        <Icon type="ios-keypad" :size="iconSize"></Icon>
        <span class="layout-text">选项 2</span>
      </Menu-item>
      <Menu-item key="3">
        <Icon type="ios-analytics" :size="iconSize"></Icon>
        <span class="layout-text">选项 3</span>
      </Menu-item>
    </Menu>
  </aside>
</template>

<script>
  export default {
    name: "SideBar"
  }
</script>

<style scoped>
  .side-menu {
    position: fixed;
    width: 13%;
    top: 60px;
    bottom: 0;
    left: 0;
    background: #2b3643;
  }
  .headSculpture {
    width: 100%;
    margin-top: 5px;
    text-align: center;
  }
  .headSculpture img {
    width: 100px;
    height: 100px;
    border-radius: 50px;
    margin: 0 auto;
  }
  .headSculpture p {
    margin: 0 auto;
    margin-top: 15px;
    font-size: 15px;
    width: 160px;
    height: 30px;
    line-height: 30px;
    background-color: #464c5b;
    border-radius: 15px;
    color: #fff;
  }
</style>

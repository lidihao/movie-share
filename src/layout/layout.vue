<template>
  <div class="home">
    <HeadTop></HeadTop>
    <SideBar></SideBar>
    <div class="container-router">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
  import HeadTop from "./HeadTop";
  import SideBar from "./SideBar";
  export default {
    name:'layout',
    components:{SideBar, HeadTop}
  }
</script>

<style scoped>
  .home {
    position: absolute;
    height: 100%;
    width: 100%;
    padding-top: 70px;
  }
  .container-router {
    width: calc(100% - 240px);
    height: 100%;
    margin-left: 240px;
    overflow: auto;
  }
  .guide{
    background-color: rgb(247, 247, 247);
    padding: 10px;
    margin-top: 20px;
    margin-bottom: 20px;

  }
</style>

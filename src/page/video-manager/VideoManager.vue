<template>
  <div>
    <h1 class="header">视频管理</h1>
    <Menu mode="horizontal" theme="light" active-name="upload">
      <Menu-item name="upload" to="/VideoManager/upload">
        <Icon type="ios-paper"></Icon>
        视频上传
      </Menu-item>
      <Menu-item name="process" to="/VideoManager/process">
        <Icon type="ios-people"></Icon>
        所上传的视频
      </Menu-item>
    </Menu>
    <router-view></router-view>
  </div>
</template>

<script>
  export default {
    name: "VideoManager"
  }
</script>

<style scoped>
 .header{
   text-align: center;
 }
</style>

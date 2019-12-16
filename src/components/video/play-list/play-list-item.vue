<template>
    <div class="play-list-item-main">
      <div class="play-list-item-img">
        <img src="../../../assets/t3.jpg">
      </div>
      <div class="play-list-item-content">
        <h1 class="play-list-item-title">jp爱情动作片</h1>
        <div class="play-list-item-info">
          <span class="info">观看:1000W</span>
          <span class="info">评论:200K</span>
        </div>
      </div>
    </div>
</template>

<script>
  export default {
    name: "play-list-item"
  }
</script>

<style scoped>
  .play-list-item-img{
    float: left;
    overflow: hidden;
    width: 150px;
    height: 100px;
    margin: 20px auto;
  }
  .play-list-item-content{
    margin-left: 200px;
  }
  .play-list-item-info{
    margin-top: 30px;
  }
  .info{
    margin-right: 10px;
  }
</style>

<template>
  <div class="play-list-main">
    <div class="play-list-top">
      <h2>相关推荐</h2>
    </div>
    <div class="play-list-content scroll-up">
      <div v-for="item in 100">
        <PlayListItem></PlayListItem>
      </div>
    </div>
  </div>

</template>

<script>
  import PlayListItem from './play-list-item'
  export default {
    name: "play-list-box",
    components:{
      PlayListItem
    }
  }
</script>

<style scoped>
  .play-list-main{
    background-color: rgb(247, 247, 247);
    overflow: hidden;
    height: 400px;
  }
  .scroll-up {
    overflow-y: auto;
    max-height: 300px;
    overflow-x: hidden;
  }
  .play-list-top{
    padding-top: 10px;
    padding-bottom: 10px;
    padding-left: 20px;
    border-bottom: 1px solid #57A3F3;
  }
</style>

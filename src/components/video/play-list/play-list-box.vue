<template>
  <div class="play-list-main">
    <div class="play-list-top">
      <h2>相关推荐</h2>
    </div>
    <div class="play-list-content scroll-up">
      <div v-for="item in 1">
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
    overflow: hidden;
    height: 400px;
    border: solid;
  }
  .scroll-up {
    overflow-y: scroll;
    max-height: 100px;
    overflow-x: hidden;
  }
</style>

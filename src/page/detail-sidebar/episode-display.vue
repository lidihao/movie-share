<template>
    <div class="episode-display-main">
      <div class="episode-header">
        <h2>选集</h2>
      </div>
      <div class="episode-display-content scroll-up">
        <div v-for="item in 300" class="episode">
          <i-button>Default</i-button>
        </div>
      </div>
    </div>
</template>

<script>
  export default {
    name: "episode-display"
  }
</script>

<style scoped>
  .episode-display-main{
    padding: 20px;
    background-color: rgb(247, 247, 247);
    overflow: hidden;
  }
  .episode-header{
    overflow: hidden;
  }
  .episode{
    display: inline-block;
    color: #464c5b;
    margin: 5px;
  }
  .episode-display-content{
    padding: 20px;
    overflow: auto;
  }
  .scroll-up {
    overflow-y: scroll;
    max-height: 400px;
    overflow-x: hidden;
  }
</style>

<template>
  <div class="items-main">
    <div class="item" v-for="item in 3">
      <VideoBox></VideoBox>
    </div>
  </div>
</template>

<script>
  import VideoBox from "./VideoBox";
  export default {
    name: "video-items",
    data(){
      return{
        count:3
      }
    },
    components:{
      VideoBox
    }
  }
</script>

<style scoped>
  .items-main{
    padding-top: 60px;
    padding-left:60px;
    padding-bottom: 60px;
  }
  .item{
    width: 300px;
    display: inline-block;
    margin: 30px;
  }
</style>

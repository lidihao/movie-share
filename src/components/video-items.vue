<template>
  <div class="items-main">
    <Row>
      <i-col span="8">
        <VideoBox></VideoBox>
      </i-col>
      <i-col span="8">
        <VideoBox></VideoBox>
      </i-col>
      <i-col span="8">
        <VideoBox></VideoBox>
      </i-col>
    </Row>
  </div>
</template>

<script>
  import VideoBox from "./VideoBox";
  export default {
    name: "video-items",
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
</style>

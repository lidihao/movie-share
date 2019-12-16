<template>
    <div class="main">
      <div class="video-category-header">
        <Row>
          <i-col span="5">
            <h2>类别</h2>
          </i-col>
          <i-col span="2" offset="17">
            <i-button type="primary" class="pull-right">更多</i-button>
          </i-col>
        </Row>
      </div>
      <div class="video-category-content">
        <Carousel>
          <Carousel-item>
            <VideoItems></VideoItems>
          </Carousel-item>
          <Carousel-item>
            <VideoItems></VideoItems>
          </Carousel-item>
          <Carousel-item>
            <VideoItems></VideoItems>
          </Carousel-item>
          <Carousel-item>
            <VideoItems></VideoItems>
          </Carousel-item>
        </Carousel>
      </div>
    </div>
</template>

<script>
  import VideoBox from "./VideoBox";
  import VideoItems from './video-items'
  export default {
    name: "video-category",
    components:{
      VideoBox,VideoItems
    }
  }
</script>

<style scoped>
  .main{
    margin: 50px 50px 100px;
    box-shadow: 1px 1px 10px;
  }
  .video-category-header{
    padding-top: 20px;
    border-left: 6px solid #5AD25A;
    padding-left: 30px;
    padding-right: 30px;
  }
  .video-category-content{

  }
</style>

<template>
    <div class="main">
      <div class="video-category-header">
        <Row>
          <i-col span="5">
            <h2>{{title}}</h2>
          </i-col>
          <i-col span="2" offset="17">
            <a><i-button type="primary" class="pull-right" @click="moreVideo">更多</i-button></a>
          </i-col>
        </Row>
      </div>
      <div class="video-category-content">
        <Carousel autoplay autoplay-speed="6000">
          <Carousel-item v-for="(item,index) in i" class="items-main">
            <VideoBox v-for="(item1,indx) in j" :video="videoList[indx+3*index]" class="item">
            </VideoBox>
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
    },
    props:{
      title:{
        required:true,
        default:'test'
      },
      videoList:{
        required:true,
        default:[]
      },
      path:{
        required:true,
        default:''
      },
      params:{
        required:true,
        default:{}
      }
    },
    data(){
      return{
        i:3,
        j:3
      }
    },
    methods:{
      moreVideo(){
        this.$router.push({
          path:this.path,
          query:this.params
        })
      }
    }
  }
</script>

<style scoped>
  .main{
    margin: 0px 10px 10px;
    width: 85%;
  }
  .video-category-header{
    padding-top: 20px;
    border-left: 6px solid #5AD25A;
    padding-left: 30px;
    padding-right: 30px;
  }
  .video-category-content{
  }
  .items-main{
    padding-top: 60px;
    padding-left:60px;
    padding-bottom: 60px;
  }
  .item{
    width: 100px;
    display: inline-block;
    margin-left:50px;
  }
</style>

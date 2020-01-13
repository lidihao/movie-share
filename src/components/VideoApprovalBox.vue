<template>
  <div class="video-box-main">
      <div class="img-style">
        <img :src="`//localhost:8089${videoApply.posterUrl}`" alt="">
        <div class="img-cover">
          <Icon type="md-arrow-dropright-circle" size="45"/>
        </div>
      </div>
      <div class="movie-item-content">
        <h2 class="video-title">{{videoApply.title}}</h2>
        <div class="uper">
          <Icon type="ios-people" size="20"></Icon>
          <span>上传者:</span>
          <a><strong>{{videoApply.userVo.userName}}</strong></a>
        </div>
        <div>
          <strong>上传时间:{{videoApply.createdTime}}</strong>
        </div>
        <div class="apply">
          <Button type="primary" @click="handleClick">审批</Button>
        </div>
        <div></div>
      </div>
  </div>
</template>

<script>
  export default {
    name: "VideoApprovalBox",
    props:{
      videoApply:{
        required:true,
        default:{}
      }
    },
    methods:{
      handleClick(){
        this.$router.push({
          path:'/system/apply-detail',
          query:{
            videoApprovalId:this.videoApply.videoApprovalId
          }
        })
      }
    }
  }
</script>

<style scoped>
  .img-style{
    max-width: 160px;
    height: 100px;
    position: relative;
    float: left;
    margin-right: 20px;
  }
  .img-style img{
    width: 100%;
    height: 100%;
    border-radius: 20px;
  }
  .img-cover{
    display: none;
    position: absolute;
    bottom: 27px;
    left: 55px;
  }
  .img-style:hover .img-cover{
    display: block;
  }
  .img-style:hover img{
    transform: scale(1.1);
  }

  .img-style:hover i{
    color: #fff;
    font-size: 20px;
    cursor: pointer;
    margin: 0 2px;
  }

  .movie-item-content{
    min-width: 600px;
    margin-left: 200px;
    position: relative;
  }
  .video-box-main{
    min-height: 150px;
    padding: 30px;
    box-shadow: 1px 1px 10px;
  }
  .uper{
    margin-top: 20px;
    margin-bottom: 20px;
  }

  .video-title{
    cursor: pointer;
  }
  .video-title:hover{
    color: #57A3F3;
    transform: scaleZ(1.1);
  }

  .apply{
    position: absolute;
    right: 50px;
    top: 40px;
  }
</style>

<template>
    <div class="play-list-item-main">
      <div class="play-list-item-img" @click="handleVideoPlay">
        <img :src="imgUrl" style="height: 100%;width: 100%">
      </div>
      <div class="play-list-item-content">
        <p class="play-list-item-title">{{video.title}}</p>
        <div class="play-list-item-info">
          <span class="info">观看:{{video.videoPlayCount}}</span>
          <span class="info">评论:{{video.videoCommentCount}}</span>
        </div>
      </div>
    </div>
</template>

<script>

  import Config from '@/settings'

  export default {
    name: "play-list-item",
    props:{
      video:{
        required:true
      }
    },
    computed:{
      imgUrl(){
        return Config.server+this.video.posterPicture.url
      }
    },
    methods:{
      handleVideoPlay(){
        this.$router.push({
          path:'/video/videoPlay',
          query:{
            videoId:this.video.videoId
          }
        })
      }
    }
  }
</script>

<style scoped>
  .play-list-item-main{
    width: 350px;
    height: 120px
  }

  .play-list-item-title{
    height: 65px;
    overflow:hidden;
  }
  .play-list-item-img{
    float: left;
    overflow: hidden;
    width: 150px;
    height: 80px;
    margin: 10px auto;
    padding-left: 10px;
    cursor: pointer;
  }
  .play-list-item-content{
    margin-left: 160px;
    padding: 10px;
  }
  .play-list-item-info{
  }
  .info{
    margin-right: 10px;
  }
</style>

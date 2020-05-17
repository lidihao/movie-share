<template>
  <div class="video-box-main">
    <div class="movie-item-contents gradient">
      <img :src="posterUrl" alt="" style="height: 100%;width: 100%;">
      <div class="movie-item-content">

        <div class="movie-item-content-center">
          <a @click="handleVideoPlay"><strong><Icon type="md-play" size="50" style="color: white"/></strong></a>
        </div>
        <span class="rate">
          <span>{{rate}}</span>
        </span>
        <div class="movie-item-content-buttom">
          <div class="movie-item-title">
            <a @click="handleVideoPlay" v-html="video.title"></a>
          </div>
          <div class="uper">
            <Icon type="ios-people" size="20"></Icon>
            <span>上传者:</span>
            <a @click="toUserSpace"><strong>{{video.uploader.userName}}</strong></a>
          </div>
          <div class="movie-item-beta">
            <p class="pull-left">
              <span class="view-people-count"><Icon type="md-play" />{{video.videoPlayCount}}</span>
              <span class="view-people-count" style="margin-left: 3px">
                <Icon type="md-list-box" />
                {{video.videoCommentCount}}
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Config from '@/settings'
  export default {
    name: "VideoBox",
    props:{
      video:{
        required:true
      }
    },
    data(){
      return{
        posterUrl:''
      }
    },
    watch:{
      video(){
        this.posterUrl=Config.server+this.video.posterPicture.url;
      }
    },
    computed:{
      rate(){
        return this.video.rate.toFixed(1)
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
      },
      toUserSpace(){
        this.$router.push({
          path:'/user/person-space',
          query:{
            userId:this.video.uploader.userId
          }
        })
      }
    },
    mounted() {
      this.posterUrl=Config.server+this.video.posterPicture.url;
    }
  }
</script>

<style scoped>
  .video-box-main{
    border-radius: 35px;
    margin: 10px;
    height: 200px;
    width: 280px;
  }
  .movie-item-contents {
    border-radius: 35px;
    position: relative;
    height: 200px;
    width: 280px;
  }
  .gradient{
    position: relative;
    overflow: hidden;
  }

  .gradient:after{
    content: "";
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
    background-color: rgba(0, 0, 0, 0.5);
  }

  .gradient:hover > img{
    transform: scale(1.2);
    transition: all 0.4s ease-in-out;
  }

  .gradient > img{
    transform: scale(1);
    transition: all 0.4s ease-in-out;
  }

  .gradient:hover:after {
    content: "";
    background: -webkit-linear-gradient(to top, rgba(6, 15, 25, .6) 0%, rgba(29, 119, 29, 0.6) 100%);
    background: linear-gradient(to top, rgba(6, 15, 25, .6) 0%, rgba(29, 119, 29, 0.6) 100%);
    position: absolute;
  }

  .movie-item-content {
    position: absolute;
    top: 0;
    width: 100%;
    height: 100%;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 1
  }

  .movie-item-title > a {
    color: #fff;
    font-size: 15px;
    display: inline-block;
    font-weight: bold;
    line-height: 18px;
    text-transform: capitalize;
  }
  .pull-right{
    float: right;
  }
  .pull-left{
    float: left;
    margin-left: 10px;
  }

  .movie-item-content-center {
    margin: 0 auto;
    position: absolute;
    top: 37%;
    bottom: auto;
    text-align: center;
    left: 0;
    right: 0;
    margin-top: -100%;
    -webkit-transition: all 0.4s ease-in-out;
    -moz-transition: all 0.4s ease-in-out;
    -ms-transition: all 0.4s ease-in-out;
    -o-transition: all 0.4s ease-in-out;
    transition: all 0.4s ease-in-out
  }

  .movie-item-contents:hover .movie-item-content-center {
    margin-top: 0;
    -webkit-transition: all 0.4s ease-in-out;
    -moz-transition: all 0.4s ease-in-out;
    -ms-transition: all 0.4s ease-in-out;
    -o-transition: all 0.4s ease-in-out;
    transition: all 0.4s ease-in-out
  }

  .movie-item-content-buttom {
    position: absolute;
    bottom: 0;
    padding-bottom: 10px;
    padding-left: 15px;
  }
  .movie-item-title {
    padding: 0 13px;
  }
  .movie-item-beta {
  }
  .comment-count{
    padding: 3px 3px;
    color: #fff;
    font-weight: bold;
    margin-top: 0;
    display: inline-block;
  }
  .view-people-count{
    padding: 3px 3px;
    color: #fff;
    font-weight: bold;
    margin-top: 0;
    display: inline-block;
  }
  .view-movie {
    padding: 3px 3px;
    color: #fff;
    font-weight: bold;
    margin-top: 0;
    display: inline-block;
  }
  .uper{
    margin-top: 10px;
    margin-left: 10px;
    color: white;
  }

  .rate{
    position: absolute;
    top:20px;
    left: -10px;
    padding: 8px 19px;
    border-radius: 100px;
    color: #fff;
    font-weight: bold;
    border: 1px solid transparent;
    text-transform: capitalize;
    background-color: #5AD25A;
  }
  >>> em{
    color: #00a1d6;
    margin-right: 5px;
    margin-left: 3px;
  }

</style>

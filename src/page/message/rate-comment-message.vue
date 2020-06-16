<template>
  <div class="main">
    <div>
      <div class="user-face" >
        <a @click="toUserSpace(userVo.userId)">
          <img class="user-face-img" :src="this.userAvatar" alt="">
        </a>
      </div>
      <div style="margin-left: 40px">
        <a @click="toUserSpace(userVo.userId)">{{userVo.userName}}</a>
        <span>点评了您的视频</span>
        <a @click="handleVideoPlay"> {{this.video.title}}</a>
        <span style="float: right">
          {{message.createdTime}}
        </span>
      </div>
    </div>
    <div class="message-content">
      <Rate allow-half disabled v-model="params.rate" style="margin: 10px 0"></Rate>
      <div>
        {{this.message.systemMessageContent}}
      </div>
    </div>
  </div>
</template>

<script>
  import VideoApi from '@/api/video-api'
  import LoginApi from '@/api/login'
  import Config from '@/settings'
    export default {
      name: "rate-comment-message",
      props:{
        message:{
          required:true
        }
      },
      watch:{
        message(){
          this.params=JSON.parse(this.message.systemMessageParams)
          this.getUserInfo()
          this.getVideoDetail()
        }
      },
      data(){
        return {
          userVo:{},
          video:{},
          params:{},
          userAvatar:''
        }
      },
      methods:{
        toUserSpace(userId){
          this.$router.push({
            path:'/user/person-space',
            query:{
              userId:userId
            }
          })
        },
        getUserInfo(){
          let params = {
            userId: this.params.commentUserId
          }
          LoginApi.getUserInfoById(params).then((res) => {
            if (res.code === 200) {
              this.userVo = res.result
              if (!this.userVo){
                this.userVo={
                  userId:this.params.commentUserId,
                  userName:this.params.userName
                }
              }
              this.userAvatar=Config.server+this.userVo.avatarUrl
            }
          })
        },
        getVideoDetail(){
          let params={
            videoId:this.params.videoId
          }
          VideoApi.getVideoDetail(params).then((res)=>{
            if (res.code===200){
              this.video=res.result
              if (!this.video){
                this.video={
                  videoId:this.params.videoId,
                  title:this.params.videoTitle
                }
              }
            }
          })
        },
        handleVideoPlay(){
          this.$router.push({
            path:'/video/videoPlay',
            query:{
              videoId:this.video.videoId
            }
          })
        },
      },
      created() {
        this.params=JSON.parse(this.message.systemMessageParams)
        this.getUserInfo()
        this.getVideoDetail()
      }
    }
</script>

<style scoped>
  .main{
    background-color: #fff;
    box-shadow: 0 2px 4px 0 rgba(121,146,185,0.54);
    font-size: 15px;
    color: #666;
    border-radius: 4px;
    padding: 10px 20px;
  }

  .user-face-img{
    border-radius: 30px;
    margin: 0 auto;
    width: 25px;
    height: 25px;
    float: left;
  }

  .message-content{
    margin: 20px 20px;
  }

</style>

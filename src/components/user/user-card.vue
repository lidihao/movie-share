<template>
  <div class="uploader-main">
    <a @click="toUserSpace">
      <img :src="avatarUrl" alt="" class="uploader-img">
    </a>
    <div class="uploader-detail">
      <h2>{{userVo.userName}}</h2>
      <p>
        {{userVo.introduce}}
      </p>
    </div>
    <div class="add-button">
      <span :class="followButType" @click="followUser">{{descFollow}}<span style="margin-left: 6px;margin-right: 4px">{{followCount}}</span></span>
      <a class="h-f-btn h-message" @click="sendMessage">
        发消息
      </a>
    </div>
  </div>
</template>

<script>

  import FollowApi from '@/api/follow-api'
  import {mapGetters} from 'vuex'
  import Config from '@/settings'

  export default {
    name: "user-card",
    props:{
      userVo:{
        required:true
      }
    },
    watch:{
      userVo(){
        this.isFollowUser()
        this.getFollowedCountByuserId()
      }
    },
    computed:{
      ...mapGetters(['user','isLogin']),
      isShow(){
        return parseInt(this.userVo.userId)===parseInt(this.user.userId)
      },
      avatarUrl(){
        return Config.server+this.userVo.avatarUrl
      }
    },
    data(){
      return{
        isFollow:false,
        descFollow:'关注',
        followCount:100000,
        followButType:'h-f-btn h-follow'
      }
    },
    methods:{
      sendMessage(){
        if (!this.isLogin) {
          this.$Message.warning("请先登录")
          return
        }
        if (this.isShow){
          this.$Message.warning("不能发送消息给自己")
          return;
        }
        this.$router.push({
          path:'/message-manager/instance-message',
          query:{
            recvUserId:this.userVo.userId
          }
        })
      },
      toUserSpace(){
        this.$router.push({
          path:'/user/person-space',
          query:{
            userId:this.userVo.userId
          }
        })
      },
      getFollowedCountByuserId(){
        let data={
          userId:this.userVo.userId
        }
        FollowApi.getFollowedCount(data).then((res)=>{
          if (res.code===200){
            this.followCount=res.result
          }
        })
      },
      isFollowUser(){
        if (!this.isLogin) {
          return
        }
        let data={
          userId:this.user.userId,
          followedUserId:this.userVo.userId
        }
        FollowApi.isFollow(data).then((res)=>{
          if (res.code===200){
            if (res.result){
              this.isFollow=true
              this.descFollow='已关注'
              this.followButType='h-f-btn'
            }else {
              this.isFollow=false
              this.descFollow='关注'
              this.followButType='h-f-btn h-follow'
            }
          }
        })
      },
      followUser(){
        if (!this.isLogin) {
          this.$Message.warning("请先登录")
          return
        }
        if (this.isShow){
          this.$Message.warning("不能关注自己")
          return;
        }
        let data={
          userId:this.user.userId,
          followedUserId:this.userVo.userId
        }
        if(this.isFollow){
          FollowApi.unFollowUser(data).then((res)=>{
            if (res.code===200){
              this.isFollowUser()
              this.getFollowedCountByuserId()
            }
          })
        }else {
          FollowApi.followUser(data).then((res) => {
            if (res.code === 200) {
              this.isFollowUser()
              this.getFollowedCountByuserId()
            }
          })
        }
      }
    },
    created() {
      this.isFollowUser()
      this.getFollowedCountByuserId()
    }
  }
</script>

<style scoped>
  .uploader-main{
    margin: 10px auto;
    background-color: rgb(247, 247, 247);
    padding: 10px;
    border-radius: 10px;
  }
  .uploader-img {
    width: 60px;
    height: 60px;
    border-radius: 50px;
    margin: 0 auto;
    float: left;
  }
  p{
    margin: 10px auto;
    min-height: 40px;
  }
  .uploader-detail{
    margin: 10px 10px 10px 120px;
  }

  .h-f-btn {
    background: rgba(0,0,0,.45);
    box-shadow: 0 0 0 2px hsla(0,0%,100%,.3);
    border-radius: 4px;
    color: #fff;
    cursor: pointer;
    display: inline-block;
    font-size: 14px;
    text-align: center;
    min-width: 78px;
    margin: 3px 20px 4px 3px;
    line-height: 30px;
  }
  .h-follow {
    background: #f25d8e;
    box-shadow: 0 0 0 2px #fff;
    color: #fff;
  }
  .h-message{
    width: 78px;
  }
  .add-button{
    z-index: 1;
    margin-left: 80px;
  }
</style>

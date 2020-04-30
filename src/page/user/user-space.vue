<template>
    <div class="space-main">
      <div class="space-pic" :style="{backgroundImage:'url('+this.skinUrl+')'}">
        <div class="change-skin">
          <Button type="primary" v-if="showChange" @click="changeTheme">更换皮肤</Button>
        </div> <!--更换皮肤-->
        <div class="person-int">
          <div class="pic-content">
            <img :src="userVo.avatarUrl" class="person-pic">
            <div class="user-info">
              <h2>{{userVo.userName}}</h2>
              <p>{{userVo.introduce}}</p>
            </div>
          </div>
        </div>
        <div class="h-action" v-if="!showChange">
          <span :class="followButType" @click="followUser">{{descFollow}}</span>
          <a @click="sendMessage" class="h-f-btn h-message">
            发消息
          </a>
        </div>
      </div>
      <div class="space-content">
        <Tabs active-key="key1">
          <Tab-pane label="发布的视频" key="key1">
            <UploadVideoGrid :userId="this.userId"></UploadVideoGrid>
          </Tab-pane>
          <Tab-pane label="收藏的视频" key="key2">
            <FavoriteVideoGrid :userId="this.userId"></FavoriteVideoGrid>
          </Tab-pane>
          <Tab-pane label="关注" key="key3">
            <FollowingUserList :userId="this.userId"></FollowingUserList>
          </Tab-pane>
          <Tab-pane label="粉丝" key="key4">
            <FollowedUserList :userId="this.userId" ref="followedList"></FollowedUserList>
          </Tab-pane>
        </Tabs>
      </div>
      <div id="space-theme" :class="showTheme">
        <div class="space-header">
          <h2>皮肤更换</h2>
          <Icon type="md-close" size="30" class="close-skin" @click="changeTheme"/>
        </div>
        <div class="theme-panel">
          <div class="theme-container">
            <div class="theme-item" v-for="pic in skinList" :style="{backgroundImage:'url('+pic.url+')'}">
              <div class="skin-action">
                <Button type="error" @click="handleDelete(pic)">删除</Button>
                <Button type="success" @click="userSkin(pic)">使用</Button>
              </div>
            </div>
            <Upload :before-upload="handleBeforeUpload" action="">
              <div class="img-uploader theme-item">
                <Icon type="md-add"  size="40" style="margin-left: 130px;margin-bottom: 10px"/>
              </div>
            </Upload>
          </div>
        </div>
        <Cropper :showCropper="showCropper" :imgSrc="imgSrc" :fixedNumber="[1000,200]"  @uploadSuccess="uploadSuccess" @cancel="cancel" ></Cropper>
      </div>
    </div>
</template>

<script>
  import  UploadVideoGrid from '@/page/user/upload-video-grid'
  import UserCardGrid from '@/components/user/user-card-grid'
  import LoginApi from '@/api/login'
  import {mapGetters} from 'vuex'
  import Config from '@/settings'
  import Cropper from '@/components/cropper'
  import PictureApi from '@/api/picture-api'
  import FollowingUserList from '@/page/user/following-user'
  import FollowedUserList from '@/page/user/followed-user'
  import FavoriteVideoGrid from '@/page/user/favorite-video-grid'
  import FollowApi from '@/api/follow-api'

  export default {
    name: "user-space",
    data(){
      return {
        skinUrl:'',
        userId: -1,
        showChange:false,
        showTheme:'',
        userVo:{},
        imgSrc:'',
        showCropper:false,
        skinList:[],
        isFollow:false,
        descFollow:'关注',
        followCount:100000,
        followButType:'h-f-btn h-follow'
      }
    },
    components:{
      UserCardGrid,
      Cropper,
      UploadVideoGrid,
      FollowingUserList,
      FollowedUserList,
      FavoriteVideoGrid
    },
    computed:{
      ...mapGetters(['user','isLogin'])
    },
    watch:{
      $route: {
        handler() {
          this.init()
          this.getUserInfo()
          if (this.showChange){
            this.getSkinList()
          }else {
            this.isFollowUser()
          }
        },
        deep: true,
      }
    },
    methods: {
      init() {
        this.userId = this.$route.query.userId
        if (!this.userId) {
          this.userId = this.user.userId
        }
        this.showChange = this.user.userId === parseInt(this.userId)
      },
      changeTheme() {
        if (this.showTheme) {
          this.showTheme = ''
        } else {
          this.showTheme = 't-show'
        }
      },
      urlStyle(pic){
        console.log(pic)
        return '{background-image: url('+pic.url+')}'
      },
      getUserInfo() {
        let params = {
          userId: this.userId
        }
        LoginApi.getUserInfoById(params).then((res) => {
          if (res.code === 200) {
            this.userVo = res.result
            this.userVo.avatarUrl = Config.server + this.userVo.avatarUrl
            this.skinUrl = Config.server+this.userVo.skinUrl
          }
        })
      },
      cancel(){
        this.showCropper=false
      },
      uploadSuccess(pic){
        this.showCropper=false
        let data={
          userId:this.user.userId,
          pictureId:pic.pictureId
        }
        PictureApi.addSkin(data).then((res)=>{
          if (res.code==200){
            this.$Message.success('success')
            this.getSkinList()
          }else {
            this.$Message.error('error')
          }
        })
      },
      handleBeforeUpload(file) {
        const isImg = file.type === 'image/jpg' || file.type === 'image/jpeg' || file.type === 'image/png';
        if (!isImg) {
          this.$Message.warning("图片格式错误");
          return false;
        }
        this.showCropper=true
        this.imgSrc=this.getObjectURL(file)
        return false
      },
      getObjectURL(file) {
        let  url = null;
        if (window.createObjectURL !== undefined) { // basic
          url = window.createObjectURL(file);
        } else if (window.URL !== undefined) { // mozilla(firefox)
          url = window.URL.createObjectURL(file);
        } else if (window.webkitURL !== undefined) { // webkit or chrome
          url = window.webkitURL.createObjectURL(file);
        }
        return url;
      },
      handleDelete(pic){
        let data={
          userId:this.user.userId,
          pictureId:pic.pictureId
        }
        PictureApi.deleteSkin(data).then((res)=>{
          if (res.code===200){
            this.$Message.success('success')
            this.getSkinList()
          }else {
            this.$Message.error(res.message)
          }
        })
      },
      getSkinList(){
        let params={
          userId:this.user.userId
        }
        PictureApi.getSkinListByUserId(params).then((res)=>{
          if (res.code===200){
            console.log(res)
            this.skinList=res.result
            this.skinList.forEach((item)=>{
              item.url=Config.imgUrl+item.url
            })
          }
        })
      },
      userSkin(pic){
        let data={
          pictureId:pic.pictureId,
          userId:this.user.userId
        }
        PictureApi.updateSkin(data).then((res)=>{
          if (res.code===200){
            this.$Message.success('success')
            this.getUserInfo()
          }
        })
      },
      sendMessage(){
        if (!this.isLogin) {
          this.$Message.warning("请先登录")
          return
        }
        this.$router.push({
          path:'/message-manager/instance-message',
          query:{
            recvUserId:this.userVo.userId
          }
        })
      },
      isFollowUser(){
        if (!this.isLogin) {
          return
        }
        let data={
          userId:this.user.userId,
          followedUserId:this.userId
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
        let data={
          userId:this.user.userId,
          followedUserId:this.userId
        }
        if(this.isFollow){
          FollowApi.unFollowUser(data).then((res)=>{
            if (res.code===200){
              this.isFollowUser()
            }
          })
        }else {
          FollowApi.followUser(data).then((res) => {
            if (res.code === 200) {
              this.isFollowUser()
            }
          })
        }
      }
    },
    created() {
      this.init()
      this.getUserInfo()
      if (this.showChange){
        this.getSkinList()
      }else {
        this.isFollowUser()
      }
    }
  }
</script>

<style scoped>
  .space-pic{
    min-height: 200px;
    overflow: hidden;
    position: relative;
    border: 1px solid #555555;
    border-radius: 12px;
  }
  .space-main{
    width: 95%;
  }
  .space-content{
    padding-top: 30px;
  }
  .person-int{
    position: absolute;
    bottom: 0px;
    width: 100%;
    min-height: 100px;
  }
  .pic-content{
    margin: 20px;
  }
  .user-info{
    margin-left: 90px;
    color: white;
  }
  .person-pic {
    width: 64px;
    height: 64px;
    border-radius: 50px;
    margin: 0 auto;
    float: left;
  }
  .change-skin{
    right: 10px;
    top: 10px;
    position: absolute;
  }
  #space-theme {
    transition: bottom .4s ease;
    position: fixed;
    left: 0;
    bottom: -600px;
    width: 100%;
    z-index: 1000;
    background: rgba(0,0,0,.8);
    color: #fff;
  }
  #space-theme.t-show{
    bottom:0px
  }
  #space-theme .theme-panel{
    background: #111;
    padding: 25px 0 15px;
    position: relative;
    height: 250px;
    overflow: auto;
  }
  #space-theme .space-header{
    padding: 20px;
    position: relative;
  }

  #space-theme .theme-item {
    border: 3px solid #555;
    border-radius: 12px;
    cursor: pointer;
    float: left;
    min-width: 310px;
    min-height: 96px;
    position: relative;
    margin: 0 25px 20px 0;
    background-size: cover;
    background-position: 50%;
  }
  .img-uploader{
    width:310px;
    height: 96px;
    line-height: 100px;
  }
  .theme-container{
    margin:20px 0;
    padding-left: 130px;
  }
  .skin-action{
    bottom: 10px;
    right: 10px;
    display: none;
    position: absolute;
  }
  .theme-item:hover .skin-action{
    display: block;
  }
  .close-skin{
    cursor: pointer;
    position:absolute;
    right: 30px;
    bottom: 20px;
  }
  .h-f-btn {
    background: rgba(0,0,0,.45);
    box-shadow: 0 0 0 2px hsla(0,0%,100%,.3);
    border-radius: 4px;
    color: #fff;
    cursor: pointer;
    display: inline-block;
    font-size: 14px;
    float: left;
    text-align: center;
    margin: 0 20px 17px 0;
    width: 76px;
    line-height: 30px;
  }
  .h-follow {
    background: #f25d8e;
    box-shadow: 0 0 0 2px #fff;
    color: #fff;
  }

  .h-action {
    position: absolute;
    bottom: 0;
    right: 0;
    z-index: 1;
  }
</style>

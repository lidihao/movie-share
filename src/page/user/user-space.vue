<template>
    <div class="space-main">
      <div class="space-pic">
        <img src="../../assets/abcd.jpg">
        <div class="change-skin">
          <Button type="primary" v-if="showChange" @click="changeTheme">更换皮肤</Button>
        </div> <!--更换皮肤-->
        <div class="person-int">
          <div class="pic-content">
            <img src="../../assets/1.png" class="person-pic">
            <div class="user-info">
              <h2>李帝豪</h2>
              <p>abdddddddddddddddddddddddddddddddddddd</p>
            </div>
          </div>
        </div>
      </div>
      <div class="space-content">
        <Tabs active-key="key1">
          <Tab-pane label="发布的视频" key="key1">
            <VideoGrid></VideoGrid>
          </Tab-pane>
          <Tab-pane label="收藏的视频" key="key2">
            <VideoGrid></VideoGrid>
          </Tab-pane>
          <Tab-pane label="关注" key="key3">
            <UserCardGrid></UserCardGrid>
          </Tab-pane>
          <Tab-pane label="粉丝" key="key4">
            <UserCardGrid></UserCardGrid>
          </Tab-pane>
        </Tabs>
      </div>
      <div id="space-theme" :class="showTheme">
        <div class="space-header">
          <h2>皮肤更换</h2>
        </div>
        <div class="theme-panel">
          <div class="theme-container">
            <div class="theme-item" v-for="i in 10">
              <img src="../../assets/abcd.jpg" style="width: 100%;height: 100%;">
            </div>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
  import VideoGrid from '../../components/video/video-grid'
  import UserCardGrid from '../../components/user/user-card-grid'
  import {mapGetters} from 'vuex'
  export default {
    name: "user-space",
    data(){
      return {
        userId: -1,
        showChange:false,
        showTheme:''
      }
    },
    components:{
      UserCardGrid,
      VideoGrid
    },
    computed:{
      ...mapGetters(['user'])
    },
    methods:{
      init(){
        this.userId=this.$route.query.userId
        if (this.user){
          this.showChange= this.user.userId === parseInt(this.userId)
          console.log(this.user.userId===this.userId)
          console.log(this.user)
          console.log(this.userId)
          console.log(this.user.userId)
        }
      },
      changeTheme(){
        if (this.showTheme){
          this.showTheme=''
        }else {
          this.showTheme='t-show'
        }
      }
    },
    created() {
      this.init()
    }
  }
</script>

<style scoped>
  .space-pic{
    max-height: 300px;
    overflow: hidden;
    position: relative;
  }
  .space-main{
    width: 80%;
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
  }

  #space-theme .theme-item {
    border: 3px solid #555;
    border-radius: 12px;
    cursor: pointer;
    float: left;
    max-width: 310px;
    max-height: 96px;
    position: relative;
    margin: 0 25px 20px 0;
    background-size: cover;
    background-position: 50%;
  }
  .theme-container{
    margin:20px 0;
    padding-left: 130px;
  }
</style>

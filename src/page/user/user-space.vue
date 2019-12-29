<template>
    <div class="space-main">
      <div class="space-pic">
        <img src="../../assets/abcd.jpg">
        <div class="change-skin">
          <i-button type="primary">更换皮肤</i-button>
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
    </div>
</template>

<script>
  import VideoGrid from '../../components/video/video-grid'
  import UserCardGrid from '../../components/user/user-card-grid'
  export default {
    name: "user-space",
    components:{
      UserCardGrid,
      VideoGrid
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
</style>

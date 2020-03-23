<template>
  <div>
    <div class="home-content">

       <VideoCategory id="recommend" title="个性化推荐" 
      :videoList="userRecommentVideo" v-if="isLogin&&userRecommentVideo"></VideoCategory>

      <VideoCategory id="hot" title="热门推荐"
      :videoList="recentlyHotVideoList"></VideoCategory>

      <VideoCategory :id="gernerateId(index)" v-for="(val,index) in categoryHotVideo" 
      :key="index" :title="val.category.categoryName" :videoList="val.videoDetailVoXPage.result">
      </VideoCategory>
    </div>
    <div class="fix-side-bar">
      <div @click.prevent="custormAnchor('recommend')">
          <i-button type="text">
            <span style="color: black">个性化推荐</span>
          </i-button>
        </div>

        <div @click.prevent="custormAnchor('hot')">
          <i-button type="text">
            <span style="color: black">热门推荐</span>
          </i-button>
        </div>

        <div  @click.prevent="custormAnchor('box'+index)" v-for="(val,index) in categoryHotVideo"
            :key="index" class="nav-button">
          <i-button type="text">
            <span style="color: black">{{val.category.categoryName}}</span>
          </i-button>
        </div>
    </div>
  </div>
</template>

<script>
  import RecommendApi from '@/api/recommend-api'
  import VideoCategory from '../components/video-category'
  import {mapGetters} from 'vuex'
  export default {
    name: 'Home',
    components:{VideoCategory},
    data(){
      return{
        data:[1,2,3,4,5],
        recentlyHotVideoList:[],
        categoryHotVideo:[],
        userRecommentVideo:[]
      }
    },
    computed:{
      ...mapGetters([
        'isLogin'
      ])
    },
    methods:{
      custormAnchor(anchorName) {
        // 找到锚点
        let anchorElement = document.getElementById(anchorName);
        // 如果对应id的锚点存在，就跳转到锚点
        if (anchorElement) {
          anchorElement.scrollIntoView();
        }
      },
      gernerateId(index) {
        return "box" + index;
      },
      getRecentlyHotVideo(){
        let params={
          pageNum:1,
          pageSize:9
        }
        RecommendApi.getRecentlyHotVideo(params).then((res)=>{
          if (res.code===200) {
            this.recentlyHotVideoList=res.result.result
          }
        })
      },
      getCategoryHot(){
        let params={
          pageNum:1,
          pageSize:9
        }
        RecommendApi.getCategoryHotVideo(params).then((res)=>{
          if (res.code===200) {
            this.categoryHotVideo=res.result
          }
        })
      },
      getUserVideoList(){
        let params={
          pageNum:1,
          pageSize:9
        }
        RecommendApi.getPersonRecommend(params).then((res)=>{
          if (res.code===200) {
            this.userRecommentVideo=res.result.result
          }
        })
      }
    },
    created(){
      this.getRecentlyHotVideo()
      this.getCategoryHot()
      this.getUserVideoList()
    }
  }
</script>
<style scoped>
  .home-content{
    overflow: auto;
    margin-right: 5px;
  }
  .fix-side-bar{
    position: fixed;
    top: 50%;
    right: 1%;
    box-shadow: 1px 1px 10px;
    padding: 3px;
  }
  .nav-button{
    margin: 3px;
  }
</style>

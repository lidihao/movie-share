<template>
  <div class="play-list-main">
    <div class="play-list-top">
      <h2>相关推荐</h2>
    </div>
    <div class="play-list-content scroll-up">
      <div v-for="item in this.videoList">
        <PlayListItem :video="item"></PlayListItem>
      </div>
    </div>
  </div>

</template>

<script>
  import PlayListItem from './play-list-item'
  import RecommendApi from '@/api/recommend-api'
  export default {
    name: "play-list-box",
    props:{
      videoId:{
        required:true
      }
    },
    data(){
      return{
        curPageNum:1,
        curPageSize:10,
        videoList:[]
      }
    },
    components:{
      PlayListItem
    },
    methods:{
      getVideoList(){
        let params = {
          videoId:this.videoId,
          pageNum:this.curPageNum,
          pageSize:this.curPageSize
        }

        RecommendApi.getSimilarVideo(params).then(res=>{
          if (res.code===200) {
            this.videoList=res.result.result
          }
        })
      }
    },
    created(){
      this.getVideoList()
    }
  }
</script>

<style scoped>
  .play-list-main{
    background-color: rgb(247, 247, 247);
    overflow: hidden;
    height: 240px;
  }
  .scroll-up {
    overflow-y: auto;
    max-height: 300px;
    overflow-x: hidden;
  }
  .play-list-content{
    height: 170px
  }
  .play-list-top{
    padding-top: 10px;
    padding-bottom: 10px;
    padding-left: 20px;
    border-bottom: 1px solid #57A3F3;
  }
</style>

<template>
  <div>
    <div class="title">
      <h1>个人推荐</h1>
    </div>
    <div>
      <div class="video-item" v-for="item in videoList">
        <VideoBox :video="item"></VideoBox>
      </div>
      <div class="page">
        <Page :total="total" show-total @on-change="changePage" :page-size="curPageSize"></Page>
      </div>
    </div>
  </div>
</template>

<script>
  import VideoBox from "@/components/VideoBox";
  import RecommendApi from '@/api/recommend-api'
  import {mapGetters} from 'vuex'
    export default {
        name: "person-recommend-brower",
      components:{VideoBox},
      data(){
        return {
          videoList: [],
          curPageNum:1,
          curPageSize:12,
          total:0
        }
      },
      computed:{
        ...mapGetters([
          'isLogin'
        ])
      },
      methods:{
        getUserVideoList(){
          if (!this.isLogin) {
            return
          }

          let params={
            pageNum:this.curPageNum,
            pageSize:this.curPageSize
          }
          RecommendApi.getPersonRecommend(params).then((res)=>{
            if (res.code===200) {
              this.videoList=res.result.result
              this.total=res.result.pageInfo.total
            }
          })
        },
        changePage(pageNum){
          this.curPageNum=pageNum
          this.getUserVideoList()
        }
      },
      created() {
          this.getUserVideoList()
      }
    }
</script>

<style scoped>
  .title{
    margin-left: 500px;
  }
  .video-item{
    margin: 10px;
    display: inline-block;
    overflow: hidden;
    width: 300px;
  }
</style>

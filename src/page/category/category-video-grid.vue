<template>
  <div class="publish-video-main">
    <div class="search">
      <Select v-model="orderField" @on-change="getUploadVideoList">
        <Option value="rate" key="rate">按照评分排序</Option>
        <Option value="playCount" key="playCount">按照播放数排序</Option>
        <Option value="time" key="time">按照时间排序</Option>
      </Select>
    </div>
    <div class="grid-content">
      <div class="video-item" v-for="item in videoList">
        <VideoBox :video="item"></VideoBox>
      </div>
      <div class="page">
        <Page :total="total" show-total></Page>
      </div>
    </div>
  </div>
</template>

<script>
  import VideoBox from "@/components/VideoBox";
  import VideoApi from '@/api/video-api'
  export default {
    name: "category-video-grid",
    props:{
      categoryName:{
        required:true
      }
    },
    watch:{
      categoryName(){
        this.orderField='rate'
        this.getUploadVideoList()
      }
    },
    data(){
      return{
        orderField:'rate',
        total:0,
        curPageNum:1,
        curPageSize:10,
        videoList:[]
      }
    },
    components:{
      VideoBox
    },
    methods:{
      getUploadVideoList(){
        let condition={
          categoryName:this.categoryName,
          pageNum:this.curPageNum,
          pageSize:this.curPageSize,
          orderField:this.orderField
        }
        VideoApi.getVideoByCategory(condition).then((res)=>{
          if (res.code===200){
            let data = res.result
            this.total = data.pageInfo.total
            this.videoList=data.result
          }
        })
      }
    },
    created() {
      this.getUploadVideoList()
    }
  }
</script>

<style scoped>
  .video-item{
    margin: 10px;
    display: inline-block;
    overflow: hidden;
    width: 300px;
  }
  .search{
    margin-left: 10px;
    width: 20%;
  }
  .grid-content{
    margin: 30px auto;
  }
  .page{
    margin-left: 15px;
  }
</style>

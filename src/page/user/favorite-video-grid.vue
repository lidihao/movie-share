<template>
  <div class="publish-video-main">
    <div class="search">
      <Row>
        <Col span="5">
          <Input class="search" placeholder="输入关键字搜索" v-model="videoTitle">
            <Button slot="append" icon="ios-search" @click="getUploadVideoList"></Button>
          </Input>
        </Col>
        <Col span="5" offset="5">
          <Select clearable v-model="categoryId">
            <Option v-for="item in categoryList" :value="item.categoryId" :key="item.categoryId">{{ item.categoryName }}</Option>
          </Select>
        </Col>
      </Row>
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
  import CategoryApi from '@/api/category';
  import VideoApi from '@/api/video-api'
  export default {
    name: "favorite-video",
    props:{
      userId:{
        required:true
      }
    },
    watch:{
      userId(){
        this.getUploadVideoList()
      }
    },
    data(){
      return{
        count:12,
        categoryList:[],
        videoTitle:'',
        total:0,
        curPageNum:1,
        curPageSize:10,
        categoryId:'',
        videoList:[]
      }
    },
    components:{
      VideoBox
    },
    methods:{
      getAllCategory(){
        CategoryApi.getAllCategory().then((res)=>{
          if (res.code===200){
            this.categoryList=res.result
          }
        })
      },
      getUploadVideoList(){
        let condition={
          pageNum:this.curPageNum,
          pageSize:this.curPageSize,
          categoryId:this.categoryId,
          videoTitle:this.videoTitle,
          userId:this.userId
        }
        VideoApi.getFavoriteVideo(condition).then((res)=>{
          if (res.code===200){
            let data = res.result
            this.total = data.pageInfo.total
            this.videoList=data.result
          }
        })
      }
    },
    created() {
      this.getAllCategory()
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
  }
  .grid-content{
    margin: 30px auto;
  }
  .page{
    margin-left: 15px;
  }
</style>

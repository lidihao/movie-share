<template>
    <div class="apply-main">
      <h1>视频审批</h1>
      <div class="apply-content">
        <Select v-model="categoryId" style="width:200px" placeholder="视频类别" clearable @on-change="getVideoApply">
          <Option v-for="item in categoryList" :value="item.categoryId" :key="item.categoryId">{{ item.categoryName }}</Option>
        </Select>
        <div>
          <Divider></Divider>
          <VideoApprovalBox class="box-item" v-for="item in videoApplyList" :videoApply="item"></VideoApprovalBox>
        </div>
        <div>
          <Page :total="this.totalSize" show-sizer @on-change="handlePageNumChange" @on-page-size-change="handlePageSizeChange"/>
        </div>
      </div>
    </div>
</template>

<script>
  import VideoApprovalBox from "@/components/VideoApprovalBox";
  import CategoryApi from '@/api/category'
  import VideoApplyApi from '@/api/video-apply'

  export default {
    name: "video-apply",
    components:{VideoApprovalBox},
    data(){
      return{
        categoryId:'',
        categoryList:[],
        videoApplyList:[],
        totalSize:0,
        curPageSize:10,
        curPageNum:1
      }
    },
    methods:{
      getCategory(){
        CategoryApi.getAllCategory().then((res)=>{
          if (res.code===200){
            this.categoryList=res.result
          }
        })
      },
      getVideoApply(){
        let params={
          categoryId:this.categoryId,
          pageSize:this.curPageSize,
          pageNum:this.curPageNum
        }
        VideoApplyApi.listVideoApply(params).then((res)=>{
          if (res.code===200){
            this.videoApplyList=res.result.result
            this.totalSize=res.result.pageInfo.total
          }
        })
      },
      handlePageSizeChange(size){
        this.curPageSize=size
        this.getVideoApply()
      },
      handlePageNumChange(num){
        this.curPageNum=num
        this.getVideoApply()
      }
    },
    created() {
      this.getCategory()
      this.getVideoApply()
    }
  }
</script>

<style scoped>
  .apply-main h1{
    text-align: center;
  }
  .apply-content{
    padding: 50px 200px;
  }
  .box-item{
    margin: 40px 0;
  }
</style>

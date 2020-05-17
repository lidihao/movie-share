<template>
    <div class="apply-main">
      <div class="apply-content">
        <Select v-model="approvalStatus" style="width:200px" placeholder="审批状态" clearable @on-change="getUploadVideo">
          <Option v-for="item in applyStatusList" :value="item.tag" :key="item.tag">{{ item.desc }}</Option>
        </Select>
        <div>
          <Divider></Divider>
          <VideoEditBox class="box-item" v-for="item in videoApplyList" :videoApply="item" @refresh="getUploadVideo"></VideoEditBox>
        </div>
        <div>
          <Page :total="this.totalSize" show-sizer @on-change="handlePageNumChange" @on-page-size-change="handlePageSizeChange"/>
        </div>
      </div>
    </div>
</template>

<script>
  import VideoApplyApi from '@/api/video-apply'
  import VideoEditBox from '@/components/VideoEditBox'
  export default {
    name: "video-process",
    components:{VideoEditBox},
    data(){
      return{
        applyStatusList:[],
        applyStatus: -1,
        videoApplyList:[],
        approvalStatus:-1,
        curPageNum:1,
        curPageSize:10,
        totalSize:0
      }
    },
    methods:{
      getApplyStatusList(){
        VideoApplyApi.listApplyStatusTag().then((res)=>{
          if (res.code===200){
            this.applyStatusList=res.result
          }
        })
      },
      handlePageSizeChange(size){
        this.curPageSize=size
        this.getUploadVideo()
      },
      handlePageNumChange(num){
        this.curPageNum=num
        this.getUploadVideo()
      },
      getUploadVideo(){
        let params={
          approvalStatus:this.approvalStatus,
          pageNum:this.curPageNum,
          pageSize:this.curPageSize
        }
        VideoApplyApi.listUploadVideo(params).then((res)=>{
          if (res.code===200){
            this.videoApplyList=res.result.result
            this.totalSize=res.pageInfo.total
          }
        })
      }
    },
    created() {
      this.getApplyStatusList()
      this.getUploadVideo()
    }
  }
</script>

<style scoped>
  .apply-main h1{
    text-align: center;
  }
  .apply-content{
    padding: 50px 100px;
  }
  .box-item{
    margin: 30px 0;
    position: relative;
  }
</style>

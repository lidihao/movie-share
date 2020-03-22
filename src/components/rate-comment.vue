<template>
  <div>
    <div class="comment" style="position: relative;">
      <div class="bb-comment ">
        <RateCommentSender :videoId="this.videoId" @commentSuccess="handleCommentSuccess"></RateCommentSender>
        <div class="comment-list ">
          <RateCommentItem v-for="item in rateCommentList" :videoComment="item"></RateCommentItem>
        </div>
        <div class="bottom-page paging-box-big">
          <Page :total="totalSize" show-total @on-change="changePage"></Page>
        </div>
        <RateCommentSender :videoId="this.videoId" @commentSuccess="handleCommentSuccess"></RateCommentSender>
      </div>
    </div>
  </div>
</template>

<script>
  import RateCommentSender from '@/components/rate-comment-sender'
  import VideoCommentApi from '@/api/videoComment-api'
  import RateCommentItem from '@/components/rate-comment-item'
    export default {
      name: "rate-comment",
      props: {
        videoId: {
          required: true
        }
      },
      data(){
        return{
          curPageNum:1,
          curPageSize:10,
          totalSize:0,
          rateCommentList:[]
        }
      },
      components:{RateCommentSender,RateCommentItem},
      methods:{
        handleCommentSuccess(){
          this.getRateComment()
        },
        getRateComment(){
          let params={
            videoId:this.videoId,
            pageNum:this.curPageNum,
            pageSize:this.curPageSize
          }
          VideoCommentApi.listRateComment(params).then((res)=>{
            if (res.code===200){
              this.rateCommentList=res.result.result
              this.totalSize=res.result.pageInfo.total
            }
          })
        },
        changePage(pageNum){
          this.curPageNum=pageNum
          this.getRateComment()
        }
      },
      created() {
        this.getRateComment()
      }
    }
</script>

<style scoped>

</style>

<template>
  <div class="common">
    <div class="comment" style="position: relative;">
      <div class="bb-comment ">
        <comment-sender :videoId="this.videoId" @commentSuccess="handleCommentSuccess"></comment-sender>
        <div class="comment-list ">
          <div v-for="comment in videoCommentList" v-if="refreshCommentList">
            <CommentItem :videoComment="comment" :uploader="uploader"></CommentItem>
          </div>
        </div>
        <div class="bottom-page paging-box-big">
          <Page :total="totalCommentCount" show-total @on-change="changePage"></Page>
        </div>
        <comment-sender :videoId="this.videoId" @commentSuccess="handleCommentSuccess"></comment-sender>
      </div>
    </div>
  </div>
</template>

<script>
  import CommentItem from './comment-item'
  import CommentSender from './comment-sender'
  import VideoCommentApi from '@/api/videoComment-api'

  export default {
    name: "comment",
    props:{
      videoId:{
        required:true
      },
      uploader:{
        required:true
      }
    },
    components: {CommentItem, CommentSender},
    data(){
      return{
        videoCommentList:[],
        totalCommentCount:0,
        curPageNum:1,
        refreshCommentList:true,
        curPageSize:10
      }
    },
    methods:{
      getVideoCommentList(){
        let params={
          videoId:this.videoId,
          pageNum:this.curPageNum,
          pageSize:this.curPageSize
        }
        VideoCommentApi.listVideoCommentByVideoId(params).then((res)=>{
          if (res.code===200){
            let data=res.result
            this.totalCommentCount=data.pageInfo.total
            this.videoCommentList=data.result
          }
        })
      },
      handleCommentSuccess(){
        this.refreshCommentList=false
        this.getVideoCommentList()
        this.$nextTick(()=>{
          this.refreshCommentList=true
        })
      },
      changePage(pageNum){
        this.curPageNum=pageNum
        this.getVideoCommentList()
      }
    },
    created() {
      this.getVideoCommentList()
    }
  }
</script>

<style scoped>
  .common{
    margin: 40px auto;
  }
  .b-head {
    font-size: 18px;
    line-height: 24px;
    color: #222;
    margin: 0 0 20px;
  }

  .b-head-t{
    margin:auto 10px;
  }
  .tabs-order{
    display: inline-block;
  }
  .header-page{
    display: inline-block;
    margin-left: 100px;
  }
  .bottom-page{
    margin: 40px auto;
  }
</style>

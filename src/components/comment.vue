<template>
  <div class="common">
    <div class="b-head"><span class="b-head-t results">{{totalCommentCount}}</span><span class="b-head-t">评论</span></div>
    <div class="comment" style="position: relative;">
      <div class="bb-comment ">
        <div class="comment-header">
          <div class="tabs-order">
            <Menu mode="horizontal" theme="light" active-name="1">
              <Menu-item name="1">
                <Icon type="ios-paper"></Icon>
                评论内容
              </Menu-item>
            </Menu>
          </div>
          <div class="header-page">
            <Page :total="totalCommentCount" size="small" show-elevator show-sizer></Page>
          </div>
        </div>
        <CommentSender></CommentSender>
        <div class="comment-list ">
          <div v-for="comment in videoCommentList">
            <CommentItem :videoComment="comment"></CommentItem>
          </div>
        </div>
        <div class="bottom-page paging-box-big">
          <Page :total="totalCommentCount" show-elevator show-sizer></Page>
        </div>
        <comment-sender></comment-sender>
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
      }
    },
    components: {CommentItem, CommentSender},
    data(){
      return{
        videoCommentList:[],
        totalCommentCount:0,
        curPageNum:1,
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
    margin-left: 200px;
  }
  .bottom-page{
    margin: 40px auto;
  }
</style>

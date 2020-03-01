<template>
  <div class="list-item reply-wrap" data-id="2175428370" data-index="0" scrollshow="true">
    <div class="user-face">
      <a target="_blank"
         data-usercard-mid="321872907" @click="toUserSpace">
        <img class="user-face-img" :src="`http://localhost:8089${videoComment.commentUser.avatarUrl}`" alt="">
      </a>
    </div>
    <div class="con ">
      <div class="user">
        <a @click="toUserSpace">
          <h2>{{videoComment.commentUser.userName}}</h2>
        </a>
      </div>
      <p class="text">
        {{videoComment.commentContent}}
      </p>
      <div class="info"><span class="time">{{videoComment.createTime}}</span><span
        class="like "><i></i><span>746</span></span><span class="hate "><i></i></span><span
        class="reply btn-hover btn-highlight" @click="replyComment">回复</span>
        <div class="operation">
          <div class="spot"></div>
          <div class="opera-list" style="display: none;">
            <ul>
              <li class="blacklist">加入黑名单</li>
              <li class="report">举报</li>
            </ul>
          </div>
        </div>
      </div>
      <div class="reply-box">
        <div v-for="reply in replyList" v-if="refreshReplyList">
          <ReplyItem :reply="reply"  @replySuccess="handleReplySuccess"></ReplyItem>
        </div>
        <div class="view-more">
          <Page :total="totalReply" show-total size="small" @on-change="pageNumChange"></Page>
        </div>
      </div>
      <div class="paging-box"></div>
    </div>
    <div>
      <Modal
        v-model="showSender"
        :title="replyTitle"
        @on-ok="doReplyComment"
      >
        <Input  v-model="replyContent" type="textarea" :rows="4" placeholder="请输入..."></Input>
      </Modal>
    </div>
  </div>
</template>

<script>
  import ReplyItem from './comment-reply-item'
  import {mapGetters} from 'vuex'
  import VideoCommentApi from '@/api/videoComment-api'
  export default {
    name: "comment-item",
    components:{ReplyItem},
    props:{
      videoComment:{
        required:true
      }
    },
    computed:{
      ...mapGetters(['user'])
    },
    data(){
      return{
        showSender:false,
        replyTitle:'回复 @'+this.videoComment.commentUser.userName,
        replyContent:'',
        replyList:[],
        curPageNum:1,
        curPageSize:5,
        totalReply:0,
        refreshReplyList:true
      }
    },
    watch:{
      videoComment(){
        this.getReplyList()
      }
    },
    methods:{
      replyComment(){
        this.showSender=true
      },
      doReplyComment(){
        let reply={
          replyContent:this.replyContent,
          replyUserId:this.user.userId,
          videoCommentId:this.videoComment.commentId
        }
        console.log(reply)
        VideoCommentApi.replyComment(reply).then((res)=>{
          if (res.code===200){
            this.$Message.success('回复成功')
            this.handleReplySuccess()
          }
        })
      },
      getReplyList(){
        let params={
          commentId:this.videoComment.commentId,
          pageNum:this.curPageNum,
          pageSize:this.curPageSize
        }
        VideoCommentApi.listCommentReply(params).then((res)=>{
          if (res.code===200){
            let data=res.result
            this.replyList=data.result
            this.totalReply=data.pageInfo.total
          }
        })

      },
      handleReplySuccess(){
        this.refreshReplyList=false
        this.getReplyList()
        this.$nextTick(()=>{
          this.refreshReplyList=true
        })
      },
      pageNumChange(pageNum){
        this.curPageNum=pageNum
        this.getReplyList()
      },
      toUserSpace(){
        this.$router.push({
          path:'/user/person-space',
          query:{
            userId:this.user.userId
          }
        })
      }
    },
    created() {
      this.getReplyList()
    }
  }
</script>

<style scoped>
  .list-item{
    box-shadow: 1px 1px 10px;
    padding-top: 30px;
    margin: 40px auto;
  }
  .reply-box{
    margin-left: 50px;
  }
  .user-face-img{
    border-radius: 50px;
    margin: 0 auto;
    float: left;
    width: 50px;
    height: 50px;
  }
  .user{
    font-size: 13px;
  }
  .con{
    margin-left: 85px;
  }
  .con .text{
    padding: 10px 10px;
    font-size: 14px;
  }
  .reply-box{
    padding-top: 10px;
    padding-bottom: 10px;
  }
  .time{
    margin-left: 6px;
    margin-right: 16px;
  }
  .reply{
    margin: 0px 20px;
  }
  .reply:hover{
    cursor: pointer;
  }
  .view-more{
    margin: 30px auto;
  }
</style>

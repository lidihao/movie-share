<template>
  <div class="list-item reply-wrap" data-id="2175428370" data-index="0" scrollshow="true">
    <div class="user-face">
      <a target="_blank"
         data-usercard-mid="321872907" @click="toUserSpace">
        <img class="user-face-img" :src="userAvatar" alt="">
      </a>
      <Rate allow-half disabled v-model="videoComment.rate" style="float: right"></Rate>
    </div>
    <div class="con ">
      <div class="user">
        <span class="uploader" v-if="showUP">
        UP
      </span>
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
          <ReplyItem :reply="reply" :uploader="uploader" @replySuccess="handleReplySuccess"></ReplyItem>
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
  import Config from '@/settings'
  export default {
    name: "comment-item",
    components:{ReplyItem},
    props:{
      videoComment:{
        required:true
      },
      uploader:{
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
        refreshReplyList:true,
        userAvatar:'',
        showUP:false
      }
    },
    watch:{
      videoComment(){
        this.getReplyList()
        this.userAvatar=Config.server+this.videoComment.commentUser.avatarUrl
        this.showUP=parseInt(this.uploader.userId)===parseInt(this.videoComment.commentUser.userId)
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
            userId:this.videoComment.commentUser.userId
          }
        })
      }
    },
    created() {
      this.getReplyList()
      this.userAvatar=Config.server+this.videoComment.commentUser.avatarUrl
      this.showUP=parseInt(this.uploader.userId)===parseInt(this.videoComment.commentUser.userId)
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
  .uploader{
    border-bottom-color:rgb(251, 114, 153);
    float: left;
    margin-right: 10px;
    border-bottom-left-radius:3px;
    border-bottom-right-radius:3px;
    border-bottom-style:solid;
    border-bottom-width:1px;
    border-image-outset:0px;
    border-image-repeat:stretch;
    border-image-slice:100%;
    border-image-source:none;
    border-image-width:1;
    border-left-color:rgb(251, 114, 153);
    border-left-style:solid;
    border-left-width:1px;
    border-right-color:rgb(251, 114, 153);
    border-right-style:solid;
    border-right-width:1px;
    border-top-color:rgb(251, 114, 153);
    border-top-left-radius:3px;
    border-top-right-radius:3px;
    border-top-style:solid;
    border-top-width:1px;
    box-sizing:content-box;
    color:rgb(251, 114, 153);
    display:inline-block;
    font-family:"Microsoft YaHei", Arial, Helvetica, sans-serif;
    font-size:12px;
    font-style:normal;
    font-weight:400;
    height:18px;
    line-height:18px;
    margin-bottom:0px;
    margin-left:0px;
    margin-top:0px;
    min-width:30px;
    overflow-wrap:break-word;
    padding-bottom:0px;
    padding-left:0px;
    padding-right:0px;
    padding-top:0px;
    text-align:center;
    text-size-adjust:100%;
    vertical-align:middle;
    width:30px;
    -webkit-tap-highlight-color:rgba(0, 0, 0, 0);
  }
</style>

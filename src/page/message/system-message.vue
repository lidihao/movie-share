<template>
  <div class="system-message-main">
    <div class="message-top">
      <div class="title">
        <h2>系统消息</h2>
      </div>
      <div>
        <Select v-model="curMessageType" style="width:200px" clearable @on-change="getMessageList">
          <Option v-for="item in messageTypeList" :value="item.messageType" :key="item.messageType">{{ item.messageTypeDesc }}</Option>
        </Select>
      </div>
      <div class="content">
        <div v-for="message in this.messageList">
          <div v-if="message.systemMessageType==='comment_message'" style="margin: 20px 0">
            <CommentMessage :message="message"></CommentMessage>
          </div>
          <div v-if="message.systemMessageType==='rate_comment_message'" style="margin: 20px 0">
            <RateCommentMessage :message="message"></RateCommentMessage>
          </div>
          <div v-if="message.systemMessageType==='video_upload_message'" style="margin: 20px 0">
            <VideoUploadMessage :message="message"></VideoUploadMessage>
          </div>
          <div v-if="message.systemMessageType==='video_approval_message'" style="margin: 20px 0">
            <VideoApplyMessage :message="message"></VideoApplyMessage>
          </div>
        </div>
      </div>
      <div>
        <Page :total="total" show-total @on-change="changePage" :page-size="curPageSize"/>
      </div>
    </div>
  </div>
</template>

<script>
  import SystemMessageApi from '@/api/system-message-api'
  import CommentMessage from '@/page/message/comment-message'
  import RateCommentMessage from '@/page/message/rate-comment-message'
  import VideoUploadMessage from '@/page/message/video-upload-message'
  import VideoApplyMessage from '@/page/message/video-approval-message'
  import {mapGetters} from 'vuex'
    export default {
      name: "system-message",
      data(){
        return{
          messageTypeList:[],
          curMessageType:'',
          messageList:[],
          curPageNum:1,
          curPageSize:20,
          total:0
        }
      },
      components:{
        CommentMessage,
        RateCommentMessage,
        VideoUploadMessage,
        VideoApplyMessage
      },
      computed:{
        ...mapGetters(['user','isLogin'])
      },
      methods:{
        getMessageTypeList(){
          SystemMessageApi.getMessageTypeList().then(res=>{
            if (res.code===200){
              this.messageTypeList=res.result
              console.log(this.messageTypeList)
            }
          })
        },
        getMessageList(){
          let parmas={
            pageNum:this.curPageNum,
            pageSize:this.curPageSize,
            messageType:this.curMessageType,
            userId:this.user.userId
          }
          SystemMessageApi.getMessageList(parmas).then(res=>{
            if (res.code===200){
              this.messageList=res.result.result
              this.total=res.result.pageInfo.total
            }
          })
        },
        changePage(pageNum){
          this.curPageNum=pageNum
          this.getMessageList()
        }
      },
      created() {
        this.getMessageTypeList()
        this.getMessageList()
      }
    }
</script>

<style scoped>
  .system-message-main{
    background-color: rgba(255,255,255,0.5);
    width: 60%;
    flex: 1;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    -ms-flex-direction: column;
    flex-direction: column;
  }
  .message-top{
    padding: 10px 10px 0;
    z-index: 11;
  }
  .title{
    margin: 20px 0px;
  }
  .content{
    margin: 20px 0px;
  }
</style>

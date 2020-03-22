<template>
  <div class="reply-item">
    <div class="user-face">
      <a @click="toUserSpace(reply.replyUser.userId)">
        <img class="user-face-img" :src="`http://localhost:8089${reply.replyUser.avatarUrl}`" alt="">
      </a>
    </div>
    <div class="reply-con">
      <div class="user">
        <span class="uploader" v-if="showUP">
        UP
      </span>
        <a data-usercard-mid="321872907" class="name " @click="toUserSpace(user.userId)">{{reply.replyUser.userName}}</a>
        <span v-if="isReply">回复 @</span>
        <a v-if="isReply" class="name" @click="toUserSpace(reply.replyUser.userId)">
          {{reply.replyUser.userName}}
        </a>
        <div >
            <p style="word-break:break-all">{{reply.replyContent}}</p>
        </div>
      </div>
    </div>
    <div class="info">
      <span class="time">{{reply.createTime}}</span>
      <span class="like "><i></i><span>56</span></span><span class="hate "><i></i></span>
      <span class="reply" @click="replyTo">回复</span>
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
    <div>
      <Modal
        v-model="showSender"
        :title="replyTitle"
        @on-ok="replyToOthers"
      >
        <Input v-model="replyContent" type="textarea" :rows="4" placeholder="请输入..."></Input>
      </Modal>
    </div>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'
  import VideoCommentApi from '@/api/videoComment-api'
  export default {
    name: "comment-reply-item",
    props:{
      reply:{
        required:true
      },
      uploader:{
        required: true
      }
    },
    computed:{
      ...mapGetters(['user'])
    },
    data(){
      return{
        showSender:false,
        replyTitle:'回复 @'+this.reply.replyUser.userName,
        replyContent: '',
        isReply:false,
        showUP:false
      }
    },
    watch:{
      reply(){
        this.isReply=this.reply.replyToComment
        if (parseInt(this.uploader.userId)===parseInt(this.reply.replyUser.userId)){
          this.showUP=true
        }
      }
    },
    methods:{
      replyTo(){
        this.showSender=true
      },
      replyToOthers(){
        let replyComment={
          replyContent:this.replyContent,
          replyUserId:this.user.userId,
          replyToId:this.reply.replyId,
          videoCommentId:this.reply.videoCommentId
        }
        VideoCommentApi.replyComment(replyComment).then((res)=>{
          if (res.code===200){
            this.$Message.success('回复成功')
            this.$emit('replySuccess',res)
          }
        })
      },
      toUserSpace(userId){
        this.$router.push({
          path:'/user/person-space',
          query:{
            userId:userId
          }
        })
      }
    },
    created() {
      this.isReply=this.reply.replyToComment
      if (parseInt(this.uploader.userId)===parseInt(this.reply.replyUser.userId)){
        this.showUP=true
      }
    }
  }
</script>

<style scoped>
  .user-face-img{
    border-radius: 30px;
    margin: 0 auto;
    float: left;
    width: 30px;
    height: 30px;
  }
  .reply-con{
    margin: 10px 50px;
  }
  .text-con{
    margin-left: 5px;
  }
  a.name{
    font-size: 17px;
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

  .comment{
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

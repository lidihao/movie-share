<template>
  <div class="reply-item">
    <div class="user-face">
      <a @click="toUserSpace(user.userId)">
        <img class="user-face-img" :src="`http://localhost:8089${reply.replyUser.avatarUrl}`" alt="">
      </a>
    </div>
    <div class="reply-con">
      <div class="user">
        <a data-usercard-mid="321872907" class="name " @click="toUserSpace(user.userId)">{{reply.replyUser.userName}}</a>
        <span v-if="isReply">回复 @</span>
        <a v-if="isReply" class="name" @click="toUserSpace(reply.replyUser.userId)">
          {{reply.replyUser.userName}}
        </a>
        <div >
          <Card :bordered="true" :shadow="true">
            <p style="word-break:break-all">{{reply.replyContent}}</p>
          </Card>

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
        isReply:false
      }
    },
    watch:{
      reply(){
        this.isReply=this.reply.replyToComment
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
    }
  }
</script>

<style scoped>
  .user-face-img{
    border-radius: 50px;
    margin: 0 auto;
    float: left;
    width: 50px;
    height: 50px;
  }
  .reply-con{
    margin: 30px 80px;
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
</style>

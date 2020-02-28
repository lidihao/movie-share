<template>
  <div class="reply-item">
    <div class="user-face">
      <a>
        <img class="user-face-img" :src="`http://localhost:8089${reply.replyUser.avatarUrl}`" alt="">
      </a>
    </div>
    <div class="reply-con">
      <div class="user">
        <a href="//space.bilibili.com/321872907" target="_blank"
           data-usercard-mid="321872907" class="name ">{{reply.replyUser.userName}}</a>
        <span class="text-con">{{reply.replyContent}}</span>
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
        title="回复"
        @on-ok="replyToOthers"
      >
        <i-input type="textarea" :rows="4" placeholder="请输入..."></i-input>
      </Modal>
    </div>
  </div>
</template>

<script>
  export default {
    name: "comment-reply-item",
    props:{
      reply:{
        required:true
      }
    },
    data(){
      return{
        showSender:false
      }
    },
    methods:{
      replyTo(){
        this.showSender=true
      },
      replyToOthers(){

      }
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

</style>

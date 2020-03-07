<template>
  <div>
    <div class="msg-item" >
      <div class="msg-time">
        <span class="time">{{message.sendTime}}</span>
      </div>
      <img :src="userAvatarUrl" :class="avatarClass">
      <div :class="messageClass">
        <div class="message-content">
          {{message.messageContent}}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Config from '@/settings'
    export default {
      name: "message-item",
      props:{
        userVo:{
          required:true
        },
        friendVo:{
          required: true
        },
        message:{
          required:true
        }
      },
      data(){
        return{
          userAvatarUrl:'',
          messageClass:'',
          avatarClass:''
        }
      },
      watch:{
        userVo(){
          this.changeClass()
        },
        friendVo(){
          this.changeClass()
        },
        message(){
          this.changeClass()
        }
      },
      methods:{
        changeClass(){
          if (this.message.senderId===this.userVo.userId){
            this.userAvatarUrl=Config.server+this.userVo.avatarUrl
            this.messageClass='message to-me'
            this.avatarClass='avatar to-me'
          }else {
            this.userAvatarUrl=Config.server+this.friendVo.avatarUrl
            this.messageClass='message to-other'
            this.avatarClass='avatar to-other'
          }
        }
      },
      created() {
        this.changeClass()
      }
    }
</script>

<style scoped>
  .message {
    margin: 0 10px;
    position: relative;
    overflow: hidden;
    color: #333;
  }
  .message .message-content {
    line-height: 1.5;
    font-size: 14px;
    padding: 8px 16px;
    word-wrap: break-word;
    word-break: break-word;
    border-radius: 0 16px 16px 16px;
    overflow: hidden;
    background: #fff;
  }
  .avatar{
    display: block;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    -ms-flex-negative: 0;
    flex-shrink: 0;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
  }
  .msg-time {
    padding: 16px 0 16px;
    text-align: center;
  }
  .time {
    color: #999;
    font-size: 12px;
    line-height: 22px;
    margin: 0 10px;
  }
  .msg-item {
    min-height: 48px;
    padding: 10px 16px 16px;
    overflow: hidden;
    position: relative;
  }
  .to-me{
    float: right;
  }
  .to-other{
    float: left;
  }
</style>

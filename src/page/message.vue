<template>
  <div>
    <h1>jkjtkdjkdkfkkir</h1>
    <div class="imessage-content">
      <div class="user-list">
        <div class="list-title">
          <span>近期消息</span>
        </div>
        <div class="list-content ps">
          <a class="list-item" v-for="i in 10">
            <img src="../assets/1.png" class="avatar">
            <div class="name-box">
              <div class="name">lidihao</div>
              <div class="last-word">kudfikkkkjfdjfiddddddddddddddddddddddd</div>
            </div>
            <div class="close">
              <Icon type="md-close" size="20" />
            </div>
          </a>
        </div>
      </div>
      <div class="dialog">
        <div class="title">
          <span>lidihao</span>
        </div>
        <div class="message-list">
          <div v-for="i in 100">
            <div class="msg-item" >
              <img src="../assets/1.png" class="avatar">
              <div class="message">
                <div class="message-content">
                  odjfodkoooooooooooooooooooooooooooooooooodkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkooooooofjdofjdfi
                </div>
              </div>
            </div>
            <div class="msg-item">
              <div class="message" style="float: right">
                <img src="../assets/1.png" class="avatar" style="float: right; ">
                <div class="message-content">
                  kkkkkkkksdkffffffffjfkdjkfdjkfdsfkdif
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="send-box">
          <Input type="textarea" :rows="4" placeholder="请输入..."></Input>
          <Button type="primary"style="margin-top: 10px;float: right" >发表评论</Button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
    export default {
        name: "message"
    }
</script>

<style scoped>
  .imessage-content{
    padding: 0 !important;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-orient: horizontal;
    -webkit-box-direction: normal;
    -ms-flex-direction: row;
    flex-direction: row;
    height: calc(100vh - 128px);
    margin-left: 1%;
    width: 90%;
    background-color: #fff;
    -webkit-box-shadow: 0 2px 4px 0 rgba(121,146,185,0.54);
    box-shadow: 1px 1px 10px;
    border-radius: 10px;
  }
  .user-list{
    width: 240px;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    -ms-flex-direction: column;
    flex-direction: column;
    border-right: 1px solid #e9eaec;
  }
  .list-title{
    padding-left: 24px;
    line-height: 35px;
    height: 36px;
    overflow: hidden;
    border-bottom: 1px solid #e9eaec;
    color: #666;
    flex-shrink: 0;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }
  .list-content{
    position: relative;
    overflow: auto;
    -webkit-box-flex: 1;
    -ms-flex: 1;
    flex: 1;
  }
  .ps {
    -ms-overflow-style: none;
    touch-action: auto;
    -ms-touch-action: auto;
  }
  .list-item .avatar {
    display: block;
    width: 42px;
    height: 42px;
    border-radius: 50%;
    -ms-flex-negative: 0;
    flex-shrink: 0;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    margin-right: 8px;
    position: relative;
  }
  .list-item{
    width: 100%;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-orient: horizontal;
    -webkit-box-direction: normal;
    -ms-flex-direction: row;
    flex-direction: row;
    padding: 19px 24px;
    position: relative;
    overflow: hidden;
  }
  .list-item .name-box {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    -ms-flex-direction: column;
    flex-direction: column;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    justify-content: center;
  }
  .list-item .name {
    color: #333;
    font-size: 14px;
    min-height: 16px;
    line-height: 1;
  }
  .list-item .last-word, .list-item .name {
    overflow: hidden;
    width: 155px;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  .list-item .close {
    display: none;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    -webkit-transition: 300ms;
    transition: 300ms;
    color: #999;
  }
  .list-item:hover{
    color: #999;
    background-color: #e4e5e6;
  }
  .list-item:hover .close{
    display: block;
  }
  .dialog {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    width: 100%;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    -ms-flex-direction: column;
    flex-direction: column;
    -webkit-box-align: stretch;
    -ms-flex-align: stretch;
    align-items: stretch;
    height: 100%;
  }
  .title {
    height: 36px;
    -ms-flex-negative: 0;
    flex-shrink: 0;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    justify-content: center;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    border-bottom: 1px solid #e9eaec;
    position: relative;
    text-align: center;
    color: #333;
  }
  .message-list {
    -webkit-box-flex: 1;
    -ms-flex: 1;
    flex: 1;
    position: relative;
    overflow-x: hidden;
    overflow-y: scroll;
    background-color: #f4f5f7;
  }
  .msg-item {
    min-height: 48px;
    padding: 10px 16px 16px;
    overflow: hidden;
    position: relative;
  }
  .message {
    float: left;
    max-width: 480px;
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
    background-image: url(//static.hdslb.com/images/member/noface.gif);
    float: left;
  }
  .send-box {
    height: 150px;
    border-top: 1px solid #d8d8d8;
    border-bottom-right-radius: 4px;
    background-color: #f4f5f7;
    -ms-flex-negative: 0;
    flex-shrink: 0;
    padding: 10px 16px;
    position: relative;
    z-index: 2;
  }
</style>

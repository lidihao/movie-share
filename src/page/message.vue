<template>
  <div>
    <div class="imessage-content">
      <div class="user-list">
        <div class="list-title">
          <span>近期消息</span>
        </div>
        <div class="list-content ps">
          <div v-for="item in userList">
            <PrivateMsgUserListItem :msgUserItem="item" @getMessage="handleGetMessage"></PrivateMsgUserListItem>
          </div>
        </div>
      </div>
      <div class="dialog">
        <div class="title">
          <span>{{friendVo.userName}}</span>
        </div>
        <div class="message-list">
          <div class="msg-more">
            <Icon type="ios-arrow-dropup" size="15"/>
            <span>查看和他的历史私信消息</span>
          </div>
          <div v-for="message in messageList">
            <MessageItem :friendVo="friendVo" :userVo="userVo" :message="message"></MessageItem>
          </div>
        </div>
        <div class="send-box">
          <Input type="textarea" :rows="4" placeholder="请输入..." v-model="messageContent"></Input>
          <Button type="primary"style="margin-top: 10px;float: right" @click="sendMsg">发表评论</Button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
    import {getToken} from '@/utils/auth'
    import PrivateMsgUserListItem from '@/components/PrivateMsgUserListItem'
    import PrivateMsgApi from '@/api/privateMsg-api'
    import {mapGetters} from 'vuex'
    import MessageItem from '@/components/message-item'
    export default {
      name: "message",
      components:{
        PrivateMsgUserListItem,
        MessageItem
      },
      computed:{
        ...mapGetters(['user'])
      },
      data(){
        return {
          userList:[],
          messageList:[],
          messageMap:{},
          friendVo:{},
          userVo:{},
          messageContent:'',
          sendMessageUserId:-1,
          curUserListPageNum:1
        }
      },
      mounted () {
        // WebSocket
        if ('WebSocket' in window) {
          let token=getToken()
          this.websocket = new WebSocket(`ws://localhost:8089/websocket/${this.user.userId}?Authorization=${token}`)
          this.initWebSocket()
        } else {
          alert('当前浏览器 Not support websocket')
        }
      },
      beforeDestroy () {
        this.onbeforeunload()
      },
      methods: {
        initWebSocket () {
          // 连接错误
          this.websocket.onerror = this.setErrorMessage

          // 连接成功
          this.websocket.onopen = this.setOnopenMessage

          // 收到消息的回调
          this.websocket.onmessage = this.setOnmessageMessage

          // 连接关闭的回调
          this.websocket.onclose = this.setOncloseMessage


          // 监听窗口关闭事件，当窗口关闭时，主动去关闭websocket连接，防止连接还没断开就关闭窗口，server端会抛异常。
          window.onbeforeunload = this.onbeforeunload
        },
        setErrorMessage () {
          console.log('WebSocket连接发生错误   状态码：' + this.websocket.readyState)
        },
        setOnopenMessage () {
          console.log('WebSocket连接成功    状态码：' + this.websocket.readyState)
        },
        setOnmessageMessage (event) {
          // 根据服务器推送的消息做自己的业务处理
          let data= JSON.parse(event.data)
          this.handleReceiverMessage(data)
        },
        setOncloseMessage () {
          console.log('WebSocket连接关闭    状态码：' + this.websocket.readyState)
        },
        onbeforeunload () {
          this.closeWebSocket()
        },
        closeWebSocket () {
          this.websocket.close()
        },
        sendMsg(){
          let data={
            messageContent: this.messageContent,
            senderId:this.userVo.userId,
            receiverId:this.friendVo.userId
          }
          PrivateMsgApi.sendMessage(data).then((res)=>{
            if (res.code===200){
              let messsage = res.result
              this.messageList.push(messsage)
            }
          })
        },
        getUserList(){
          let requestParams={
            userId:this.user.userId,
            pageNum:this.curUserListPageNum,
            pageSize:10
          }
          PrivateMsgApi.getPrivateMsgUserList(requestParams).then((res)=>{
            if (res.code===200){
              let data =res.result.result
              data.forEach((item)=>{
                this.userList.push(item)
              })
              if (this.sendMessageUserId!==-1){
                let idx = this.findDuplicateIndex(parseInt(this.sendMessageUserId));
                if (idx===-1){
                  let params={
                    userId:this.user.userId,
                    friendId:this.sendMessageUserId
                  }
                  PrivateMsgApi.getUserItemDetail(params).then((res)=>{
                    if (res.code===200){
                      let itemDetail = res.result
                      this.userList.splice(0,0,itemDetail)
                    }
                  })
                }else {
                  let item = this.userList[idx]
                  this.userList.splice(idx,1)
                  this.userList.splice(0,0,item)
                }
              }
              if (this.userList){
                this.handleGetMessage(this.userList[0].friend.userId)
              }
            }
          })
        },
        findDuplicateIndex(userId){
          for (let i=0;i<this.userList.length;i++){
            if (this.userList[0].friend.userId===userId){
              return i;
            }
          }
          return -1;
        },
        handleReceiverMessage(data){
          if (this.messageMap[data.senderId]){
            this.messageMap[data.senderId].messagePage.result.push(data)
          }
          let idx = this.findDuplicateIndex(parseInt(data.senderId));
          if (idx===-1){
            let params={
              userId:data.receiverId,
              friendId:data.senderId
            }
            PrivateMsgApi.getUserItemDetail(params).then((res)=>{
              if (res.code===200){
                let itemDetail = res.result
                this.userList.splice(0,0,itemDetail)
                let requestParams={
                  userId:data.receiverId,
                  friendId:data.senderId,
                  pageNum:0,
                  pageSize:10
                }
                PrivateMsgApi.getMessageList(requestParams).then((res)=>{
                  if (res.code===200){
                    this.messageMap[data.senderId]=res.result
                  }
                })
              }
            })
          }
        },
        handleGetMessage(friendId){
          if(this.messageMap[friendId]){
            let messageData=this.messageMap[friendId]
            this.friendVo=messageData.friend
            this.userVo=messageData.user
            this.messageList=messageData.messagePage.result
            return
          }
          let requestParams={
            userId:this.user.userId,
            friendId:friendId,
            pageNum:0,
            pageSize:10
          }
          PrivateMsgApi.getMessageList(requestParams).then((res)=>{
            if (res.code===200){
              this.friendVo=res.result.friend;
              this.userVo = res.result.user
              this.messageList=res.result.messagePage.result
              this.messageMap[this.friendVo.userId]=res.result
            }
          })
        }
      },
      created() {
        this.sendMessageUserId=this.$route.query.recvUserId
        this.getUserList()
      }
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

  .msg-more {
    cursor: pointer;
    padding: 16px 0 0;
    text-align: center;
    color: #23ade5;
    min-height: 38px;
  }
</style>

<template>
  <div>
    <a class="list-item" @click="getMessage">
      <img :src="avatarUrl" class="avatar">
      <div class="name-box">
        <div class="name">{{msgUserItem.friend.userName}}</div>
        <div class="last-word">{{this.lastMsg}}</div>
      </div>
      <div class="close">
        <Icon type="md-close" size="20" />
      </div>
    </a>
  </div>
</template>

<script>
    import Config from '@/settings'
    export default {
      name: "PrivateMsgUserListItem",
      props:{
        msgUserItem:{
          required:true
        }
      },
      watch:{
        msgUserItem(){
          this.avatarUrl=Config.server+this.msgUserItem.friend.avatarUrl
          if (this.msgUserItem.lastMsg){
            this.lastMsg=this.msgUserItem.lastMsg.messageContent
          }
        }
      },
      data(){
        return{
          avatarUrl:'',
          lastMsg:''
        }
      },
      methods:{
        getMessage(){
          this.$emit('getMessage',this.msgUserItem.friend.userId)
        }
      },
      created() {
        this.avatarUrl=Config.server+this.msgUserItem.friend.avatarUrl
      }
    }
</script>

<style scoped>
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
  .active{
    color: #999;
    background-color: #e4e5e6;
  }
  .list-item:hover .close{
    display: block;
  }
  .badge-count {
    position: absolute;
    -webkit-transform: translateX(50%);
    transform: translateX(50%);
    top: 10px;
    right: 30px;
    height: 20px;
    border-radius: 10px;
    min-width: 20px;
    border: 1px solid transparent;
    color: #fff;
    line-height: 18px;
    padding: 0 6px;
    font-size: 12px;
    white-space: nowrap;
    -webkit-transform-origin: -10% center;
    transform-origin: -10% center;
    background: #f30;
    z-index: 10;
    box-shadow: 0 0 0 1px #fff;
  }
</style>

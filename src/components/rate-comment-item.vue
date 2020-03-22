<template>
  <div class="list-item reply-wrap" data-id="2175428370" data-index="0" scrollshow="true">
    <div class="user-face">
      <a target="_blank"
         data-usercard-mid="321872907" @click="toUserSpace">
        <img class="user-face-img" :src="userAvatar" alt="">
        <Rate allow-half disabled v-model="videoComment.rate" style="float: right"></Rate>
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
      <div class="info"><span class="time">{{videoComment.createTime}}</span>
      </div>
      <div class="paging-box"></div>
    </div>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'
  import VideoCommentApi from '@/api/videoComment-api'
  import Config from '@/settings'
  export default {
    name: "comment-item",
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
        userAvatar:'',
      }
    },
    watch:{
      videoComment(){
        this.userAvatar=Config.server+this.videoComment.commentUser.avatarUrl
      }
    },
    methods:{
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
      this.userAvatar=Config.server+this.videoComment.commentUser.avatarUrl
    }
  }
</script>

<style scoped>
  .list-item{
    border: 1px solid #dcdee2;
    border-color: #e8eaec;
    background: #fff;
    border-radius: 4px;
    font-size: 14px;
    position: relative;
    transition: all .2s ease-in-out;
    padding-top: 20px;
    padding-left: 20px;
    padding-bottom: 10px;
    margin-top: 20px;
    margin-bottom: 10px;
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
  .time{
    margin-left: 6px;
    margin-right: 16px;
  }
</style>

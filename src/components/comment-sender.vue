<template>
  <div class="comment-send ">
    <div class="textarea-container">
      <Input type="textarea" :rows="4" placeholder="请输入..." v-model="commentContent"></Input>
      <Button type="primary"style="margin-top: 10px" @click="commentVideo">发表评论</Button>
    </div>
    <!--<div class="comment-emoji"><i class="face"></i><span class="text">表情</span></div>-->
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'
  import VideoCommentApi from '@/api/videoComment-api'
  export default {
    name: "comment-sender",
    props:{
      videoId:{
        required:true
      }
    },
    data(){
      return{
        commentContent:''
      }
    },
    computed:{
      ...mapGetters(['user','isLogin'])
    },
    methods:{
      commentVideo(){
        if (!this.isLogin){
          this.$Message.warning('用户未登录')
          return;
        }

        let  comment = {
          commentContent:this.commentContent,
          videoId:this.videoId,
          commentUserId:this.user.userId
        }

        VideoCommentApi.commentVideo(comment).then((res)=>{
          if (res.code===200){
            this.$Message.success('评论成功')
            this.commentContent=''
            this.$emit('commentSuccess',res)
          }
        })
      }
    }
  }
</script>

<style scoped>
  .comment-send{
    margin: 20px auto;
  }
</style>

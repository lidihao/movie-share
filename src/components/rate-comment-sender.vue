<template>
  <div class="comment-send ">
    <div class="textarea-container">
      <Rate allow-half v-model="valueHalf"></Rate>
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
        valueHalf:0.0,
        commentContent:''
      }
    },
    computed:{
      ...mapGetters(['user'])
    },
    methods:{
      commentVideo(){
        if (this.valueHalf===0.0){
          this.$Message.warning('请给视频评分')
          return;
        }
        if (!this.user){
          this.$Message.warning('用户未登录')
          return;
        }

        let  comment = {
          commentContent:this.commentContent,
          videoId:this.videoId,
          commentUserId:this.user.userId,
          rate:this.valueHalf
        }

        VideoCommentApi.rateVideo(comment).then((res)=>{
          if (res.code===200){
            this.$Message.success('评论成功')
            this.valueHalf=0.0
            this.commentContent=''
            this.$emit('commentSuccess',res)
          }else {
            this.$Message.error(res.message)
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

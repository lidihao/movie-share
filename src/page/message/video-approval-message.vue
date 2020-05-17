<template>
  <div class="main">
    <div>
      您上传的
      <a @click="handleEdit">{{videoApply.title}}</a>
      {{message.systemMessageContent}}
      <span style="float: right">{{message.createdTime}}</span>
    </div>
  </div>
</template>

<script>
  import VideoApplyApi from '@/api/video-apply'
    export default {
      name: "video-approval-message",
      props:{
        message:{
          required:true
        }
      },
      data(){
        return{
          params:{},
          videoApply:{}
        }
      },
      methods:{
        getVideoApplyDetail(){
          VideoApplyApi.getVideoApplyDetail(this.params.videoApprovalId).then((res)=>{
            if (res.code===200){
              this.videoApply=res.result
            }
          })
        },
        handleEdit(){
          this.$router.push({
            path:'/video/edit-detail',
            query:{
              videoApprovalId:this.videoApply.videoApprovalId
            }})
        },
      },
      created() {
        this.params=JSON.parse(this.message.systemMessageParams)
        this.getVideoApplyDetail()
      }
    }
</script>

<style scoped>
  .main{
    background-color: #fff;
    box-shadow: 0 2px 4px 0 rgba(121,146,185,0.54);
    font-size: 15px;
    color: #666;
    border-radius: 4px;
    padding: 20px 20px;
  }
</style>

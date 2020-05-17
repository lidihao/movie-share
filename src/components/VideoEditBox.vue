<template>
  <div class="video-box-main">
    <div class="img-style">
      <img :src="posterUrl" alt="">
      <div class="img-cover">
        <Icon type="md-arrow-dropright-circle" size="45" @click="handleVideoPlay"/>
      </div>
    </div>
    <div class="movie-item-content">
      <h2 class="video-title">{{videoApply.title}}</h2>
      <div class="uper">
        <Icon type="ios-people" size="20"></Icon>
        <span>上传者:</span>
        <a><strong>{{videoApply.userVo.userName}}</strong></a>
      </div>
      <div>
        <strong>上传时间:{{videoApply.createdTime}}</strong>
      </div>
      <div class="apply-type">
        <strong>审批状态:{{convert(videoApply.approvalType)}}</strong>
      </div>
      <div class="apply">
        <Button type="primary" @click="handleEdit">编辑</Button>
        <Button type="warning" @click="handleDelete">删除</Button>
      </div>
      <div></div>
    </div>
  </div>
</template>

<script>
  import Config from '@/settings'
  import VideoApply from '@/api/video-apply'
    export default {
      name: "VideoEditBox",
      props:{
        videoApply:{
          required:true
        }
      },
      computed:{
        posterUrl(){
          return Config.server+this.videoApply.posterUrl;
        }
      },
      methods:{
        convert(approvalType){
          switch (approvalType) {
            case 0:return '审批中';
            case 1:return '审批通过';
            case 2:return '审批不通过';
          }
        },
        handleEdit(){
          this.$router.push({
            path:'/video/edit-detail',
            query:{
              videoApprovalId:this.videoApply.videoApprovalId
            }})
        },
        handleVideoPlay(){
          this.$router.push({
            path:'/video/videoPlay',
            query:{
              videoId:this.videoApply.videoId
            }
          })
        },
        handleDelete(){
          let params = {
            videoApprovalId:this.videoApply.videoApprovalId
          }
          console.log(params)
          VideoApply.deleteVideoApply(params).then((res)=>{
            if (res.code===200) {
              this.$Message.success("成功")
              this.$emit("refresh")
            }
          })
        }
      }
    }
</script>

<style scoped>
  .img-style{
    max-width: 160px;
    height: 100px;
    position: relative;
    float: left;
    margin-right: 20px;
  }
  .img-style img{
    width: 100%;
    height: 100%;
    border-radius: 20px;
  }
  .img-cover{
    display: none;
    position: absolute;
    bottom: 27px;
    left: 55px;
  }
  .img-style:hover .img-cover{
    display: block;
  }
  .img-style:hover img{
    transform: scale(1.1);
  }

  .img-style:hover i{
    color: #fff;
    font-size: 20px;
    cursor: pointer;
    margin: 0 2px;
  }

  .movie-item-content{
    min-width: 600px;
    margin-left: 200px;
    position: relative;
  }
  .video-box-main{
    min-height: 150px;
    padding: 30px;
    box-shadow: 1px 1px 10px;
  }
  .uper{
    margin-top: 20px;
    margin-bottom: 20px;
  }

  .video-title{
    cursor: pointer;
  }
  .video-title:hover{
    color: #57A3F3;
    transform: scaleZ(1.1);
  }

  .apply{
    position: absolute;
    right: 50px;
    top: 40px;
  }
  .apply-type{
    margin: 10px 0px;
  }
</style>

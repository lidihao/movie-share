<template>
  <div class="user-info">
    <div class="info-content">
      <Card>
        <h2 slot="title">个人信息</h2>
        <ul class="info-list">
          <div slot="title">
            <Upload action="" :before-upload="handleBeforeUpload">
              <img :src="avatarUrl" class="avatar">
            </Upload>
          </div>
          <li>
            <span>用户名</span>
            <span class="user-right">{{this.user.userName}}</span>
          </li>
          <li>
            <span>邮箱</span>
            <span class="user-right">{{this.user.email}}</span>
          </li>
          <li>
            <span>安全设置</span>
            <span class="user-right">
              <a>修改密码</a>
              <a>修改邮箱</a>
            </span>
          </li>
        </ul>
      </Card>
    </div>
    <Cropper :showCropper="showCropper" :imgSrc="imgSrc"  @uploadSuccess="uploadSuccess" @cancel="cancel" ></Cropper>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'
  import Config from '@/settings'
  import Cropper from '@/components/cropper'
  import LoginApi from '@/api/login'

    export default {
      name: "user-info",
      data(){
        return{
          showCropper:false,
          imgSrc:'',
          avatarUrl:''
        }
      },
      computed:{
        ...mapGetters(['user'])
      },
      components:{
        Cropper
      },
      methods:{
        cancel(){
          this.showCropper=false
        },
        uploadSuccess(pic){
          this.showCropper=false
          let data={
            userId:this.user.userId,
            pictureId:pic.pictureId
          }
          this.avatarUrl=Config.server+pic.url
          LoginApi.updateAvatarUrl(data).then((res)=>{
            if (res.code===200){

            }
          })
        },
        getObjectURL(file) {
          let  url = null;
          if (window.createObjectURL !== undefined) { // basic
            url = window.createObjectURL(file);
          } else if (window.URL !== undefined) { // mozilla(firefox)
            url = window.URL.createObjectURL(file);
          } else if (window.webkitURL !== undefined) { // webkit or chrome
            url = window.webkitURL.createObjectURL(file);
          }
          return url;
        },
        handleBeforeUpload(file) {
          const isImg = file.type === 'image/jpg' || file.type === 'image/jpeg' || file.type === 'image/png';
          if (!isImg) {
            this.$Message.warning("图片格式错误");
            return false;
          }
          this.showCropper=true
          this.imgSrc=this.getObjectURL(file)
          return false
        }
      },
      created() {
        this.avatarUrl=Config.server+this.user.avatarUrl
      }
    }
</script>

<style scoped>
  .user-info{
    display: flex;
  }
  .info-list{
    padding-left: 0;
    list-style: none;
  }
  .info-content{
    margin-right: 10px;
    width: 230px;
  }
  .avatar{
    width: 100px;
    height: 100px;
    border-radius: 50px;
    margin-left: 30px;
  }
  .info-list li {
    border-bottom: 1px solid #f0f3f4;
    padding: 11px 0;
    font-size: 13px;
  }
  .user-right{
    float: right;
    margin-right: 5px;
  }
</style>

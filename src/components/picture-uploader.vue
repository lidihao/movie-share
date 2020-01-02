<template>
    <div>
      <div class="img-upload-list" v-for="item in uploadList">
        <template v-if="item.status === 'finished'">
          <img :src="item.url" alt="">
          <div class="img-upload-list-cover">
            <Icon type="ios-eye-outline" @click="handleView(item.name)"></Icon>
            <Icon type="ios-trash-outline" @click="handleRemove(item)"></Icon>
          </div>
        </template>
        <template v-else>
          <Progress v-if="item.showProgress" :percent="item.percentage" hide-info></Progress>
        </template>
      </div>
      <Upload
        ref="upload"
        :show-upload-list="false"
        :headers="imgHeader"
        :data="imgData"
        :on-success="handleSuccess"
        :accept="'image/png,image/jpeg,image/jpg'"
        :format="['jpg','jpeg','png']"
        :max-size="2048"
        :on-format-error="handleFormatError"
        :on-exceeded-size="handleMaxSize"
        :before-upload="handleBeforeUpload"
        type="drag"
        action="//localhost:8089/picUpload"
        style="display: inline-block;width:200px;" v-if="showUpload">
        <div class="img-uploader">
          <Icon type="ios-camera" size="40"></Icon>
        </div>
      </Upload>
      <Modal :title="viewPicTitle" v-model="visible">
        <img :src="picUrl" v-if="visible" style="width: 100%" alt="">
      </Modal>
    </div>
</template>

<script>
  import {getToken} from '@/utils/auth'
  export default {
    name: "picture-uploader",
    data(){
      return{
        visible: false,
        viewPicTitle:'',
        picUrl:'',
        uploadList:[],
        showUpload:true,
        imgData:{
        },
        imgHeader:{
          Authorization:getToken()
        },
      }
    },
    methods:{
      //图片上传
      handleView (name) {
        let picList = this.uploadList
        for (let i=0;i<picList.length;i++){
          if (picList[i].name===name){
            this.viewPicTitle=name
            this.visible=true
            this.picUrl=picList[i].url
          }
        }
      },
      handleRemove (file) {
        // 从 upload 实例删除数据
        const fileList = this.uploadList
        this.uploadList.splice(fileList.indexOf(file), 1);
        this.showUpload=true
      },
      handleSuccess (res, file) {
        let data= res.result
        let img = {
          name:data.fileName,
          url:"//localhost:8089"+data.url,
          status:'finished'
        }
        this.uploadList.push(img)
        this.showUpload=false
        this.$emit('picUploadSuccess',data)
      },
      handleFormatError (file) {
        this.$Notice.warning({
          title: '文件格式不正确',
          desc: '文件 ' + file.name + ' 格式不正确，请上传 jpg 或 png 格式的图片。'
        });
      },
      handleMaxSize (file) {
        this.$Notice.warning({
          title: '超出文件大小限制',
          desc: '文件 ' + file.name + ' 太大，不能超过 2M。'
        });
      },
      handleBeforeUpload (file) {
        const isImg = file.type === 'image/jpg' || file.type  === 'image/jpeg' || file.type === 'image/png';
        if(!isImg){
          this.$Notice.warning("图片格式错误");
          return false;
        }
        const check = this.uploadList.length < 5;
        if (!check) {
          this.$Notice.warning({
            title: '最多只能上传 1 张图片。'
          });
          return false;
        }else{
          return new Promise(function(resolve, reject) {
            //判断图片的尺寸（做这一块需要了解FileReader  、Image 这两个对象）
            let fileReader  = new FileReader();
            let width = 0;
            let height = 0;
            fileReader.onload = (e)=>{
              let imgData = e.target.result;//获取图片的文件流
              //通过Image 对象去加载图片
              let image = new Image();
              image.onload = ()=>{
                width = image.width;
                height = image.height;
                let imgData = {
                  size: file.size,
                  width: width,
                  height: height,
                  fileName: file.name
                }
                resolve(imgData)
              }
              image.src=imgData
            }
            fileReader.readAsDataURL(file);
          }).then((res)=>{
            this.imgData=res
          });
        }
      }
    }
  }
</script>

<style scoped>
  .img-upload-list{
    display: inline-block;
    width: 200px;
    height: 100px;
    text-align: center;
    line-height: 100px;
    border: 1px solid transparent;
    border-radius: 4px;
    overflow: hidden;
    background: #fff;
    position: relative;
    box-shadow: 0 1px 1px rgba(0,0,0,.2);
    margin-right: 4px;
  }
  .img-upload-list img{
    width: 100%;
    height: 100%;
  }
  .img-uploader{
    width:200px;
    height: 100px;
    line-height: 100px;
  }
  .img-upload-list-cover{
    display: none;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: rgba(0,0,0,.6);
  }
  .img-upload-list:hover .img-upload-list-cover{
    display: block;
  }
  .img-upload-list-cover i{
    color: #fff;
    font-size: 20px;
    cursor: pointer;
    margin: 0 2px;
  }

  .base-info-form{
    width: 50%;
    padding-bottom: 10px;
    padding-top: 40px;
  }
</style>

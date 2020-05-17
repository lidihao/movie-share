<template>
  <div class="uploader-main" v-if="show">
    <div class="uploader-content">
      <h2 class="uploader-header">上传文件</h2>
      <uploader :options="options" class="uploader-example"
                @file-added="handleVideoFileAdd"
                @file-progress="onVideoFileProgress"
                @file-success="onVideoFileSuccess"
      >
        <uploader-unsupport></uploader-unsupport>
        <uploader-drop>
          <p><strong>拖拽文件到此或者</strong></p>
          <uploader-btn class="uploader-btn" :attrs="attrs">
            选择文件
          </uploader-btn>
        </uploader-drop>
        <uploader-list class="uploader-list" ref="videoFileList"></uploader-list>
      </uploader>
    </div>
    <div class="video-base-info">
      <h2>基本信息</h2>
      <!--图片上传div-->
      <div class="base-info-item">
        <h3 class="item-header">上传封面图片</h3>
        <PictureUpload @picUploadSuccess="picUploadSuccess" ref="picUpload"></PictureUpload>
      </div>
    </div>
    <!--其他信息-->
    <div class="base-info-item">
      <div class="base-info-form">
        <Form :model="formData" label-position="top" ref="formData" :rules="ruleValidate">
          <Form-item label="视频分类" prop="category">
            <i-select v-model="formData.category" style="width:260px">
              <i-option v-for="item in categoryList" :value="item.categoryId" :key="item.categoryId">{{ item.categoryName }}</i-option>
            </i-select>
          </Form-item>
          <Form-item label="视频标题" prop="title">
            <label>
              <Input v-model="formData.title"></Input>
            </label>
          </Form-item>
          <Form-item label="视频标签" prop="tagList">
            <i-select v-model="formData.tagList" multiple style="width:260px" filterable>
              <i-option v-for="item in tagList" :value="item.tagId" :key="item.tagId">{{ item.tagName }}</i-option>
            </i-select>
          </Form-item>
          <Form-item label="简介" prop="introduce">
            <label>
              <Input v-model="formData.introduce" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="简介信息"></Input>
            </label>
          </Form-item>
          <Form-item>
            <Button type="primary" @click="handleSubmit('formData')">提交</Button>
            <Button type="warning" style="margin-left: 8px" @click="handleReset('formData')">重置</Button>
          </Form-item>
        </Form>
      </div>
    </div>
  </div>
</template>

<script>
  import {getToken} from '@/utils/auth'
  import VideoUpload from '@/api/videoUpload'
  import PictureUpload from '@/components/picture-uploader'
  import TagApi from '@/api/tag'
  import CategoryApi from '@/api/category'
  import Config from '@/settings'

  export default {
    name: "upload-item",
    components:{
      PictureUpload
    },
    data () {
      return {
        data:[],
        show:true,
        //pic
        postPic:{},
        //video
        videoFileList:[],
        //视频上传组件的
        options:{
          //上传url
          target:function (file,uploader,isTest) {
            if (isTest){
              return Config.server+'/videoUpload/checkUploadChunk'
            }else{
              return Config.server+'/videoUpload/uploadChunk'
            }
          },
          testChunks:true,
          headers:{
            Authorization:getToken()
          },
          checkChunkUploadedByResponse: function (chunk, message) {
            let objMessage = JSON.parse(message);
            let tmp =  (objMessage.result || []).indexOf(chunk.offset+1) >= 0
            console.log(tmp)
            return tmp
          }
        },
        attrs: {
          accept: ['.mp4','.flv']
        },
        formData: {
          category: '',
          title: '',
          tagList: [],
          introduce:''
        },
        ruleValidate: {
          category: [
            { required:true,message:'类型不能为空'}
          ],
          title: [
            { required: true, message: '视频题目不能为空', trigger: 'blur' }
          ],
          introduce: [
            { required: true, message: '简介不能为空', trigger: 'blur' }
          ]
        },
        categoryList: [],
        tagList:[]
      }
    },
    computed: {
    },
    methods: {
      //视频上传
      onVideoFileProgress(rootFile, file, chunk) {
        console.log(`上传中 ${file.name}，chunk：${chunk.startByte / 1024 / 1024} ~ ${chunk.endByte / 1024 / 1024}`)
      },
      handleVideoFileAdd(res){
        console.log(res)
      },
      onVideoFileSuccess(rootFile, file, response, chunk) {
        let videoFile = {
          uniqueIdentifier:file.uniqueIdentifier,
          fileType:file.fileType,
          fileName:file.name,
          size:file.size
        }
        let resp = JSON.parse(response)
        if(resp.code === 200){
          VideoUpload.mergeVideoFile(videoFile)
              .then((res)=>{
                if (res.code===200){
                  this.videoFileList.push({videoFileId:res.result.videoFileId,id:file.id})
                }else{
                  this.$Message.error("合并文件出错")
                }
              })
              .catch((error)=>{
                this.$Message.error("合并文件出错")
          })
        }else{
          this.$Message.error("上传出错")
        }
      },
      picUploadSuccess(pic){
        console.log(pic)
        this.postPic=pic
      },
      getAllCategory(){
        CategoryApi.getAllCategory().then((res)=>{
          if (res.code===200){
            this.categoryList=res.result
          }
        })
      },
      getAllTag(){
        TagApi.getAllTag().then((res)=>{
          if (res.code===200){
            this.tagList=res.result
          }
        })
      },
      handleSubmit(name){
        if (this.videoFileList.length===0||!this.postPic){
          this.$Message.warning("没有上传视频或者封面图片")
          return
        }
        this.$refs[name].validate((valid) => {
          if (valid) {
            let videoFileIds=[]
            let sortVideoFileList = this.$refs.videoFileList.fileList
            let successFileList = this.videoFileList;
            if (successFileList.length!==sortVideoFileList.length){
              this.$Message.warning("视频还没有上传完")
              return
            }
            for(let i=0;i<sortVideoFileList.length;i++){
              for (let j=0;j<successFileList.length;j++){
                if (successFileList[j].id===sortVideoFileList[i].id){
                  videoFileIds.push(successFileList[j].videoFileId)
                }
              }
            }
            let videoMeta={
              title:this.formData.title,
              introduce:this.formData.introduce,
              categoryId:this.formData.category,
              tagList:this.formData.tagList,
              videoFileId:videoFileIds,
              pictureId:this.postPic.pictureId
            }
            VideoUpload.addVideoMeta(videoMeta).then((res)=>{
              if (res.code===200) {
                this.$Message.success('提交成功!')
                location.reload()
              }else {
                this.$Message.error(res.message)
              }
            })
          } else {
            this.$Message.error('请完善信息');
          }
        })
      },
      handleReset(name){
        this.$refs[name].resetFields();
      }
    },
    created() {
      this.getAllCategory()
      this.getAllTag()
    }
  }
</script>

<style scoped>
  /* 上传视频csss*/
  .uploader-main{
    margin: auto auto;
  }
  .uploader-main .uploader-content{

  }
  .uploader-content .uploader-header{
    margin-top: 20px;
    text-align: center;
  }
  .uploader-example {
    width: 880px;
    margin: 40px auto 0;
    font-size: 15px;
  }
  .uploader-example .uploader-btn {
    display: inline-block;
    margin-bottom: 0;
    margin-top: 5px;
    font-weight: 400;
    text-align: center;
    vertical-align: middle;
    touch-action: manipulation;
    cursor: pointer;
    background-image: none;
    border: 1px solid transparent;
    white-space: nowrap;
    line-height: 1.5;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    padding: 5px 15px 6px;
    font-size: 12px;
    border-radius: 4px;
    transition: color .2s linear,background-color .2s linear,border .2s linear,box-shadow .2s linear;
    color: white;
    background-color: #57A3F3;
  }

  uploader-example .uploader-list {
    max-height: 440px;
    overflow: auto;
    overflow-x: hidden;
    overflow-y: auto;
  }

  /* 上传csss*/
  .video-base-info{
    margin: 40px auto 0px;
    border-top-style: outset;
    border-top-color: #57A3F3;
  }

  .video-base-info h2{
    text-align: center;
    margin: 30px auto 30px;
  }
  .base-info-item{
    width: 880px;
    margin: 40px auto 0;
    padding-left: 10px;
    padding-top: 30px;
    padding-bottom: 30px;
  }
  .base-info-item .item-header{
    padding-top: 20px;
    padding-bottom: 20px;
  }

</style>

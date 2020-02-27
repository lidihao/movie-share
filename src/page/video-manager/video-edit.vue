<template>
  <div>
    <div>
      <Button @click="back">返回</Button>
    </div>
    <div>
      <div class="uploader-content">
        <h2>上传文件</h2>
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
    </div>
    <div class="apply-detail">
      <h2>视频列表</h2>
      <div class="apply-video-content">
        <Divider></Divider>
        <div class="video-list">
          <div class="video-item" v-for="item in videoFileList">
            <ApplyDetail :item="item"/>
            <Button type="warning" @click="deleteVideoFile(item)" v-if="!isBeingDelete(item)">删除</Button>
            <Button type="error" @click="undeleteVideoFile(item)" v-if="isBeingDelete(item)">取消删除</Button>
          </div>
          <div class="page">
            <Page :total="totalVideoFile" @on-change="handlePageNumChange" @on-page-size-change="handlePageSizeChange"/>
          </div>
        </div>
      </div>
    </div>
    <div class="video-base-info">
      <h2></h2>
      <!--图片上传div-->
      <div class="base-info-item">
        <h2 class="item-header">封面图片</h2>
        <PictureUpload @picUploadSuccess="picUploadSuccess" ref="picUpload"></PictureUpload>
      </div>
    </div>
    <div class="video-meta">
      <h2>基本信息</h2>
      <Divider></Divider>
      <Form :model="formData" label-position="top" ref="formData">
        <Form-item label="视频分类" prop="category">
          <i-select v-model="formData.category" style="width:260px" :disabled="true">
            <i-option v-for="item in categoryList" :value="item.categoryId" :key="item.categoryId">{{ item.categoryName }}</i-option>
          </i-select>
        </Form-item>
        <Form-item label="视频标题" prop="title">
          <label>
            <Input v-model="formData.title"></Input>
          </label>
        </Form-item>
        <Form-item label="视频标签" prop="tagList">
          <i-select v-model="formData.tagList" multiple style="width:260px" :disabled="true">
            <i-option v-for="item in tagList" :value="item.tagId" :key="item.tagId">{{ item.tagName }}</i-option>
          </i-select>
        </Form-item>
        <Form-item label="简介" prop="introduce">
          <label>
            <Input v-model="formData.introduce" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="简介信息"></Input>
          </label>
        </Form-item>
      </Form>
      <Input v-model="remark" type="textarea" placeholder="审核意见" style="margin-bottom: 50px" :disabled="true"/>
      <Button type="primary" @click="handleUpdate">提交</Button>
    </div>
  </div>
</template>

<script>
    import ApplyDetail from '@/components/apply-detail-box'
    import CategoryApi from '@/api/category'
    import VideoApplyApi from '@/api/video-apply'
    import TagApi from '@/api/tag'
    import PictureUpload from '@/components/picture-uploader'
    import VideoUpload from '@/api/videoUpload'
    import {getToken} from '@/utils/auth'

    export default {
      name: "video-edit",
      components:{ApplyDetail,PictureUpload},
      data(){
        return{
          deleteVideoFileList:[],
          videoFileList:[],
          //new upload
          videoUploadFileList:[],
          totalVideoFile:-1,
          videoApprovalId:-1,
          curPageNum:1,
          curPageSize:10,
          remark:'',
          categoryList:[],
          tagList:[],
          formData: {
            category: '',
            title: '',
            tagList: [],
            introduce:''
          },
          picUrl:'',
          picData:{},
          //视频上传组件的
          options:{
            //上传url
            target:function (file,uploader,isTest) {
              if (isTest){
                return 'http://localhost:8089/videoUpload/checkUploadChunk'
              }else{
                return 'http://localhost:8089/videoUpload/uploadChunk'
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
            accept: ['.mp4', '.rmvb', '.mkv', '.wmv', '.flv']
          }
        }
      },
      methods:{
        back(){
          this.$router.back()
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
        getVideoFileDetail(){
          let params = {
            videoApprovalId:this.videoApprovalId,
            pageNum: this.curPageNum,
            pageSize:this.curPageSize
          }
          VideoApplyApi.listVideoFileDetail(params).then((res)=>{
            if (res.code===200){
              let data = res.result
              this.totalVideoFile=data.pageInfo.total
              this.videoFileList=data.result
            }
          })
        },
        picUploadSuccess(pic){
          this.picData=pic
        },
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
                  this.videoUploadFileList.push({videoFileId:res.result.videoFileId,id:file.id})
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
        handlePageSizeChange(size){
          this.curPageSize=size
          this.getVideoFileDetail()
        },
        handlePageNumChange(num){
          this.curPageNum=num
          this.getVideoFileDetail()
        },
        getVideoApplyVo(){
          VideoApplyApi.getVideoApplyDetail(this.videoApprovalId).then((res)=>{
            if(res.code===200){
              let data = res.result
              this.formData.category=data.categoryId
              this.formData.title=data.title
              this.formData.introduce=data.introduce
              this.formData.tagList=data.tagIdList
              this.picUrl='//localhost:8089'+data.posterUrl
              this.remark=data.remark
              let picComponent=this.$refs.picUpload
              picComponent.uploadList=[{
                name:"picture",
                url:this.picUrl,
                status:'finished'
              }]
              picComponent.showUpload=false
            }
          })
        },
        init(){
          this.videoApprovalId=this.$route.query.videoApprovalId
        },
        deleteVideoFile(item){
          console.log(item)
          this.deleteVideoFileList.push(item.videoFileId)
          console.log(this.deleteVideoFileList)
        },
        isBeingDelete(item){
          let paddingList=this.deleteVideoFileList;
          for (let i=0;i<paddingList.length;i++){
            if (paddingList[i]===item.videoFileId){
              return true;
            }
          }
          return false;
        },
        undeleteVideoFile(item){
          this.deleteVideoFileList.splice(this.deleteVideoFileList.indexOf(item.videoFileId),1)
        },
        handleUpdate(){

          let videoFileIds=[]
          let sortVideoFileList = this.$refs.videoFileList.fileList
          let successFileList = this.videoUploadFileList;
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
          let videoUpdateDate={
            videoApprovalId:this.videoApprovalId,
            pictureId:this.picData.pictureId,
            title:this.formData.title,
            introduce:this.formData.introduce,
            appendVideoFile:videoFileIds,
            deleteVideoFile:this.deleteVideoFileList
          }
          VideoApplyApi.updateVideoApply(videoUpdateDate).then((res)=>{
            if (res.code===200) {
              this.$Message.success('提交成功!')
              location.reload()
            }else {
              this.$Message.error(res.message)
            }
          })
        }
      },
      created() {
        this.init()
        this.getVideoFileDetail()
        this.getVideoApplyVo()
        this.getAllCategory()
        this.getAllTag()
      }
    }
</script>

<style scoped>
  .uploader-content{
    padding: 20px;
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
  .apply-detail{
    padding: 20px 20px;
  }
  .video-item{
    display: inline-block;
    padding: 30px;
  }
  .video-meta{
    padding: 30px;
  }
  .base-info-item{
    padding: 30px;
  }
</style>

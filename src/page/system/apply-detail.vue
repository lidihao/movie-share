<template>
    <div class="apply-detail">
      <Button @click="back">返回</Button>
      <h1 class="title">审批详情</h1>
      <div class="apply-video">
        <div>
          <h2>视频列表</h2>
          <div class="apply-video-content">
            <Divider></Divider>
            <div class="video-list">
              <div>
                <ApplyDetail class="video-item" v-for="item in videoFileList" :item="item"/>
              </div>
              <div class="page">
                <Page :total="totalVideoFile" @on-change="handlePageNumChange" @on-page-size-change="handlePageSizeChange"/>
              </div>
            </div>
          </div>
        </div>
        <div class="upload-img-main">
          <h2>上传的图片</h2>
          <Divider></Divider>
          <div class="upload-img">
            <img :src="picUrl" alt="">
            <div class="img-upload-cover">
              <Icon type="ios-eye-outline" @click="handleView" size="30"></Icon>
            </div>
          </div>
          <Modal :title="viewPicTitle" v-model="visible">
            <img :src="picUrl" v-if="visible" style="width: 100%" alt="">
          </Modal>
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
                <Input v-model="formData.title" :disabled="true"></Input>
              </label>
            </Form-item>
            <Form-item label="视频标签" prop="tagList">
              <i-select v-model="formData.tagList" multiple style="width:260px" :disabled="true">
                <i-option v-for="item in tagList" :value="item.tagId" :key="item.tagId">{{ item.tagName }}</i-option>
              </i-select>
            </Form-item>
            <Form-item label="简介" prop="introduce">
              <label>
                <Input v-model="formData.introduce" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="简介信息" :disabled="true"></Input>
              </label>
            </Form-item>
          </Form>
          <Input v-model="remark" type="textarea" placeholder="审核意见" style="margin-bottom: 50px"/>
          <Button type="primary" @click="handlePass">通过</Button>
          <Button type="warning" @click="handleReject">拒绝</Button>
        </div>
      </div>
    </div>
</template>

<script>
  import ApplyDetail from '@/components/apply-detail-box'
  import TagApi from '@/api/tag'
  import CategoryApi from '@/api/category'
  import VideoApplyApi from '@/api/video-apply'

  export default {
    name: "apply-detail",
    components:{ApplyDetail},
    data(){
      return{
        viewPicTitle:'',
        visible:false,
        picUrl:'',
        totalVideoFile:0,
        videoApprovalId:-1,
        categoryList:[],
        tagList:[],
        curPageSize:9,
        curPageNum:1,
        remark:'',
        formData: {
          category: '',
          title: '',
          tagList: [],
          introduce:''
        },
        videoFileList:[]
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
      getVideoApplyVo(){
        VideoApplyApi.getVideoApplyDetail(this.videoApprovalId).then((res)=>{
          if(res.code===200){
            let data = res.result
            this.formData.category=data.categoryId
            this.formData.title=data.title
            this.formData.introduce=data.introduce
            this.formData.tagList=data.tagIdList
            this.picUrl='//localhost:8089'+data.posterUrl
          }
        })
      },
      handleView () {
        this.visible=true
      },
      init(){
        this.videoApprovalId=this.$route.query.videoApprovalId
      },
      handlePageSizeChange(size){
        this.curPageSize=size
        this.getVideoFileDetail()
      },
      handlePageNumChange(num){
        this.curPageNum=num
        this.getVideoFileDetail()
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
      handlePass(){
        let params={
          videoApprovalId:this.videoApprovalId,
          applystatus:1,
          remark:this.remark
        }
        VideoApplyApi.doApplyVideo(params).then((res)=>{
          if (res.code===200){
            this.$Message.success("success")
          }else{
            this.$Message.error(res.message)
          }
        })
      },
      handleReject(){
        let params={
          videoApprovalId:this.videoApprovalId,
          applystatus:2,
          remark:this.remark
        }
        VideoApplyApi.doApplyVideo(params).then((res)=>{
          if (res.code===200){
            this.$Message.success("success")
          }else{
            this.$Message.error(res.message)
          }
        })
      }
    },
    created() {
      this.init()
      this.getAllCategory()
      this.getAllTag()
      this.getVideoApplyVo()
      this.getVideoFileDetail()
    }
  }
</script>

<style scoped>
  .title{
    text-align: center;
    word-break: break-all;
  }
  .apply-detail{
    padding: 20px 20px;
  }
  .apply-video{
    padding: 20px 100px;
  }
  .video-list{
    padding: 10px 30px;
  }
  .video-item{
    display: inline-block;
    padding: 30px;
  }
  .page{
    margin-top: 20px;
  }

  .upload-img{
    max-width: 160px;
    height: 100px;
    position: relative;
    margin-right: 20px;
  }
  .upload-img img{
    width: 100%;
    height: 100%;
  }
  .upload-img-main{
    margin: 30px 0;
  }
  .img-upload-cover{
    display: none;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: rgba(0,0,0,.6);
  }
  .upload-img:hover .img-upload-cover{
    display: block;
  }
  .img-upload-cover i{
    color: #fff;
    font-size: 20px;
    cursor: pointer;
    margin: 0 2px;
  }
  .video-meta{
    margin: 30px 0;
  }
</style>

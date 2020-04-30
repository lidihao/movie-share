<template>
  <div class="publish-video-main">
    <div class="category-detail-tags">
      <h1 style="margin-bottom: 20px">热门标签</h1>
      <div>

          <Badge :count="item.count"  v-for="(item,idx) in hotTags" style="margin-right: 20px">
            <Tag :color="colorArr[idx]" @click.native="clickTag(idx,item)">{{item.tag}}</Tag>
          </Badge>
          
      </div>
    </div>
    <div class="search">
      <Select v-model="orderField" @on-change="getUploadVideoList">
        <Option value="default" key="default">综合排序排序</Option>
        <Option value="rate" key="rate">按照评分排序</Option>
        <Option value="playCount" key="playCount">按照播放数排序</Option>
        <Option value="time" key="time">按照时间排序</Option>
      </Select>
    </div>
    <div class="grid-content">
      <div class="video-item" v-for="item in videoList">
        <VideoBox :video="item"></VideoBox>
      </div>
      <div class="page">
        <Page :total="total" show-total></Page>
      </div>
    </div>
  </div>
</template>

<script>
  import VideoBox from "@/components/VideoBox";
  import VideoApi from '@/api/video-api'
  export default {
    name: "category-video-grid",
    props:{
      categoryName:{
        required:true
      }
    },
    watch:{
      categoryName(){
        this.orderField='default'
        this.tagName=''
        this.getUploadVideoList()
      }
    },
    data(){
      return{
        orderField:'default',
        total:0,
        curPageNum:1,
        curPageSize:10,
        videoList:[],
        hotTags:[],
        colorArr:[],
        tagName:''
      }
    },
    components:{
      VideoBox
    },
    methods:{
      getUploadVideoList(){
        let condition={
          categoryName:this.categoryName,
          pageNum:this.curPageNum,
          pageSize:this.curPageSize,
          orderField:this.orderField,
          tagName:this.tagName
        }
        VideoApi.getVideoByCategory(condition).then((res)=>{
          if (res.code===200){
            let data = res.result.videoList
            this.total = data.pageInfo.total
            this.videoList=data.result
            if (this.tagName==='') {
              let tags = res.result.aggregateMap
              this.hotTags=tags.slice(0,20)
              this.colorArr=this.createClass()
            }
          }
        })
      },
      createClass(){
        let arr=[]
        if (this.hotTags){
          for (let i=0;i<this.hotTags.length;i++){
            arr.push('#657180')
          }
        }
        return arr
      },
      clickTag(indx,item){
        let color = this.colorArr[indx]
        for(let i=0;i<this.colorArr.length;i++){
          this.colorArr[i]='#657180'
        }
        if (color==='red') {
          this.tagName=''
          this.$set(this.colorArr, indx, '#657180')
        }else{
          this.tagName=item.tag
          this.$set(this.colorArr, indx, 'red')
        }
        this.getUploadVideoList()
      }
    },
    created() {
      this.getUploadVideoList()
    }
  }
</script>

<style scoped>
  .video-item{
    margin: 10px;
    display: inline-block;
    overflow: hidden;
    width: 300px;
  }
  .search{
    margin-left: 10px;
    width: 20%;
  }
  .grid-content{
    margin: 30px auto;
  }
  .page{
    margin-left: 15px;
  }
  .category-detail-tags{
    margin: 20px;
  }
</style>

<template>
  <div class="publish-video-main">
    <div class="category-detail-tags">
      <h1 style="margin-bottom: 20px">标签筛选</h1>
      <div>
          <Badge :count="item.count"  v-for="(item,idx) in hotTags" style="margin-left: 20px">
            <Tag :color="colorArr[idx]" @click.native="clickTag(idx,item)">{{item.tag}}</Tag>
          </Badge>
      </div>
    </div>
    <div class="search">
      <Select v-model="orderField" @on-change="getUploadVideoList" class="select">
        <Option value="default" key="default">综合排序排序</Option>
        <Option value="rate" key="rate">按照评分排序</Option>
        <Option value="playCount" key="playCount">按照播放数排序</Option>
        <Option value="time" key="time">按照时间排序</Option>
      </Select>

      <Select clearable v-model="categoryId" class="select" @on-change="getUploadVideoList">
        <Option v-for="item in categoryList" :value="item.categoryId" :key="item.categoryId">{{ item.categoryName }}</Option>
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
  import CategoryApi from '@/api/category';
  export default {
    name: "search-video-grid",
    props:{
      searchKey:{
        required:true
      }
    },
    watch:{
      searchKey(){
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
        curPageSize:12,
        videoList:[],
        categoryId:'',
        categoryList:[],
        hotTags:[],
        colorArr:[],
        tagName:''
      }
    },
    components:{
      VideoBox
    },
    methods:{
      getAllCategory(){
        CategoryApi.getAllCategory().then((res)=>{
          if (res.code===200){
            this.categoryList=res.result
          }
        })
      },
      getUploadVideoList(){
        let condition={
          searchKey:this.searchKey,
          pageNum:this.curPageNum,
          pageSize:this.curPageSize,
          orderField:this.orderField,
          categoryId:this.categoryId,
          tagName:this.tagName
        }
        VideoApi.searchVideo(condition).then((res)=>{
          if (res.code===200){
            console.log(res)
            let data = res.result.videoList
            this.total = data.pageInfo.total
            this.videoList=data.result
             if (this.tagName==='') {
              let tags = res.result.aggregateMap
              this.hotTags=tags
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
      this.getAllCategory()
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
    width: 40%;
    display: flex;
  }
  .select{
    margin: 10px;
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

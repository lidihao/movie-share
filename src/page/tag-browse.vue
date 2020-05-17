<template>
  <div>
    <div class="category-detail-title">
      <h1>视频标签</h1>
    </div>

    <div style="margin-right:20px">
       <Badge :count="item.count"  v-for="item in tagList" style="margin:10px" >
            <Tag @click.native="searVideo(item.tagName)">{{item.tagName}}</Tag>
          </Badge>
    </div>
  </div>
</template>

<script>
  import TagApi from '@/api/tag'
  export default {
    name: "tag-browse",
    data(){
      return{
        tagList:[]
      }
    },
    methods:{
      getTagCount(){
        TagApi.getTagCountList().then(res=>{
          if (res.code===200) {
            this.tagList=res.result
          }
        })
      },
      searVideo(tagName){
        this.$router.push({
          path:'/search',
          query:{
            key:tagName
          }
        })
      }
    },
    created() {
      this.getTagCount()
    }
  }
</script>

<style scoped>
  .category-detail-title{
    margin:20px;
    text-align: center;
  }
</style>

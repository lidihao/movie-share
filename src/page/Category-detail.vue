<template>
  <div>
    <div class="category-detail-title">
      <h1>类别1</h1>
    </div>
    <div class="category-detail-tags">
      <h1 style="margin-bottom: 20px">热门标签</h1>
      <div>
        <Tag v-for="item in 10">标签一</Tag>
      </div>
    </div>
    <div>
      <VideoGrid :hasSearch="false"></VideoGrid>
    </div>
  </div>
</template>

<script>
  import VideoGrid from '@/components/video/video-grid'
  export default {
    name: "Category-detail",
    components:{
      VideoGrid
    }
  }
</script>

<style scoped>
  .category-detail-title{
    margin:20px;
    text-align: center;
  }
  .category-detail-tags{
    margin: 20px;
  }
</style>

<template>
  <div>
    <div class="category-detail-title">
      <h1>{{type}}</h1>
    </div>
    <div class="category-detail-tags">
      <h1 style="margin-bottom: 20px">热门标签</h1>
      <div>
        <Tag v-for="item in 10">标签一</Tag>
      </div>
    </div>
      <CategoryVideoGrid :categoryName="type"></CategoryVideoGrid>
    <div>
    </div>
  </div>
</template>

<script>
  import CategoryVideoGrid from '@/page/category/category-video-grid'
  export default {
    name: "Category-detail",
    components:{
      CategoryVideoGrid
    },
    watch:{
      $route: {
        handler() {
          this.type=this.$route.query.type
        },
        deep: true,
      }
    },
    data(){
      return{
        type:''
      }
    },
    created() {
      this.type=this.$route.query.type
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

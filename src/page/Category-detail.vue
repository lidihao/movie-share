<template>
  <div>
    <div class="category-detail-title">
      <h1>{{type}}</h1>
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
</style>

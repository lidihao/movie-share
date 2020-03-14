<template>
    <div class="search-content">
      <Tabs value="name1">
        <TabPane label="视频" name="name1">
          <SearchVideoGrid :searchKey="key"></SearchVideoGrid>
        </TabPane>
        <TabPane label="用户" name="name2">
          <SearchUser :searchKey="key"></SearchUser>
        </TabPane>
      </Tabs>
    </div>
</template>

<script>
  import SearchVideoGrid from '@/page/search-video-grid'
  import SearchUser from '@/page/search-user'
    export default {
      name: "search",
      data(){
        return{
          key:''
        }
      },
      watch:{
        $route: {
          handler() {
            this.init()
          },
          deep: true,
        }
      },
      components: {SearchVideoGrid,SearchUser},
      methods:{
        init(){
          this.key = this.$route.query.key
        }
      },
      created() {
        this.init()
      }
    }
</script>

<style scoped>
  .search-content{
    width: 100%;
    padding-top: 30px;
  }
</style>

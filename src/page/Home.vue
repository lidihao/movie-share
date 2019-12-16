<template>
  <div style="overflow: auto">
    <VideoCategory></VideoCategory>
    <VideoCategory></VideoCategory>
    <VideoCategory></VideoCategory>
    <VideoCategory></VideoCategory>
    <VideoCategory></VideoCategory>
  </div>
</template>

<script>
  import VideoCategory from '../components/video-category'
  export default {
    name: 'Home',
    components:{VideoCategory}
  }
</script>
<style scoped>

</style>

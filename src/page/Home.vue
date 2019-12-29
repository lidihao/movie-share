<template>
  <div>
    <div class="home-content">
      <VideoCategory :id="gernerateId(index)" v-for="(val,index) in data" :key="index"></VideoCategory>
    </div>
    <div class="fix-side-bar">
        <div  @click.prevent="custormAnchor('box'+index)" v-for="(val,index) in data"
            :key="index" class="nav-button">
          <i-button type="text">
            <span style="color: black">类型</span>
          </i-button>
        </div>
    </div>
  </div>
</template>

<script>
  import VideoCategory from '../components/video-category'
  export default {
    name: 'Home',
    components:{VideoCategory},
    data(){
      return{
        data:[1,2,3,4,5]
      }
    },
    methods:{
      custormAnchor(anchorName) {
        // 找到锚点
        let anchorElement = document.getElementById(anchorName);
        // 如果对应id的锚点存在，就跳转到锚点
        if (anchorElement) {
          anchorElement.scrollIntoView();
        }
      },
      gernerateId(index) {
        return "box" + index;
      }
    }
  }
</script>
<style scoped>
  .home-content{
    overflow: auto;
    margin-right: 5;
  }
  .fix-side-bar{
    position: fixed;
    top: 50%;
    right: 1%;
    box-shadow: 1px 1px 10px;
    padding: 3px;
  }
  .nav-button{
    margin: 3px;
  }
</style>

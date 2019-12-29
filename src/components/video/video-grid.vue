<template>
  <div class="publish-video-main">
    <div class="search" v-if="hasSearch">
      <Row>
        <i-col span="5">
          <i-input class="search" placeholder="输入关键字搜索">
            <i-button slot="append" icon="ios-search"></i-button>
          </i-input>
        </i-col>
        <i-col span="5" offset="5">
          <i-select>
            <i-option v-for="item in cityList" :value="item.value">{{ item.label }}</i-option>
          </i-select>
        </i-col>
      </Row>
    </div>
    <div class="grid-content">
      <div class="video-item" v-for="item in count">
        <VideoBox></VideoBox>
      </div>
      <div class="page">
        <Page :total="100" show-total></Page>
      </div>
    </div>
  </div>
</template>

<script>
  import VideoBox from "../VideoBox";
  export default {
    name: "publish-video",
    props:{
      hasSearch:{
        default:true
      }
    },
    data(){
      return{
        count:12,
        cityList: [
          {
            value: '时间',
            label: '时间'
          },
          {
            value: '名字',
            label: '上海市'
          }]
      }
    },
    components:{
      VideoBox
    }
  }
</script>

<style scoped>
  .video-item{
    margin: 20px;
    display: inline-block;
    overflow: hidden;
    width: 300px;
  }
  .search{
    margin-left: 10px;
  }
  .grid-content{
    margin: 30px auto;
  }
  .page{
    margin-left: 15px;
  }
</style>

<template>
    <div class="item-content">
      <div class="img-style">
        <img :src="posterUrl" alt="">
        <div class="img-cover">
          <Icon type="md-arrow-dropright-circle" size="45" @click="playVideo"/>
        </div>
      </div>
      <div class="info">
        <p class="title">{{item.fileName}}</p>
        <span class="apply-status">审批结果：<strong>{{item.approvalType}}</strong></span>
      </div>
      <Modal
        v-model="visible"
        :title="item.fileName" width="700">
        <VideoPlay :url="item.url" v-if="visible" :poster="item.posterUrl"/>
      </Modal>
    </div>
</template>

<script>
  import VideoPlay from './video-play'
  import Config from '@/settings'
  export default {
    name: "apply-detail-box",
    components: {VideoPlay},
    data(){
      return{
        visible:false
      }
    },
    props:{
      item:{
        require: true
      }
    },
    computed:{
      posterUrl(){
        return Config.server+this.item.posterUrl
      }
    },
    methods:{
      playVideo(){
        this.visible=true
      }
    }
  }
</script>

<style scoped>

  .item-content{
    width: 250px;
  }

  .img-style{
    width: 160px;
    height: 100px;
    margin-right: 20px;
    position: relative;
  }
  .img-style img{
    width: 100%;
    height: 100%;
    border-radius: 20px;
  }
  .img-cover{
    display: none;
    position: absolute;
    bottom: 27px;
    left: 55px;
  }
  .img-style:hover .img-cover{
    display: block;
  }
  .img-style:hover img{
    transform: scale(1.1);
  }

  .img-style:hover i{
    color: #fff;
    font-size: 20px;
    cursor: pointer;
    margin: 0 2px;
  }

  .title{
    margin: 10px 0;
    padding-top: 10px;
    word-break: break-all;
    width: 160px;
    height: 70px;
  }
</style>

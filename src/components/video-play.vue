<template>
  <div id="mse"></div>
</template>

<script>
  import Player from 'xgplayer'
  import Config from '@/settings'
  export default {
    name: "video-play",
    data() {
      return {
        player:{}
      };
    },
    props:{
      url:{
        required:true
      },
      poster:{
        required:true
      },
      nextPlayList:{
        required:false
      }
    },
    mounted() {
      this.initVideo();
    },
    watch:{
      url(){
        this.initVideo()
      }
    },
    methods: {
      initVideo() {
        let _self=this;
        this.player = new Player({
          id: "mse",
          url: Config.server+this.url,
          playsinline: true,
          width: 629,
          height: 337.5,
          whitelist: [
            ""
          ],
          autoplay:true,
          poster: Config.server+this.poster,
          playbackRate: [
            0.5, 0.75, 1, 1.5, 2
          ],
          volume: 0.0,
          playNext: {
            urlList: this.nextPlayList,
          }
        })
        this.player.on("playerNext",function (index) {
          console.log(index)
          _self.$emit("playNext",index)
        })
        this.player.on("urlList last",function () {
          _self.$Message.warning("没有下一集")
        })
      },
      handlePlayNext(index){
      }
    }
  }
</script>

<style scoped>
</style>

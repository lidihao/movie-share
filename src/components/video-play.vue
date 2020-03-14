<template>
  <div id="mse" @playerNext=""></div>
</template>

<script>
  import Player from 'xgplayer'
  import Config from '@/settings'
  export default {
    name: "video-play",
    data() {
      return {};
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
        let player = new Player({
          id: "mse",
          url: Config.server+this.url,
          playsinline: true,
          width: 629,
          height: 337.5,
          whitelist: [
            ""
          ],
          poster: Config.server+this.poster,
          playbackRate: [
            0.5, 0.75, 1, 1.5, 2
          ],
          volume: 0.1,
          playNext: {
            urlList: this.nextPlayList,
          }
        })
      },
      handlePlayNext(){
        console.log('abc')
      }
    }
  }
</script>

<style scoped>
</style>

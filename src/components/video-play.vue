<template>
  <div id="mse"></div>
</template>

<script>
  import Player from 'xgplayer'
  export default {
    name: "video-play",
    data() {
      return {};
    },
    props:{
      episode:{
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
      episode(){
        this.initVideo()
      }
    },
    methods: {
      initVideo() {
        let player = new Player({
          id: "mse",
          url: '//localhost:8089'+this.episode.episodeUrl,
          playsinline: true,
          width: 629,
          height: 337.5,
          whitelist: [
            ""
          ],
          poster: '//localhost:8089'+this.episode.posterUrl,
          playbackRate: [
            0.5, 0.75, 1, 1.5, 2
          ],
          volume: 0.1,
          playNext: {
            urlList: this.nextPlayList,
          },
          download: true
        })
      }
    }
  }
</script>

<style scoped>
</style>

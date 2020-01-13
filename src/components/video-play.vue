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
      url:{
        required:true
      },
      poster:{
        default:''
      }
    },
    mounted() {
      this.initVideo();
    },
    methods: {
      initVideo() {
        let player = new Player({
          id: "mse",
          url: '//localhost:8089'+this.url,
          playsinline: true,
          width: 629,
          height: 337.5,
          whitelist: [
            ""
          ],
          poster: '//localhost:8089'+this.poster,
          playbackRate: [
            0.5, 0.75, 1, 1.5, 2
          ],
          volume: 0.1,
          playNext: {
            urlList: [
              '//vjs.zencdn.net/v/oceans.mp4',
              '//s1.pstatp.com/cdn/expire-1-M/byted-player-videos/1.0.0/xgplayer-demo.mp4',
              '//s1.pstatp.com/cdn/expire-1-M/byted-player-videos/1.0.0/xgplayer-demo.mp4'
            ],
          },
          download: true
        })
      }
    }
  }
</script>

<style scoped>
</style>

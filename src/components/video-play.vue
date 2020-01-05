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
    mounted() {
      this.initVideo();
    },
    methods: {
      initVideo() {
        let player = new Player({
          id: "mse",
          url: "//localhost:8089/video/1fb203eca13348fc99523afd576d5cab85856210027671214.mp4",
          playsinline: true,
          width: 708,
          height: 337.5,
          whitelist: [
            ""
          ],
          playbackRate: [
            0.5, 0.75, 1, 1.5, 2
          ],
          volume: 0.1,
          thumbnail: {
            pic_num: 44,
            width: 500,
            height: 300,
            col: 10,
            row: 10,
            urls: ['./xgplayer-demo-thumbnail-1.jpg','./xgplayer-demo-thumbnail-2.jpg'],
          },
          playNext: {
            urlList: [
              '//vjs.zencdn.net/v/oceans.mp4',
              '//s1.pstatp.com/cdn/expire-1-M/byted-player-videos/1.0.0/xgplayer-demo.mp4',
              '//s1.pstatp.com/cdn/expire-1-M/byted-player-videos/1.0.0/xgplayer-demo.mp4'
            ],
          },
          download: true
        })
        player.emit('resourceReady', [{name: '高清', url: 'url1'}, {name: '超清', url: 'url2'}]);
      }
    }
  }
</script>

<style scoped>
</style>

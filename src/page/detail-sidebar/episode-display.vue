<template>
    <div class="episode-display-main">
      <div class="episode-header">
        <h2>选集</h2>
      </div>
      <div class="episode-display-content scroll-up">
        <div v-for="(item ,i) in episodeList" class="episode">
          <Button :long="true" @click="handlePlay(item)" :type="buttonStatus[i]">{{item.episodeName}}</Button>
        </div>
      </div>
    </div>
</template>

<script>
  export default {
    name: "episode-display",
    props:{
      episodeList:{
        required:true
      }
    },
    data(){
      return {
        buttonStatus:[]
      }
    },
    watch:{
      episodeList(){
        if (this.episodeList){
          for (let i=0;i<this.episodeList.length;i++){
            this.buttonStatus.push('default')
          }
        }
      }
    },
    methods:{
      handlePlay(episode){
        this.buttonStatus.fill('default')
        let index= this.episodeList.indexOf(episode)
        this.buttonStatus[index]='default'
        this.$emit('changePlay',episode)
      }
    }
  }
</script>

<style scoped>
  .episode-display-main{
    padding: 20px;
    background-color: rgb(247, 247, 247);
    overflow: hidden;
  }
  .episode-header{
    overflow: hidden;
  }
  .episode{
    color: #464c5b;
    margin: 5px;
  }
  .episode-display-content{
    padding: 20px;
    overflow: auto;
  }
  .scroll-up {
    overflow-y: scroll;
    max-height: 400px;
    overflow-x: hidden;
  }
</style>

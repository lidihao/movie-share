<template>
    <div class="episode-display-main">
      <div class="episode-header">
        <h2>选集</h2>
      </div>
      <div class="episode-display-content scroll-up">
        <div v-for="(item ,i) in episodeList" class="episode">
          <Button :long="true" @click="handlePlay(item)" :class="buttonStatus[i]">{{item.episodeName}}</Button>
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
      },
      curEpisode:{
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
        this.buttonStatus=this.createClass()
        this.buttonStatus[0]='active'
      },
      curEpisode(){
        this.handlePlay(this.episodeList[this.curEpisode])
      }
    },
    methods:{
      handlePlay(episode){

        for (let i=0;i<this.episodeList.length;i++){
          if (this.buttonStatus[i] === 'active'){
            this.$set(this.buttonStatus, i, 'visited')
          }
        }

        let index= this.episodeList.indexOf(episode)
        this.$set(this.buttonStatus, index, 'active')
        this.$emit('changePlay',episode)
      },
      createClass(){
        let arr=[]
        if (this.episodeList){
          for (let i=0;i<this.episodeList.length;i++){
            arr.push('unactive')
          }
        }
        return arr
      }
    },
    created() {
      this.buttonStatus=this.createClass()
      this.buttonStatus[0]='active'
    }
  }
</script>

<style scoped>
  .episode-display-main{
    background-color: rgb(247, 247, 247);
    height: 150px;
    overflow: hidden;
  }
  .episode-header{
    padding-top: 10px;
    padding-bottom: 10px;
    padding-left: 20px;
    border-bottom: 1px solid #57A3F3;
  }
  .episode{
    color: #464c5b;
    margin: 5px;
  }
  .scroll-up {
    overflow: scroll;
  }

  .episode-display-content{
    height: 100px;
  }
  .active {
    background-color: #fff;
    color: #00a1d6;
  }
  .unactive{

  }
  .visited{
    color: darkgray;
  }
</style>

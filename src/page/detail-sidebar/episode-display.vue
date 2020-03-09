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
      }
    },
    methods:{
      handlePlay(episode){
        this.buttonStatus=this.createClass()
        let index= this.episodeList.indexOf(episode)
        this.buttonStatus[index]='active'
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
    padding: 0px;
    overflow: auto;
  }
  .scroll-up {
    overflow-y: scroll;
    max-height: 400px;
    overflow-x: hidden;
  }
  .active {
    background-color: #fff;
    color: #00a1d6;
  }
  .unactive{

  }
</style>

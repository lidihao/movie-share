<template>
    <div>
      <div class="video-main">
        <div class="">
          <h1 class="video-title"><span>{{videoDetail.title}}</span></h1>
          <div class="video-data">
            <span>类别:</span>
            <span>{{videoDetail.category.categoryName}}</span>
          </div>
          <div class="video-data">
            <span>时间:</span>
            <span>{{videoDetail.createTime}}</span>
          </div>
        </div><!--视频题目-->
        <div class="video-content">
          <VideoPlay :url="playEpisode.episodeUrl" :poster="playEpisode.posterUrl" :nextPlayList="this.nextPlayList"
                     v-if="refresh" @playNext="handlePlayNext"></VideoPlay>
          <div class="user-action">
            <span style="margin-right: 50px">
              <span style="font-size: 16px;margin-right: 10px;margin-top: 10px">收藏</span>
              <Icon type="md-heart" size="27" :style="collectStyle" class="collect-button" @click="handleFavorite"/>
              <span style="font-size: 16px">{{favoriteCount}}</span>
            </span>
            <span>
              <span style="font-size: 16px;margin-right: 10px;margin-top: 10px">评分</span>
              <span class="score">{{rate}}</span>
            </span>
          </div>
        </div><!--播放页面-->
        <Divider></Divider>
        <div class="video-introduce">
          <h1 class="video-title">{{videoDetail.title}}</h1>
          <div>
            <Collapse active-key="1">
              <Panel key="1">
                简介
                <p slot="content">{{videoDetail.introduce}}</p>
              </Panel>
            </Collapse>
          </div>
          <div class="video-tag">
            <Tag v-for="item in videoDetail.tagList" @click.native="searVideo(item.tagName)">{{item.tagName}}</Tag>
          </div>
        </div><!--视频简介-->
        <div class="video-comment-box">
          <Tabs value="name1">
            <TabPane label="评论" name="name1">
              <Comment :videoId="videoId" :uploader="this.videoDetail.uploader"></Comment>
            </TabPane>
            <TabPane label="视频评分" name="name2">
              <RateComment :videoId="videoId"></RateComment>
            </TabPane>
          </Tabs>
        </div><!--评论区-->
      </div>
      <div class="recommend-main">
        <div>
          <UserCard :userVo="this.videoDetail.uploader"></UserCard>
        </div><!--视频上传人-->
        <div class="video-episode-display">
          <EpisodeDisplay :curEpisode="this.curEpisode" :episodeList="this.episodeList" @changePlay="playVideo"></EpisodeDisplay>
        </div> <!--视频集数-->
        <div class="play-list">
          <PlayList :videoId="videoId"></PlayList>
        </div><!--相关视频-->
      </div>
    </div>
</template>

<script>
  import VideoPlay from '@/components/video-play'
  import Comment from '@/components/comment'
  import UserCard from '@/components/user/user-card'
  import EpisodeDisplay from "./episode-display";
  import PlayList from '@/components/video/play-list/play-list-box'
  import VideoApi from '@/api/video-api'
  import EpisodeApi from '@/api/episode-api'
  import Config from '@/settings'
  import FavoriteVideoApi from '@/api/favorite-video-api'
  import RateComment from '@/components/rate-comment'
  import {mapGetters} from 'vuex'

  export default {
    name: "video-detail",
    data () {
      return {
        count: 3,
        videoId:-1,
        videoDetail:{},
        episodeList: [],
        nextPlayList: [],
        playEpisode:{},
        refresh:true,
        favoriteCount:0,
        collectStyle:'',
        curEpisode:0,
        curPlayEpisode:0,
        isFavoriteVideo:false
      }
    },
    watch:{
      $route: {
        handler() {
         location.reload()
        },
        deep: true,
      }
    },
    computed:{
      ...mapGetters(['user','isLogin']),
      rate(){
        return this.videoDetail.rate.toFixed(1)
      }
    },
    components: {EpisodeDisplay, UserCard, VideoPlay,Comment ,PlayList,RateComment},
    methods:{
      init(){
        this.videoId=this.$route.query.videoId
      },
      getVideoDetailByVideoId(){
        VideoApi.getVideoDetail({videoId:this.videoId}).then(
          (res)=>{
            if (res.code===200){
              this.videoDetail=res.result
            }
          }
        )
      },
      getEpisodeList(){
        EpisodeApi.listEpisodeByVideoId({videoId:this.videoId}).then(
          (res)=>{
            if (res.code===200){
              this.episodeList=res.result
              if (this.episodeList){
                this.playEpisode = this.episodeList[0]
                let nextEpisodeList = this.episodeList.slice(1)
                let list=[]
                nextEpisodeList.forEach((eps => {list.push(Config.server+eps.episodeUrl)}))
                this.nextPlayList=list
              }
            }
          }
        )
      },
      handlePlayNext(index){
        this.curEpisode=this.curPlayEpisode+index
      },
      playVideo(episode){
        this.playEpisode=episode
        this.refresh=false;
        let idx = this.episodeList.indexOf(episode)
        this.curPlayEpisode=idx
        let nextEpisodeList = this.episodeList.slice(idx+1)
        let list=[]
        nextEpisodeList.forEach((eps => {list.push(Config.server+eps.episodeUrl)}))
        this.nextPlayList=list
        this.$nextTick(()=>{
          this.refresh=true
        })
      },
      incrementPlayCount(){
        let params={
          videoId:this.videoId
        }
        VideoApi.incrementVideoPlayCount(params).then((res)=>{

        })
      },
      handleFavorite(){

        if (!this.isLogin) {
          this.$Message.warning("请先登录")
          return
        }

        let data={
          userId:this.user.userId,
          videoId:this.videoId
        }
        if(this.isFavoriteVideo){
          FavoriteVideoApi.unFavoriteVideo(data).then((res)=>{
            this.isFavoriteVideo=false
            this.collectStyle=''
            this.favoriteCount=this.favoriteCount-1
          })
        }else {
          FavoriteVideoApi.favoriteVideo(data).then((res)=>{
            this.isFavoriteVideo=true
            this.collectStyle='color:rgb(0, 161, 214)'
            this.favoriteCount=this.favoriteCount+1
          })
        }
      },
      getFavoriteCount(){
        let data={
          videoId:this.videoId
        }
        FavoriteVideoApi.getFavoriteCount(data).then((res)=>{
          if (res.code===200){
            this.favoriteCount=res.result
          }
        })
      },
      searVideo(tagName){
        this.$router.push({
          path:'/search',
          query:{
            key:tagName
          }
        })
      },
      isFavorite(){
        if (!this.isLogin) {
          return
        }
        let data={
          userId:this.user.userId,
          videoId:this.videoId
        }
        FavoriteVideoApi.isFavorite(data).then((res)=>{
          if (res.code===200){
            this.isFavoriteVideo=res.result
            if (this.isFavoriteVideo){
              this.collectStyle='color:rgb(0, 161, 214)'
            }else {
              this.collectStyle=''
            }
          }
        })
      },
      endPlayVideo(){
        VideoApi.endPlayVideo({videoId:this.videoId}).then((res)=>{

        })
      }
    },
    created() {
      this.init()
      this.getVideoDetailByVideoId()
      this.getEpisodeList()
      this.incrementPlayCount()
      this.isFavorite()
      this.getFavoriteCount()
    },
    destroyed() {
      this.endPlayVideo()
    }
  }
</script>

<style scoped>
  .video-title {
    font-size: 18px;
    font-weight: 500;
    color: #212121;
    line-height: 26px;
    height: 26px;
    margin-bottom: 12px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .video-data {
    margin-top: 11px;
    font-size: 12px;
    height: 16px;
    color: #999;
    display: -ms-flexbox;
    display: flex;
    -ms-flex-align: center;
    align-items: center;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .video-content{
    margin-top: 20px;
  }
  .video-tag{
    margin-top: 20px;
  }
  .video-introduce{
    margin-top: 20px;
  }

  .video-comment-box{
    margin-top: 30px;
  }
  .video-main{
    width: 60%;
    display: inline-block;
  }
  .recommend-main {
    float: right;
    width: 27%;
    position: fixed;
    top: 8%;
    left: 70%;
  }
  .video-episode-display{
    height: 150px;
    overflow: hidden;
  }
  .play-list{
    margin-top: 20px;
  }

  .user-action{
    margin: 20px 0;
  }

  .collect-button{
    cursor: pointer;
  }
  .score{
    height: 24px;
    line-height: 24px;
    font-weight: 700;
    font-size: 24px;
    color: #ffa726;
    margin-bottom: 4px;
    font-family: HelveticaNeue-Bold;
    padding-right: 14px;
    display: inline-block;
  }
</style>

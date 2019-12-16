<template>
    <div>
      <div class="video-main">
        <div class="">
          <h1 class="video-title"><span>西瓜视频</span></h1>
          <div class="video-data">
            <span>类别:</span>
            <span>时间</span>
          </div>
          <div class="video-data">
            <span>类别:</span>
            <span>时间</span>
          </div>
        </div><!--视频题目-->
        <div class="video-content">
          <VideoPlay></VideoPlay>
          <div>点赞</div>
        </div><!--播放页面-->
        <div class="video-introduce">
          <h1 class="video-title">题目</h1>
          <div>
            <Collapse active-key="1">
              <Panel key="1">
                简介
                <p slot="content">史蒂夫·乔布斯（Steve Jobs），1955年2月24日生于美国加利福尼亚州旧金山，美国发明家、企业家、美国苹果公司联合创办人。</p>
              </Panel>
            </Collapse>
          </div>
          <div class="video-tag">
            <Tag v-for="item in count" closable>标签{{ item + 1 }}</Tag>
            <i-button icon="ios-plus-empty" type="dashed" size="small" @click="count += 1">添加标签</i-button>
          </div>
        </div><!--视频简介-->
        <div class="video-comment-box">
          <Comment></Comment>
        </div><!--评论区-->
      </div>
      <div class="recommend-main">
        <div>

        </div><!--视频上传人-->
        <div class="video-episode-display">
          <EpisodeDisplay></EpisodeDisplay>
        </div> <!--视频集数-->
        <div>
          <PlayList></PlayList>
        </div><!--相关视频-->
      </div>
    </div>
</template>

<script>
  import VideoPlay from '@/components/video-play'
  import Comment from '@/components/comment'
  import UploadBox from './detail-sidebar/uploader-box'
  import EpisodeDisplay from "./detail-sidebar/episode-display";
  import PlayList from '@/components/video/play-list/play-list-box'
  export default {
    name: "video-detail",
    data () {
      return {
        count: 3
      }
    },
    components: {EpisodeDisplay, UploadBox, VideoPlay,Comment ,PlayList}
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

  }
  .video-main{
    width: 60%;
    display: inline-block;
  }
  .recommend-main {
    float: right;
    width: 27%;
    position: fixed;
    top: 10%;
    left: 70%;
  }
  .video-episode-display{
    height: 200px;
    overflow: hidden;
  }
</style>

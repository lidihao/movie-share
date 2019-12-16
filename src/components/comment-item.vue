<template>
  <div class="list-item reply-wrap" data-id="2175428370" data-index="0" scrollshow="true">
    <div class="user-face">
      <a href="//space.bilibili.com/321872907" target="_blank"
         data-usercard-mid="321872907">
        <img class="user-face-img" src="../assets/1.png" alt="">
      </a>
    </div>
    <div class="con ">
      <div class="user">
        <a>
          <h2>李帝豪</h2>
        </a>
      </div>
      <p class="text">
        人型、姬雏鸟、琥珀的身体，三首歌三种风格，却无一都在讲述着自己对科学家的不满以及两人互相珍惜对方的感情。这首歌比起前面两首有了更多看透尘世的感觉，成熟的两人真的太有魅力了…（虽然真的很想吹爆琥珀但我想不出词了…<br>另外，想翻唱这首歌但日语不是很好的各位可以点进这里<a
        href="//www.bilibili.com/read/cv4151355/" target="_blank" data-view="4151355">cv4151355</a>，我写了一份注平假名&amp;罗马音的歌词
      </p>
      <div class="info"><span class="time">2019-12-13 20:06</span><span
        class="like "><i></i><span>746</span></span><span class="hate "><i></i></span><span
        class="reply btn-hover btn-highlight">回复</span>
        <div class="operation">
          <div class="spot"></div>
          <div class="opera-list" style="display: none;">
            <ul>
              <li class="blacklist">加入黑名单</li>
              <li class="report">举报</li>
            </ul>
          </div>
        </div>
      </div>
      <div class="reply-box">
        <ReplyItem></ReplyItem>
        <ReplyItem></ReplyItem>
        <ReplyItem></ReplyItem>
        <div class="view-more">
          共<b>11</b>条回复,
          <a class="btn-more" data-pid="2175428370" data-fold="false">点击查看</a>
        </div>
      </div>
      <div class="paging-box"></div>
    </div>
  </div>
</template>

<script>
  import ReplyItem from './comment-reply-item'
  export default {
    name: "comment-item",
    components:{ReplyItem}
  }
</script>

<style scoped>
  .list-item{
    box-shadow: 1px 1px 10px;
    padding-top: 30px;
    margin: 40px auto;
  }
  .reply-box{
    margin-left: 50px;
  }
  .user-face-img{
    border-radius: 50px;
    margin: 0 auto;
    float: left;
    width: 50px;
    height: 50px;
  }
  .user{
    font-size: 13px;
  }
  .con{
    margin-left: 85px;
  }
  .con .text{
    padding: 10px 10px;
    font-size: 14px;
  }
  .reply-box{
    padding-top: 10px;
    padding-bottom: 10px;
  }
  .time{
    margin-left: 6px;
    margin-right: 16px;
  }
  .reply{
    margin: 0px 20px;
  }
  .reply:hover{
    cursor: pointer;
  }
  .view-more{
    margin: 30px auto;
  }
</style>

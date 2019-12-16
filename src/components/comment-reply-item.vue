<template>
  <div class="reply-item">
    <div class="user-face">
      <a>
        <img class="user-face-img" src="../assets/1.png" alt="">
      </a>
    </div>
    <div class="reply-con">
      <div class="user">
        <a href="//space.bilibili.com/321872907" target="_blank"
           data-usercard-mid="321872907" class="name ">陌染闇_96</a>
        <span class="text-con">看了一下弹幕和评论，有一点想纠正一下：人型、姬雏鸟、琥珀这些歌曲和MV都是建立在HH的世界观里面的，里面讲述的全都是HH自己的故事，与其它vt毫无关系。虽然可能确实歪打正着戳中了某些点，但也请不要在这里刷其他的vt以影响他人观感。</span>
      </div>
    </div>
    <div class="info">
      <span class="time">2019-12-14 11:37</span>
      <span class="like "><i></i><span>56</span></span><span class="hate "><i></i></span>
      <span class="reply">回复</span>
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
  </div>
</template>

<script>
  export default {
    name: "comment-reply-item"
  }
</script>

<style scoped>
  .user-face-img{
    border-radius: 50px;
    margin: 0 auto;
    float: left;
    width: 50px;
    height: 50px;
  }
  .reply-con{
    margin: 30px 80px;
  }
  .text-con{
    margin-left: 5px;
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

</style>

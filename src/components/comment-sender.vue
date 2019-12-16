<template>
  <div class="comment-send ">
    <div class="textarea-container">
      <i-input type="textarea" :rows="4" placeholder="请输入..."></i-input>
      <i-button type="primary"style="margin-top: 10px">发表评论</i-button>
    </div>
    <!--<div class="comment-emoji"><i class="face"></i><span class="text">表情</span></div>-->
  </div>
</template>

<script>
  export default {
    name: "comment-sender"
  }
</script>

<style scoped>
  .comment-send{
    margin: 20px auto;
  }
</style>

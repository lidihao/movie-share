<template>
  <div class="common">
    <div class="b-head"><span class="b-head-t results">1255</span><span class="b-head-t">评论</span></div>
    <div class="comment" style="position: relative;">
      <div class="bb-comment ">
        <div class="comment-header">
          <div class="tabs-order">
            <Menu mode="horizontal" theme="light" active-name="1">
              <Menu-item name="1">
                <Icon type="ios-paper"></Icon>
                评论内容
              </Menu-item>
            </Menu>
          </div>
          <div class="header-page">
            <Page :total="40" size="small" show-elevator show-sizer></Page>
          </div>
        </div>
        <CommentSender></CommentSender>
        <div class="comment-list ">
          <CommentItem></CommentItem>
          <CommentItem></CommentItem>
          <CommentItem></CommentItem>
          <CommentItem></CommentItem>
          <CommentItem></CommentItem>
        </div>
        <div class="bottom-page paging-box-big">
          <Page :total="40" show-elevator show-sizer></Page>
        </div>
        <comment-sender></comment-sender>
      </div>
    </div>
  </div>
</template>

<script>
  import CommentItem from './comment-item'
  import CommentSender from './comment-sender'
  export default {
    name: "comment",
    components: {CommentItem, CommentSender}
  }
</script>

<style scoped>
  .common{
    margin: 40px auto;
  }
  .b-head {
    font-size: 18px;
    line-height: 24px;
    color: #222;
    margin: 0 0 20px;
  }

  .b-head-t{
    margin:auto 10px;
  }
  .tabs-order{
    display: inline-block;
  }
  .header-page{
    display: inline-block;
    margin-left: 200px;
  }
  .bottom-page{
    margin: 40px auto;
  }
</style>

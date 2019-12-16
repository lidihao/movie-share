<template>
  <div class="uploader-main">
    <a>
      <img src="../../assets/1.png" alt="" class="uploader-img">
    </a>
    <div class="uploader-detail">
      <h1>李帝豪</h1>
      <p>一个风骚的男人
        一个风骚的男人一个风骚的男人一个风骚的男人
        一个风骚的男人一个风骚的男人
        一个风骚的男人一个风骚的男人一个风骚的男人
        一个风骚的男人一个风骚的男人
      </p>
      <div class="add-button">
        <i-button type="primary">
          <Icon type="ios-people" size="15"></Icon>
          <strong>关注用户</strong>
        </i-button>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "uploader-box"
  }
</script>

<style scoped>
  .uploader-main{
    margin: 20px auto;
    background-color: rgb(247, 247, 247);
    padding: 20px;
  }
  .uploader-img {
    width: 100px;
    height: 100px;
    border-radius: 50px;
    margin: 0 auto;
    float: left;
  }
  p{
    margin: 20px auto;
  }
  .uploader-detail{
    margin: 20px 20px 20px 120px;
  }
  .add-button{
    width: 100%;
  }
</style>

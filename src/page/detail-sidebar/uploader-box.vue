<template>
  <div class="uploader-main">
    <a>
      <img src="../../assets/1.png" alt="" class="uploader-img">
    </a>
    <div class="uploader-detail">
      <h2>李帝豪</h2>
      <p>一
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
    padding: 10px;
  }
  .uploader-img {
    width: 60px;
    height: 60px;
    border-radius: 50px;
    margin: 0 auto;
    float: left;
  }
  p{
    margin: 10px auto;
    min-height: 40px;
  }
  .uploader-detail{
    margin: 10px 10px 10px 120px;
  }
  .add-button{
    width: 100%;
  }
</style>

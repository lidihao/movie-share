<template>
    <div>
      <div class="img-style">
        <img src="../assets/abcde.jpg" alt="">
        <div class="img-cover">
          <Icon type="md-arrow-dropright-circle" size="45"/>
        </div>
      </div>
      <div class="info">
        <h3 class="title">测试hidf ikdjhif dj </h3>
        <span class="apply-status">审批结果：<strong>不通过</strong></span>
      </div>
    </div>
</template>

<script>
  export default {
    name: "apply-detail-box"
  }
</script>

<style scoped>
  .img-style{
    max-width: 160px;
    height: 100px;
    position: relative;
    float: left;
    margin-right: 20px;
  }
  .img-style img{
    width: 100%;
    height: 100%;
    border-radius: 20px;
  }
  .img-cover{
    display: none;
    position: absolute;
    bottom: 27px;
    left: 55px;
  }
  .img-style:hover .img-cover{
    display: block;
  }
  .img-style:hover img{
    transform: scale(1.1);
  }

  .img-style:hover i{
    color: #fff;
    font-size: 20px;
    cursor: pointer;
    margin: 0 2px;
  }

  .title{
    text-align: left;
    margin: 10px 0;
    padding-top: 10px;
  }
</style>

<template>
  <div style="width: 350px;">
    <div class="movie-item-contents gradient">
      <img src="../assets/t3.jpg" alt="">
      <div class="movie-item-content">
        <div class="movie-item-content-center">
          <a href="#/video/videoPlay"><strong><Icon type="ios-play" size="70"></Icon></strong></a>
        </div>
        <div class="movie-item-content-buttom">
          <div class="movie-item-title">
            <a href="">Hurry Animate Blue Strack New Movie (2018)</a>
          </div>
          <div class="uper">
            <Icon type="ios-people" size="30"></Icon>
            <span>上传者:</span>
            <a><strong>李帝豪</strong></a>
          </div>
          <div class="movie-item-beta">
            <p class="pull-left">
              <span class="view-people-count">观看人数:98459w</span>
              <span class="comment-count">评论数:98459</span>
            </p>
            <p class="pull-right view-movie">时长:34:00</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "VideoBox"
  }
</script>

<style scoped>
  .movie-item-contents {
    position: relative;
  }
  .gradient{
    position: relative;
    overflow: hidden;
  }

  .gradient:after{
    content: "";
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
    background-color: rgba(0, 0, 0, 0.5);
  }

  .gradient:hover > img{
    transform: scale(1.2);
    transition: all 0.4s ease-in-out;
  }

  .gradient > img{
    transform: scale(1);
    transition: all 0.4s ease-in-out;
  }

  .gradient:hover:after {
    content: "";
    background: -webkit-linear-gradient(to top, rgba(6, 15, 25, .6) 0%, rgba(29, 119, 29, 0.6) 100%);
    background: linear-gradient(to top, rgba(6, 15, 25, .6) 0%, rgba(29, 119, 29, 0.6) 100%);
    position: absolute;
  }

  .movie-item-content {
    position: absolute;
    top: 0;
    width: 100%;
    height: 100%;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 1
  }

  .movie-item-title > a {
    color: #fff;
    font-size: 25px;
    display: inline-block;
    font-weight: bold;
    line-height: 28px;
    text-transform: capitalize;
  }
  .pull-right{
    float: right;
  }
  .pull-left{
    float: left;
  }

  .movie-item-content-center {
    margin: 0 auto;
    position: absolute;
    top: 37%;
    bottom: auto;
    text-align: center;
    left: 0;
    right: 0;
    margin-top: -100%;
    -webkit-transition: all 0.4s ease-in-out;
    -moz-transition: all 0.4s ease-in-out;
    -ms-transition: all 0.4s ease-in-out;
    -o-transition: all 0.4s ease-in-out;
    transition: all 0.4s ease-in-out
  }

  .movie-item-contents:hover .movie-item-content-center {
    margin-top: 0;
    -webkit-transition: all 0.4s ease-in-out;
    -moz-transition: all 0.4s ease-in-out;
    -ms-transition: all 0.4s ease-in-out;
    -o-transition: all 0.4s ease-in-out;
    transition: all 0.4s ease-in-out
  }

  .movie-item-content-buttom {
    position: absolute;
    bottom: 0;
    width: 100%;
    height: auto;
    padding-bottom: 20px;
  }
  .movie-item-title {
    padding: 0 23px;
  }
  .movie-item-beta {
    margin-top: 16px;
    padding-top: 16px;
  }
  .comment-count{
    padding: 7px 14px;
    color: #fff;
    font-weight: bold;
    margin-top: 0;
    display: inline-block;
  }
  .view-people-count{
    padding: 7px 14px;
    color: #fff;
    font-weight: bold;
    margin-top: 0;
    display: inline-block;
  }
  .view-movie {
    padding: 7px 14px;
    color: #fff;
    font-weight: bold;
    margin-top: 0;
    display: inline-block;
  }
  .uper{
    margin-top: 10px;
    margin-left: 20px;
    color: white;
  }

</style>

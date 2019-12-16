<template>
    <div class="header1">
          <Menu mode="horizontal" theme="light" active-name="1">
            <Row type="flex" justify="start">
              <i-col span="5" offset="1">
                <img src="../assets/logo.png"/>
              </i-col>
              <i-col span="8" >
                <i-input class="search" placeholder="输入关键字搜索">
                  <i-button slot="append" icon="ios-search"></i-button>
                </i-input>
              </i-col>
              <i-col span="5" offset="5">
                <Menu-item name="1" to="/">
                  <Icon type="settings"></Icon>
                  首页
                </Menu-item>
                <Menu-item name="2" to="/VideoManager/upload">
                  <Icon type="settings"></Icon>
                 上传
                </Menu-item>
                <Menu-item to="/VideoManager/upload">
                  <i-button type="primary">Primary</i-button>
                </Menu-item>
              </i-col>
            </Row>
          </Menu>
    </div>
</template>

<script>
  export default {
    name: "Home"
  }
</script>

<style scoped>
  .header1{
    background-color: #ffffff;
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    height: 60px;
    width: 100%;
    box-shadow: 1px 1px 10px;
  }

  .search{
    margin-top: 10px;
  }
</style>

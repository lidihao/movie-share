<template>
    <div class="header1">
          <Menu mode="horizontal" theme="light" active-name="1">
            <Row type="flex" justify="start">
              <Col span="5" offset="1">
                <img src="../assets/logo.png"/>
              </Col>
              <Col span="6" >
                <Input class="search" placeholder="输入关键字搜索" v-model="searchKey">
                  <Button slot="append" icon="ios-search" type="primary" @click="searVideo"></Button>
                </Input>
              </Col>
              <Col span="8" offset="3">
                <Menu-item name="index" to="/">
                  首页
                </Menu-item>
                <Menu-item name="upload">
                 <Button type="primary" @click="clickUpload">上传</Button>
                </Menu-item>
                <Menu-item name="login" v-if="!isLogin">
                  <Button type="primary" @click="showLoginModal">登录</Button>
                  <Login :showLogin="showLogin" @cancel="showLoginModalCancel" @success="loginSuccess"></Login>
                </Menu-item>
                <Menu-item name="register" v-if="!isLogin">
                  <Button type="primary" @click="showRegisterModal">注册</Button>
                  <Register :show-register="showRegister" @cancel="showRegisterModalCancel" @success="registerSuccess"></Register>
                </Menu-item>
              </Col>
            </Row>
          </Menu>
    </div>
</template>

<script>
  import Login from '../form/login'
  import Register from '../form/register'
  import {mapGetters} from 'vuex'

  export default {
    name: "Home",
    components:{
      Login,Register
    },
    data(){
      return{
        showLogin:false,
        showRegister:false,
        searchKey:''
      }
    },
    computed:{
      ...mapGetters([
        'isLogin'
      ])
    },
    methods:{
      clickUpload(){
        if (this.$store.getters.isLogin){
          this.$router.push({path:'/VideoManager/upload'})
        }else {
          this.showLoginModal()
        }
      },
      showLoginModal(){
        this.showLogin=true
      },
      showLoginModalCancel(){
        this.showLogin=false
      },
      showRegisterModal(){
        this.showRegister=true
      },
      showRegisterModalCancel(){
        this.showRegister=false
      },
      registerSuccess(){
        this.showRegister=false
      },
      loginSuccess(){
        this.showLogin=false
      },
      searVideo(){
        this.$router.push({
          path:'/search',
          query:{
            key:this.searchKey
          }
        })
      }
    }
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

<template>
  <aside class="side-menu">
    <Menu active-name="1" theme="dark" width="auto">
      <div class="headSculpture" v-if="isLogin">
        <img :src="avatarUrl" alt="">
        <p>昵称：{{user.userName}}</p>
      </div>
      <Menu-item name="1" to="/home">
        <span class="layout-text">首页</span>
      </Menu-item>
      <SidebarItem  v-for="item in menuTree" :is-nest="true" :item="item"></SidebarItem>
      <Menu-item name="logout" v-if="isLogin">
        <Button type="primary" @click="logout" >退出登录</Button>
      </Menu-item>
    </Menu>
  </aside>
</template>

<script>
  import {mapGetters} from 'vuex'
  import Avatar from '@/assets/1.png'
  import SidebarItem from "./SidebarItem";
  import Config from '@/settings'

  export default {
    name: "SideBar",
    components:{
      SidebarItem
    },
    data(){
      return{
        menu:
          [
            {
              menuName:"视频类型",
              menuEng:'video-type',
              menuUrl:'',
              hasChild:true,
              children: [
                {
                  menuName:"动漫",
                  menuEng:'video-type-animate',
                  menuUrl:'/video/category-detail?type=animate',
                  hasChild:false
                },
                {
                  menuName:"科技",
                  menuEng:'video-type-science',
                  menuUrl:'/video/category-detail',
                  hasChild:false
                }
              ]
            },
            {
              menuName:"视频管理",
              menuEng:'video-manager',
              menuUrl:'',
              hasChild:true,
              children:[
                {
                  menuName:"视频上传",
                  menuEng:'video-manager-upload',
                  menuUrl:'/VideoManager/upload',
                  hasChild:false
                }
              ]
            },
            {
              menuName:"个人中心",
              menuEng:'person-center',
              menuUrl:'',
              hasChild:true,
              children:[
                {
                  menuName:"个人空间",
                  menuEng:'person-space',
                  menuUrl:'/user/person-space',
                  hasChild:false
                }
              ]
            }
          ]
      }
    },
    computed:{
      ...mapGetters(['user','isLogin','menuTree']),
      avatarUrl(){
        return this.avatar= Config.server+this.user.avatarUrl
      }
    },
    methods:{
      logout(){
        this.$store.dispatch('LogOut').then(() => {
          this.$router.push({
            path: '/home'
          })
        }).then(()=>{
          location.reload()
        })
      }
    },
    created() {
    }
  }
</script>

<style scoped>
  .side-menu {
    position: fixed;
    width: 13%;
    top: 60px;
    bottom: 0;
    left: 0;
    background: #2b3643;
    overflow: auto;
  }
  .headSculpture {
    width: 100%;
    margin-top: 5px;
    text-align: center;
  }
  .headSculpture img {
    width: 100px;
    height: 100px;
    border-radius: 50px;
    margin: 0 auto;
  }
  .headSculpture p {
    margin: 0 auto;
    margin-top: 15px;
    font-size: 15px;
    width: 160px;
    height: 30px;
    line-height: 30px;
    background-color: #464c5b;
    border-radius: 15px;
    color: #fff;
  }
</style>

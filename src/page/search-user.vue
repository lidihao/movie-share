<template>
  <div>
    <div class="grid-content">
      <div class="user-item" v-for="item in this.userList">
        <UserCard :userVo="item" ></UserCard>
      </div>
      <div class="page">
        <Page :total="total" show-total @on-change="pageNumChange"></Page>
      </div>
    </div>
  </div>
</template>

<script>
  import UserCard from '@/components/user/user-card'
  import LoginApi from '@/api/login'
  import {mapGetters} from 'vuex'


  export default {
    name: "following-user",
    data(){
      return{
        total:0,
        searchKey:'',
        userList:[],
        curPageNum:1,
        curPageSize:10
      }
    },
    props:{
      searchKey:{
        required:true
      }
    },
    watch:{
      searchKey(){
        this.getUserList()
      }
    },
    computed:{
      ...mapGetters(['user'])
    },
    components:{
      UserCard
    },
    methods:{
      getUserList(){
        let params={
          searchKey:this.searchKey,
          pageNum:this.curPageNum,
          pageSize:this.curPageSize
        }
        LoginApi.searchUser(params).then((res)=>{
          if (res.code===200){
            let data = res.result
            this.total=data.pageInfo.total
            this.userList=data.result
          }
        })
      },
      pageNumChange(pageNum){
        this.curPageNum=pageNum
        this.getUserList()
      }
    },
    created() {
      this.getUserList()
    }
  }
</script>

<style scoped>
  .user-item{
    display: inline-grid;
    margin: 20px 10px;
    border: 1px solid #dcdee2;
    background: #fff;
    border-radius: 4px;
    font-size: 14px;
    transition: all .2s ease-in-out;
  }
</style>

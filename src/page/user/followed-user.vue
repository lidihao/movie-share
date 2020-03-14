<template>
  <div>
    <div class="search">
          <Input class="search" placeholder="输入关键字搜索" v-model="searchKey" >
            <Button slot="append" icon="ios-search" @click="getFollowedUserList"></Button>
          </Input>
    </div>
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
  import FollowApi from '@/api/follow-api'
  import {mapGetters} from 'vuex'


  export default {
    name: "following-user",
    data(){
      return{
        total:10,
        searchKey:'',
        userList:[],
        curPageNum:1,
        curPageSize:10
      }
    },
    props:{
      userId:{
        required:true
      }
    },
    watch:{
      userId(){
        this.getFollowedUserList()
      }
    },
    computed:{
      ...mapGetters(['user'])
    },
    components:{
      UserCard
    },
    methods:{
      getFollowedUserList(){
        let params={
          userId:this.userId,
          pageNum:this.curPageNum,
          pageSize:this.curPageSize,
          userName:this.searchKey
        }
        console.log(params)
        FollowApi.getFollowedUserList(params).then((res)=>{
          if (res.code===200){
            let data = res.result
            this.total=data.pageInfo.total
            this.userList=data.result
          }
        })
      },
      pageNumChange(pageNum){
        this.curPageNum=pageNum
        this.getFollowedUserList()
      }
    },
    created() {
      this.getFollowedUserList()
    }
  }
</script>

<style scoped>
  .user-item{
    display: inline-block;
    margin: 20px 10px;
    border: 1px solid #dcdee2;
    background: #fff;
    border-radius: 4px;
    font-size: 14px;
    position: relative;
    transition: all .2s ease-in-out;
  }
  .search{
    margin-left: 5px;
    width: 40%;
  }
</style>

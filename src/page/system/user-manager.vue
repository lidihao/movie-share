<template>
  <div>
    <div class="title">
      <h1>用户管理</h1>
    </div>
    <div>
      <div style="margin-left: 20px">
        <Button type="primary" @click="showAddUser">添加用户</Button>
      </div>
      <div>
        <Input search placeholder="用户名"  v-model="userName" class="search" @on-search="getUserList"/>
      </div>
      <div class="content">
        <Table :columns="columns" :data="userList">
          <template slot-scope="{ row, index }" slot="action">
            <Button type="primary" size="small" style="margin-right: 5px" @click="show(index)">编辑用户</Button>
          </template>
        </Table>
        <Page :total="total" show-total :page-size="curPageSize" style="margin-top: 20px" @on-change="changePage"/>
      </div>
      <EditUser :showEdit="showEdit" :item="userDetail" @cancel="cancelEdit" @success="cancelEdit"></EditUser>
      <AddUser :showEdit="showAdd" @cancel="cancelAdd" @success="cancelAdd"></AddUser>
    </div>
  </div>
</template>

<script>
  import LoginApi from '@/api/login'
  import EditUser from '@/form/edit-user'
  import AddUser from '@/form/add-user'
    export default {
      name: "user-manager",
      components:{
        EditUser,
        AddUser
      },
      data(){
          return{
            userName:'',
            curPageNum:1,
            curPageSize:10,
            total:0,
            showEdit:false,
            showAdd:false,
            userDetail:{},
            columns:[
              {
                title: '用户名',
                width: 150,
                render:(h, params) =>{
                  return h('strong', params.row.user.userName)
                }
              },
              {
                title: 'email',
                width: 200,
                render:(h, params) =>{
                  return h('strong', params.row.user.email)
                }
              },
              {
                title: '简介',
                width: 200,
                render:(h, params) =>{
                  return h('strong', params.row.user.introduce)
                }
              },
              {
                title: '角色列表',
                width: 200,
                render:(h,params)=>{
                  let roleList = params.row.roleList
                  let renderRoleList =[]
                  roleList.forEach(value => {
                    renderRoleList.push(h('Tag',value.roleDes))
                  })
                  return h('div',renderRoleList)
                }
              },
              {
                title: '操作',
                slot: 'action',
                width: 150,
                align: 'center'
              }
            ],
            userList:[],
            roleList:[]
          }
      },
      methods:{
          getUserList(){
            let params={
              pageNum:this.curPageNum,
              pageSize:this.curPageSize,
              userName:this.userName
            }
            LoginApi.searchUserForManager(params).then((res)=>{
              if (res.code===200){
                this.total=res.result.pageInfo.total
                this.userList=res.result.result
              }
            })
          },
        changePage(pageNum){
          this.curPageNum=pageNum
          this.getUserList()
        },
        show(index){
            this.userDetail=this.userList[index]
            this.showEdit=true
        },
        cancelEdit(){
            this.showEdit=false
        },
        cancelAdd(){
          this.showAdd=false
        },
        showAddUser(){
            this.showAdd=true
        }
      },
      created() {
        this.getUserList()
      }
    }
</script>

<style scoped>
  .title{
    margin-left: 500px;
  }
  .search{
    width: 20%;
    margin: 20px;
  }
  .content{
    width: 70%;
    margin: 20px;
  }
</style>

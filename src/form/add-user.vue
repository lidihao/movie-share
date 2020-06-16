<template>
    <div>
      <Modal
        v-model="showModal"
        title="添加用户"
        @on-ok="submit"
        @on-cancel="cancel"
        :loading="loading">
        <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="150">
          <FormItem label="用户名" prop="userName">
            <Input v-model="formValidate.userName" placeholder="用户名"></Input>
          </FormItem>
          <FormItem label="邮箱" prop="email">
            <Input v-model="formValidate.email" placeholder="邮箱"></Input>
          </FormItem>
          <FormItem label="密码" prop="password">
            <Input type="password" v-model="formValidate.password" placeholder="输入密码">
              <Icon type="ios-lock-outline" slot="prepend"></Icon>
            </Input>
          </FormItem>
          <FormItem label="角色列表" prop="roleList">
            <Select v-model="formValidate.roleList" style="width:200px" multiple>
              <Option v-for="item in roleList" :value="item.roleId" :key="item.roleId">{{ item.roleDes }}</Option>
            </Select>
          </FormItem>
        </Form>
      </Modal>
    </div>
</template>

<script>
  import RoleApi from '@/api/role-api'
  import LoginApi from '@/api/login'
  import md5 from "js-md5";
    export default {
      name: "add-user",
      props:{
        showEdit:{
          default:false
        }
      },
      data(){
        return{
          showModal:false,
          loading:false,
          formValidate:{
            userName:'',
            email:'',
            password:'',
            roleList:[]
          },
          ruleValidate:{
            userName: [
              { required: true, message: '用户名不能为空', trigger: 'blur' }
            ],
            email: [
              { required: true, message: '邮箱不能为空', trigger: 'blur' },
              { type: 'email', message: '邮箱格式不正确', trigger: 'blur' }
            ],
            password: [
              { required: true, message: '密码不能为空', trigger: 'blur' },
              { min: 6, max: 20, message: '请输入6-20位字符', trigger: 'blur' }
            ]
          }
        }
      },
      watch:{
        // 这里只能用function函数，不能用箭头函数
        showEdit(){
          this.showModal=this.showEdit
        }
      },
      methods:{
        cancel () {
          this.$emit('cancel')
        },
        getRoleList(){
          RoleApi.getAllRoleList().then((res)=>{
            if (res.code===200){
              this.roleList=res.result
            }
          })
        },
        submit(){
          this.$refs.formValidate.validate(valid => {
            if (!valid) {
              this.loading = false
              this.$nextTick(() => {
                this.loading = true
              })
              return
            } else {
              let user = {
                userName:this.formValidate.userName,
                password:md5(this.formValidate.password),
                email:this.formValidate.email
              }
              let postRoleList = []
              let roleIdList = this.formValidate.roleList
              roleIdList.forEach(value => {
                postRoleList.push({roleId:value})
              })
              let data={
                user:user,
                roleList:postRoleList
              }
              LoginApi.createUserFromManager(data).then((res)=>{
                if (res.code===200){
                  this.$Message.success("添加用户成功")
                  this.$emit('success')
                }else{
                  this.$Message.warning(res.message)
                }
              })
            }
          }
          )
        }
      },
      created() {
        this.getRoleList()
      }
    }
</script>

<style scoped>

</style>

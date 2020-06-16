<template>
  <Modal
    v-model="showModal"
    title="编辑用户"
    @on-ok="submit"
    @on-cancel="cancel"
    :loading="loading">
    <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="150">
      <FormItem label="用户名" prop="userName">
        <Input v-model="formValidate.userName" placeholder="用户名" :disabled="true"></Input>
      </FormItem>
      <FormItem label="邮箱" prop="email">
        <Input v-model="formValidate.email" placeholder="邮箱" :disabled="true"></Input>
      </FormItem>
      <FormItem label="角色列表" prop="roleList">
        <Select v-model="formValidate.roleList" style="width:200px" multiple>
          <Option v-for="item in roleList" :value="item.roleId" :key="item.roleId">{{ item.roleDes }}</Option>
        </Select>
      </FormItem>
    </Form>
  </Modal>
</template>

<script>
  import RoleApi from '@/api/role-api'
  import LoginApi from '@/api/login'
    export default {
      name: "edit-user",
      props:{
        showEdit:{
          default:false
        },
        item:{
          default: {}
        }
      },
      watch:{
        // 这里只能用function函数，不能用箭头函数
        showEdit(){
          this.showModal=this.showEdit
        },
        item(){
          this.init()
        }
      },
      data(){
        return{
          showModal:false,
          loading:false,
          formValidate:{
            roleList:[]
          },
          ruleValidate:{}
        }
      },
      methods:{
        getRoleList(){
          RoleApi.getAllRoleList().then((res)=>{
            if (res.code===200){
              this.roleList=res.result
            }
          })
        },
        init(){
          let roleIdList = []
          let roleList = this.item.roleList
          roleList.forEach(value => {
            roleIdList.push(value.roleId)
          })
          this.formValidate.roleList=roleIdList
          this.formValidate.userName=this.item.user.userName
          this.formValidate.email=this.item.user.email
        },
        submit(){
          this.$refs.formValidate.validate(valid => {
            if (valid){
              let postRoleList = []
              let roleIdList = this.formValidate.roleList
              roleIdList.forEach(value => {
                postRoleList.push({roleId:value})
              })
              let data = {
                user:this.item.user,
                roleList:postRoleList
              }
              LoginApi.updateRoleList(data).then((res)=>{
                if (res.code===200){
                  this.$Message.success('成功更新')
                }else {
                  this.$Message.error("错误")
                }
              })
            }
            this.$emit('success')
            this.loading = false
            this.$nextTick(() => {
              this.loading = true
            })
            }
          )
        },
        cancel () {
          this.$emit('cancel')
        }
      },
      created() {
        this.getRoleList()
      }
    }
</script>

<style scoped>

</style>

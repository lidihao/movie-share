<template>
  <div>
    <Modal
      v-model="showModal"
      title="添加角色"
      @on-ok="submit"
      @on-cancel="cancel"
      :loading="loading">
      <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="150">
        <FormItem label="角色名" prop="roleName">
          <Input v-model="formValidate.roleName" placeholder="角色名" :disabled="type==='edit'"></Input>
        </FormItem>
        <FormItem label="角色描述" prop="roleDes">
          <Input v-model="formValidate.roleDes" placeholder="角色描述"></Input>
        </FormItem>
      </Form>
    </Modal>
  </div>
</template>

<script>
    import md5 from "js-md5";
    import RoleApi from '@/api/role-api'
    export default {
      name: "add-role",
      props: {
        showEdit: {
          default: false
        },
        item: {
          default: {}
        },
        type: {
          default: 'add'
        }
      },
      data() {
        return {
          showModal: false,
          loading: false,
          formValidate: {
            roleName: '',
            roleDes: ''
          },
          ruleValidate: {
            roleName: [
              {required: true, message: '角色名不能为空', trigger: 'blur'}
            ],
            roleDes: [
              {required: true, message: '角色描述不能为空', trigger: 'blur'}
            ]
          }
        }
      },
      watch: {
        // 这里只能用function函数，不能用箭头函数
        showEdit() {
          this.showModal = this.showEdit
        },
        item() {
          if (this.type === 'edit') {
            this.initData()
          }
        }
      }
      ,
      methods: {
        cancel() {
          this.$emit('cancel')
        },
        submit() {
          this.$refs.formValidate.validate(valid => {
              if (!valid) {
                this.loading = false
                this.$nextTick(() => {
                  this.loading = true
                })
                return
              } else {
                if (this.type==='add'){
                  this.addRole()
                }
                if (this.type==='edit'){
                  this.updateRole()
                }
              }
            }
          )
        },
        initData() {
          this.formValidate = {
            roleName: this.item.roleName,
            roleDes: this.item.roleDes
          }
        },
        addRole(){
          RoleApi.addRole(this.formValidate).then(res=>{
            if (res.code===200){
              this.$Message.success("添加角色成功")
              this.$emit('success')
            }else{
              this.$Message.warning(res.message)
            }
          })
        },
        updateRole(){
          let data={
            roleId:this.item.roleId,
            roleDes:this.formValidate.roleDes
          }
          RoleApi.updateRole(data).then(res=>{
            if (res.code===200){
              this.$Message.success("更新角色成功")
              this.$emit('success')
            }else{
              this.$Message.warning(res.message)
            }
          })
        }
      },
      created() {

      }
    }
</script>

<style scoped>

</style>

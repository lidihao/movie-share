<template>
  <Modal
    v-model="showModal"
    title="更改注册邮箱"
    @on-ok="handleChangeEmail"
    @on-cancel="cancel">
    <Form ref="formValidate" :model="changeEmailForm" :rules="ruleValidate" :label-width="80">
      <FormItem label="邮箱" prop="newEmail">
        <Input v-model="changeEmailForm.newEmail" placeholder="邮箱"></Input>
      </FormItem>
    </Form>
  </Modal>
</template>

<script>
    import md5 from "js-md5";
    import LoginAction from '@/api/login'
    export default {
        name: "change-email",
      data(){
          return{
            changeEmailForm:{
              newEmail:''
            },
            showModal:false,
            loading:false,
            ruleValidate:{
              newEmail: [
                { required: true, message: '邮箱不能为空', trigger: 'blur' },
                { type: 'email', message: '邮箱格式不正确', trigger: 'blur' }
              ]
            }
          }
      },
      props:{
        showChangeEmail:{
          default:false
        }
      },
      watch:{
        // 这里只能用function函数，不能用箭头函数
        showChangeEmail:function (){
          this.showModal=this.showChangeEmail
        }
      },
      methods:{
          cancel(){
            this.$emit('cancel')
          },
        handleChangeEmail(){
          this.$refs.formValidate.validate((valid)=>{
            if (!valid) {
              this.loading = false
              this.$nextTick(() => {
                this.loading = true
              })
              return
            }else {
              let data = {
                newEmail:this.changeEmailForm.newEmail
              }
              LoginAction.sendChangeEmail(data).then((res)=>{
                if (res.code===200){
                  this.$Message.success("成功发送更改邮箱邮件，请前往邮箱进行激活")
                  this.$emit('success')
                }else{
                  this.$Message.warning(res.message)
                }
              })
              this.loading = false
              this.$nextTick(() => {
                this.loading = true
              })
            }
          }
          )
        }
      }
    }
</script>

<style scoped>

</style>

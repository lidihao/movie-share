<template>
  <Modal
    v-model="showModal"
    title="更改密码"
    @on-ok="handleChangePwd"
    @on-cancel="cancel">
    <Form ref="formValidate" :model="changePasswordForm" :rules="ruleValidate" :label-width="80">
      <FormItem label="旧密码" prop="oldPassword">
        <Input type="password" v-model="changePasswordForm.oldPassword" placeholder="输入密码">
          <Icon type="ios-lock-outline" slot="prepend"></Icon>
        </Input>
      </FormItem>
      <FormItem label="新密码" prop="newPassword">
        <Input type="password" v-model="changePasswordForm.newPassword" placeholder="输入密码">
          <Icon type="ios-lock-outline" slot="prepend"></Icon>
        </Input>
      </FormItem>
      <FormItem label="确认密码" prop="confirmPassword">
        <Input type="password" v-model="changePasswordForm.confirmPassword" placeholder="输入密码">
          <Icon type="ios-lock-outline" slot="prepend"></Icon>
        </Input>
      </FormItem>
      <FormItem label="验证码" prop="validCode">
        <Input v-model="changePasswordForm.validCode" placeholder="验证码" style="width: 63%" @on-focus="getCode">
        </Input>
        <div class="login-code">
          <img :src="codeUrl" @click="getCode">
        </div>
      </FormItem>
    </Form>
  </Modal>
</template>

<script>
  import LoginAction from '@/api/login'
  import md5 from 'js-md5'
    export default {
        name: "change-password",
      data(){
          return {
            changePassword:true,
            changePasswordForm:{
              uuid:'',
              oldPassword:'',
              newPassword:'',
              confirmPassword:'',
              validCode:''
            },
            ruleValidate:{
              oldPassword: [
                { required: true, message: '密码不能为空', trigger: 'blur' },
                { min: 6, max: 20, message: '请输入6-20位字符', trigger: 'blur' },
              ],
              newPassword: [
                { required: true, message: '密码不能为空', trigger: 'blur' },
                { min: 6, max: 20, message: '请输入6-20位字符', trigger: 'blur' },
                { validator: this.validatePass, trigger: 'blur' }
              ],
              confirmPassword: [
                { required: true, message: '密码不能为空', trigger: 'blur' },
                { validator: this.validateConfirmPass, trigger: 'blur', required: true }
              ],
              validCode: [
                { required: true, message: '验证码不能为空', trigger: 'blur' }
                ]
            },
            codeUrl:'',
            showModal:false,
            loading:false
          }
      },
      props:{
        showChangePwd:{
          default:false
        }
      },
      watch:{
        // 这里只能用function函数，不能用箭头函数
        showChangePwd:function (){
          if (this.showChangePwd) {
            this.getCode()
          }
          this.showModal=this.showChangePwd
        }
      },
      methods:{
        getCode(){
          LoginAction.getCodeImg().then((res)=>{
              let data = res.result
              this.codeUrl = data.img
              this.changePasswordForm.uuid = data.uuid
            }
          )
        },
        cancel(){
          this.$emit('cancel')
        },
        // 验证密码
        validatePass(rule, value, callback){
          if (value === '') {
            callback(new Error('请输入密码'));
          } else {
            if (this.changePasswordForm.confirmPassword !== '') {
              this.$refs.formValidate.validateField('confirmPassword');
            }
            callback();
          }
        },
        // 验证密码
        validateConfirmPass(rule, value, callback){
          if (value === '') {
            callback(new Error('请再次输入密码'));
          } else if (value !== this.changePasswordForm.newPassword) {
            callback(new Error('两次输入密码不一致!'));
          } else {
            callback();
          }
        },
        handleChangePwd(){
          this.$refs.formValidate.validate((valid)=>{
              if (!valid) {
                this.loading = false
                this.$nextTick(() => {
                  this.loading = true
                })
                return
              }else {
                let data = {
                  oldPassword:md5(this.changePasswordForm.oldPassword),
                  newPassword:md5(this.changePasswordForm.newPassword),
                  validCode:this.changePasswordForm.validCode,
                  uuid:this.changePasswordForm.uuid
                }
                LoginAction.changePassword(data).then((res)=>{
                  if (res.code===200){
                    this.$Message.success("更改密码成功")
                    this.$store.dispatch('LogOut').then(() => {
                      this.$router.push({
                        path: '/home'
                      })
                    }).then(()=>{
                      location.reload()
                    })
                  }else{
                    this.$Message.warning(res.message)
                  }
                })
                this.$emit('success')
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
  .login-code {
    width: 33%;
    display: inline-block;
    height: 38px;
    float: right;
  }
  .login-code img{
    cursor: pointer;
    vertical-align:middle
  }
</style>

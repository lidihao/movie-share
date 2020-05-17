<template>
  <div>
    <div>
      <Modal
        v-model="showModal"
        :title="title"
        @on-ok="this.submit"
        @on-cancel="this.cancel"
        :closable="false"
        :mask-closable="false"
        :loading="loading">
        <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80" v-if="!showForgetPassword">
          <FormItem label="用户名" prop="username">
            <Input v-model="formValidate.username" placeholder="用户名"></Input>
          </FormItem>
          <FormItem label="密码" prop="password">
            <Input type="password" v-model="formValidate.password" placeholder="输入密码">
              <Icon type="ios-lock-outline" slot="prepend"></Icon>
            </Input>
          </FormItem>
          <FormItem label="验证码" prop="validCode">
            <Input v-model="formValidate.validCode" placeholder="验证码" style="width: 63%" @on-focus="getCode">
            </Input>
            <div class="login-code">
              <img :src="codeUrl" @click="getCode">
            </div>
          </FormItem>
          <FormItem>
            <Checkbox v-model="formValidate.rememberMe">记住我</Checkbox>
            <a style="float: right; margin-right: 150px" @click="changeForm">忘记密码?</a>
          </FormItem>
        </Form>

        <Form ref="forgetPassword" :model="forgetPassword" :rules="forgetPasswordRule"
         :label-width="80" v-if="showForgetPassword">
          <FormItem label="邮箱" prop="email">
            <Input v-model="forgetPassword.email" placeholder="邮箱"></Input>
          </FormItem>
          <FormItem>
             <a @click="changeForm">切换回登录</a>
          </FormItem>
        </Form>

      </Modal>
    </div>
  </div>
</template>

<script>
  import LoginAction from '@/api/login'
  import Config from '@/settings'
  import Cookies from 'js-cookie'
  export default {
    name: "login",
    props:{
      showLogin:{
        default:false
      }
    },
    data(){
      return {
        loading:true,
        showModal:false,
        codeUrl:'',
        title:'登录',
        showForgetPassword:false,
        formValidate: {
          username: '',
          password: '',
          validCode: '',
          uuid:'',
          rememberMe:false
        },
        forgetPassword:{
          mail:''
        },
        ruleValidate: {
          username: [
            { required: true, message: '用户名不能为空', trigger: 'blur' }
          ],
          password: [
            { required: true, message: '密码不能为空', trigger: 'blur' }
          ],
          validCode: [
            { required: true, message: '验证码不能为空', trigger: 'blur' }
          ]
        },
        forgetPasswordRule:{
          email: [
            { required: true, message: '邮箱不能为空' ,trigger:'blur'},
            { type: 'email', message: '邮箱格式不正确' }
          ]
        }
      }
    },
    methods: {
      getCode(){
        LoginAction.getCodeImg().then((res)=>{
          let data = res.result
          this.codeUrl = data.img
          this.formValidate.uuid = data.uuid
        }
        )
      },
      changeForm(){
        this.showForgetPassword=!this.showForgetPassword
        if (this.showForgetPassword) {
          this.title="找回密码"
        }else{
          this.title="登录"
        }
      },
      getCookie() {
        const username = Cookies.get('username')
        let password = Cookies.get('password')
        const rememberMe = Cookies.get('rememberMe')
        // 保存cookie里面的加密后的密码
        password = password === undefined? '': password
        this.formValidate = {
          username: username === undefined ? '': username,
          password: password,
          rememberMe: rememberMe === undefined ? false : Boolean(rememberMe),
          code: ''
        }
      },
      submit(){
        if (this.showForgetPassword) {
          this.resetPassword()

        }else{
          this.loginAction()
        }
      },
      loginAction(){
          this.$refs.formValidate.validate((valid => {
          if (valid){
            let user = this.formValidate
            if (user.rememberMe) {
              Cookies.set('username', user.username, { expires: Config.passCookieExpires })
              Cookies.set('password', user.password, { expires: Config.passCookieExpires })
              Cookies.set('rememberMe', user.rememberMe, { expires: Config.passCookieExpires })
            } else {
              Cookies.remove('username')
              Cookies.remove('password')
              Cookies.remove('rememberMe')
            }
            this.$store.dispatch('Login', user).then(() => {
              this.$Message.success("登录成功")
              location.reload()
              this.$emit("success")
            }).catch((error) => {
              console.log(error)
              this.$Message.warning("登录失败:"+error.message)
              this.getCode()
            })
          }
          this.loading = false
          this.$nextTick(() => {
            this.loading = true
          })
        }))
      },
      resetPassword(){
        this.$refs.forgetPassword.validate((valid=>{
          if (valid) {
            LoginAction.sendResetPasswordEmail(this.forgetPassword).then(res=>{
              if (res.code===200) {
                this.$Message.success("请前往邮箱重置密码")
                this.$emit("success")
              }else{
                this.$Message.error(res.message)
              }
            })
          }
          this.loading = false
          this.$nextTick(() => {
            this.loading = true
          })
        }))
      },
      cancel () {
        this.$emit('cancel')
      }
    },
    watch:{
      // 这里只能用function函数，不能用箭头函数
      showLogin:function (){
        if (this.showLogin) {
          this.getCode()
        }
        this.showModal=this.showLogin
      }
    },
    created() {
      this.getCookie()
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

<template>
  <div>
    <div>
      <Modal
        v-model="showModal"
        title="登录"
        @on-ok="this.submit"
        @on-cancel="this.cancel"
        :closable="false"
        :mask-closable="false"
        :loading="loading">
        <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
          <FormItem label="用户名" prop="username">
            <Input v-model="formValidate.username" placeholder="用户名"></Input>
          </FormItem>
          <FormItem label="密码" prop="password">
            <Input type="password" v-model="formValidate.password" placeholder="输入密码">
              <Icon type="ios-lock-outline" slot="prepend"></Icon>
            </Input>
          </FormItem>
          <FormItem label="验证码" prop="validCode">
            <Input v-model="formValidate.validCode" placeholder="验证码" style="width: 63%">
            </Input>
            <div class="login-code">
              <img :src="codeUrl" @click="getCode">
            </div>
          </FormItem>
          <FormItem>
            <Checkbox v-model="formValidate.rememberMe">记住我</Checkbox>
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
        formValidate: {
          username: '',
          password: '',
          validCode: '',
          uuid:'',
          rememberMe:false
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
      submit(){
        this.$refs.formValidate.validate((valid => {
          if (valid){
            let user = this.formValidate
            if (user.rememberMe) {
              Cookies.set('userName', user.userName, { expires: Config.passCookieExpires })
              Cookies.set('password', user.password, { expires: Config.passCookieExpires })
              Cookies.set('rememberMe', user.rememberMe, { expires: Config.passCookieExpires })
            } else {
              Cookies.remove('userName')
              Cookies.remove('password')
              Cookies.remove('rememberMe')
            }
            this.$store.dispatch('Login', user).then(() => {
              this.$Message.success("登录成功")
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
      cancel () {
        this.$emit('cancel')
      }
    },
    watch:{
      // 这里只能用function函数，不能用箭头函数
      showLogin:function (){
        this.showModal=this.showLogin
      }
    },
    created() {
      this.getCode()
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

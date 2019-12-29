<template>
  <div>
    <div>
      <Modal
        v-model="showModal"
        title="登录"
        @on-ok="submit"
        @on-cancel="cancel"
        :closable="false"
        :mask-closable="false"
        :loading="loading">
        <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
          <FormItem label="用户名" prop="username">
            <Input v-model="formValidate.username" placeholder="用户名"></Input>
          </FormItem>
          <FormItem label="邮箱" prop="email">
            <Input v-model="formValidate.email" placeholder="邮箱"></Input>
          </FormItem>
          <FormItem label="密码" prop="password">
            <Input type="password" v-model="formValidate.password" placeholder="输入密码">
              <Icon type="ios-lock-outline" slot="prepend"></Icon>
            </Input>
          </FormItem>
          <FormItem label="确认密码" prop="confirmPassword">
            <Input type="password" v-model="formValidate.confirmPassword" placeholder="再次确认密码">
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
        </Form>
      </Modal>
    </div>
  </div>
</template>

<script>
  import LoginAction from '@/api/login'
  import md5 from 'js-md5'
  export default {
    name: "register",
    props:{
      showRegister:{
        default:false
      }
    },
    data () {
      return {
        loading:true,
        showModal:false,
        codeUrl:'',
        formValidate: {
          username: '',
          email: '',
          password: '',
          confirmPassword: '',
          validCode:'',
          uuid: ''
        },
        ruleValidate: {
          username: [
            { required: true, message: '用户名不能为空', trigger: 'blur' }
          ],
          email: [
            { required: true, message: '邮箱不能为空', trigger: 'blur' },
            { type: 'email', message: '邮箱格式不正确', trigger: 'blur' }
          ],
          password: [
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
        }
      }
    },
    methods: {
      // 获取验证码
      getCode(){
        LoginAction.getCodeImg().then((res)=>{
              let data = res.result
              this.codeUrl = data.img
              this.formValidate.uuid = data.uuid
            }
        )
      },
      // 验证密码
      validatePass(rule, value, callback){
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          if (this.formValidate.confirmPassword !== '') {
            this.$refs.formValidate.validateField('confirmPassword');
          }
          callback();
        }
      },
      // 验证密码
      validateConfirmPass(rule, value, callback){
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.formValidate.password) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      },
      submit(){
        this.$refs.formValidate.validate((valid) => {
          if (!valid) {
            this.loading = false
            this.$nextTick(() => {
              this.loading = true
            })
            return
          } else {
            let user = {
              userName:this.formValidate.username,
              password:md5(this.formValidate.password),
              email:this.formValidate.email,
              validCode:this.formValidate.validCode,
              uuid:this.formValidate.uuid
            }
            LoginAction.register(user).then((res)=>{
              if (res.code===200){
                this.$Message.success("注册成功，请到邮箱激活用户")
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
        })
      },
      cancel(){
        this.$emit('cancel')
      }
    },
    watch:{
      // 这里只能用function函数，不能用箭头函数
      showRegister:function (){
        this.showModal=this.showRegister
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

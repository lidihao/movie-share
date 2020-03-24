<template>
  <div>
    <h1 style="margin-left: 100px;margin-bottom: 30px">重置密码</h1>
    <div style="width: 400px;">
      <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="100">
          <FormItem label="密码" prop="password">
            <Input type="password" v-model="formValidate.password" placeholder="输入密码">
              <Icon type="ios-lock-outline" slot="prepend"></Icon>
            </Input>
          </FormItem>
          <FormItem label="重新输入密码" prop="confirmPassword">
            <Input type="password" v-model="formValidate.confirmPassword" placeholder="输入密码">
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
            <Button type="primary" @click="resetPassword">提交</Button>
          </FormItem>
        </Form>
    </div>
  </div>
</template>
<script>
  import LoginAction from '@/api/login'
  import md5 from 'js-md5'
  export default{
    name:'resetPassword',
    data(){
      return{
        formValidate:{
          password:'',
          confirmPassword:'',
          validCode:'',
          uuid:''
        },
        token:'',
        codeUrl:'',
        ruleValidate:{
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
    methods:{
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
      resetPassword(){
        let data={
          password:md5(this.formValidate.password),
          uuid:this.formValidate.uuid,
          code:this.formValidate.validCode,
          token:this.token
        }
        LoginAction.resetPassword(data).then((res)=>{
          if (res.code===200) {
            this.$Message.success("重置密码成功,请重新登录")
            this.formValidate={}
          }else{
            this.$Message.error(res.message)
          }
        })
      }
    },
    created(){
      this.getCode()
      this.token=this.$route.query.token
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

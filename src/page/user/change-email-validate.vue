<template>
    <div>
      <div v-if="validate" class="success">
        <h1>邮箱激活成功</h1>
      </div>
      <div v-if="fail" class="fail">
        <h1 class="fail-header">邮箱激活失败:{{msg}}</h1>
      </div>
    </div>
</template>

<script>
  import LoginApi from '@/api/login'
  export default {
    name: "change-email-validate",
    data(){
      return {
        validate:false,
        fail:false,
        userName:'',
        token:'',
        msg:'激活超时'
      }
    },
    methods:{
      init () {
        let query = this.$route.query
        this.token = query.token
      },
      activeEmail(){
        let data={
          token:this.token
        }
        LoginApi.doChangeEmail(data).then((res)=>{
          if (res.code===200){
            this.validate=true
          }else {
            this.$Message.error(res.message)
            this.fail=true
          }
        })
      }
    },
    created() {
      this.init()
      this.activeEmail()
    }
  }
</script>

<style scoped>
  .success{
    text-align: center;
    margin: auto;
    padding-top: 20%;
  }
  .fail-header{
    margin: 50px;
  }
  .fail{
    text-align: center;
    margin: auto;
    padding-top: 20%;
  }
</style>

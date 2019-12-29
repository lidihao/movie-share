<template>
    <div>
      <div v-if="validate" class="success">
        <h1>用户激活成功,可以登录系统</h1>
      </div>
      <div v-else class="fail">
        <h1 class="fail-header">用户验证失败:{{msg}}</h1>
        <Button type="primary">重新发送验证邮箱</Button>
      </div>
    </div>
</template>

<script>
  export default {
    name: "email-validate",
    data(){
      return {
        validate:false,
        userName:'',
        token:'',
        msg:'激活超时'
      }
    },
    methods:{
      init () {
        let query = this.$route.query
        console.log(query)
        this.userName = query.userName
        this.token = query.token
      },
      activeUser(){

      }
    },
    created() {
      this.init()
      this.activeUser()
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

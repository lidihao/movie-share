<template>
  <div>
    <div class="search">
      <Row>
        <i-col span="5">
          <i-input class="search" placeholder="输入关键字搜索">
            <i-button slot="append" icon="ios-search"></i-button>
          </i-input>
        </i-col>
        <i-col span="5" offset="5">
          <i-select>
            <i-option v-for="item in cityList" :value="item.value">{{ item.label }}</i-option>
          </i-select>
        </i-col>
      </Row>
    </div>
    <div class="grid-content">
      <div class="user-item" v-for="item in count">
        <UserCard></UserCard>
      </div>
      <div class="page">
        <Page :total="100" show-total></Page>
      </div>
    </div>
  </div>
</template>

<script>
  import UserCard from './user-card'
  export default {
    name: "user-card-grid",
    data(){
      return{
        count:10
      }
    },
    components:{
      UserCard
    }
  }
</script>

<style scoped>
  .user-item{
    display: inline-block;
    margin: 40px;
  }
  .search{
    margin-left: 20px;
  }
</style>

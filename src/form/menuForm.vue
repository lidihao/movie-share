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
          <FormItem label="菜单名称" prop="menuName">
            <Input v-model="formValidate.menuName" placeholder="菜单名称"></Input>
          </FormItem>
          <FormItem label="英文名称" prop="menuEng">
            <Input v-model="formValidate.menuEng" placeholder="英文名称"></Input>
          </FormItem>

          <FormItem label="菜单描述" prop="menuDes">
            <Input v-model="formValidate.menuDes" placeholder="菜单描述"></Input>
          </FormItem>
          <FormItem label="菜单url" prop="menuUrl">
            <Input v-model="formValidate.menuUrl" placeholder="菜单url"></Input>
          </FormItem>
          <FormItem label="排序" prop="sort">
            <InputNumber v-model="formValidate.sort" placeholder="排序"></InputNumber>
          </FormItem>
          <FormItem label="上级目录" prop="parentMenuId">
            <TreeSelect :options="options" v-model="formValidate.parentMenuId" style="width: 40%"></TreeSelect>
          </FormItem>
        </Form>
      </Modal>
    </div>
  </div>
</template>

<script>
  import MenuApi from '@/api/menu-api'
  import TreeSelect from '@riophae/vue-treeselect'
  import '@riophae/vue-treeselect/dist/vue-treeselect.css'


  export default {
    name: "login",
    props:{
      showLogin:{
        default:false
      },
      options:{
        default:[]
      },
      item:{
        default:[]
      },
      type:{
        default:'edit'
      }
    },
    components:{TreeSelect},
    data(){
      return {
        loading:true,
        showModal:false,
        codeUrl:'',
        formValidate: {
          menuName: '',
          menuEng: '',
          menuDes: '',
          menuUrl:'',
          sort:0,
          parentMenuId:0
        },
        ruleValidate: {
          parentMenuId: [
            { required: true, message: '不能为空' }
          ],
          menuName: [
            { required: true, message: '不能为空', trigger: 'blur' }
          ],
          menuEng: [
            { required: true, message: '不能为空', trigger: 'blur' }
          ],
          menuDes: [
            { required: true, message: '不能为空', trigger: 'blur' }
          ],
          menuUrl: [
            { required: false, message: '不能为空' }
          ],
          sort: [
            { required: true, message: '不能为空' }
          ],
        }
      }
    },
    methods: {
      initData(){
        this.formValidate.parentMenuId=this.item.parentMenuId
        this.formValidate.menuDes=this.item.menuDes
        this.formValidate.menuEng=this.item.menuEng
        this.formValidate.menuName=this.item.menuName
        this.formValidate.menuUrl=this.item.menuUrl
        this.formValidate.sort = this.item.sort
      },
      submit(){
        this.$refs.formValidate.validate((valid => {
          if (valid){
            if (this.type==='add'){
              this.saveMenu()
            }
            if (this.type==='edit'){
              this.update(this.item)
            }
          }
          this.loading = false
          this.$nextTick(() => {
            this.loading = true
          })
        }))
      },
      saveMenu(){
        let data=this.formValidate
        MenuApi.addMenu(data).then((res=>{
          if (res.code===200){
            this.$Message.success('success')
            this.$emit('success')
          }else {
            this.$Message.error(res.message)
          }
          this.formValidate={}
        }))
      },
      update(item){
        let data = {
          menuId:item.menuId,
          menuName:this.formValidate.menuName,
          menuEng:this.formValidate.menuEng,
          menuDes:this.formValidate.menuDes,
          sort:this.formValidate.sort,
          menuUrl:this.formValidate.menuUrl,
          parentMenuId:this.formValidate.parentMenuId
        }
        MenuApi.updateMenu(data).then((res)=>{
          if (res.code===200){
            this.$Message.success('success')
            this.$emit('success')
          }else {
            this.$Message.error(res.message)
          }
          this.formValidate={}
        })
      },
      cancel () {
        this.$emit('cancel')
      }
    },
    watch:{
      // 这里只能用function函数，不能用箭头函数
      showLogin:function (){
        this.showModal=this.showLogin
      },
      item(){
        if (this.type==='edit') {
          this.initData()
        }
      }
    },
    created() {
      if (this.type==='edit') {
        this.initData()
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


<template>
  <div>
    <div class="action">
      <Button type="primary" class="action-but" @click="handleAdd"><Icon type="md-add" size="15" />新增</Button>
    </div>
    <tree-grid
      :items='data'
      :columns='columns'
      @on-row-click='rowClick'
      @on-selection-change='selectionClick'
      @on-sort-change='sortClick'
    ></tree-grid>
    <MenuForm :item="editMenu" :options="this.treeSelectData" :showLogin="showLogin" @cancel="showLoginModalCancel" @success="loginSuccess"></MenuForm>
    <MenuForm type="add" :options="this.treeSelectData" :showLogin="showAdd" @cancel="showAddCancel" @success="showAddSuccess"></MenuForm>
  </div>
</template>
<script>
  import MenuForm from '@/form/menuForm'
  import MenuApi from '@/api/menu-api'
  import TreeGrid from '@/components/tree-grid'
  export default {
    data() {
      return {
        columns: [
          {
            title: '菜单名称',
            key: 'menuName',
            sortable: true,
            width: '150',
          }, {
            title: '英文名称',
            key: 'menuEng',
            width: '150',
          }, {
            title: '菜单描述',
            key: 'menuDes',
            width: '150',
          }, {
            title: '菜单url',
            key: 'menuUrl',
            width: '150',
          }, {
            title: '操作',
            type: 'action',
            actions: [{
              type: 'primary',
              text: '编辑'
            }, {
              type: 'error',
              text: '删除'
            }],
            width: '150',
          }],
        data: [],
        editMenu:{},
        treeSelectData:[],
        showLogin:false,
        showAdd:false
      }
    },
    components: {
      TreeGrid,
      MenuForm
    },
    methods: {
      rowClick(data, index, event,text) {
        if (text==='编辑'){
          this.editItem(data)
        }else if (text ==='删除'){
          this.deleteMenu(data)
        }
      },
      deleteMenu(data){
        let params={
          menuId:data.menuId
        }
        MenuApi.deleteMenu(params).then((res)=>{
          if (res.code===200){
            this.getMenuList()
            this.$Message.success('success')
          }else {
            this.$Message.error(res.message)
          }
        })
      },
      editItem(data){
        let params={
          menuId:data.menuId
        }
        MenuApi.getMenuDetail(params).then(res=>{
          if (res.code===200){
            this.editMenu=res.result
          }
        })
        this.showLogin=true
      },
      selectionClick(arr) {
        console.log(arr)
      },
      sortClick(key, type) {
        console.log('排序字段:' + key)
        console.log('排序规则:' + type)
      },
      getMenuList(){
        MenuApi.getAllMenuList().then((res)=>{
          if (res.code===200){
            this.data=res.result
            let root={
              id:0,
              label:'顶级目录',
              children:this.toTreeSelect(this.data)
            }
            this.treeSelectData=[root]
          }
        })
      },
      toTreeSelect(menuList){
        let treeSelectData=[]
        menuList.forEach((menu)=>{
          let item = {
            id:menu.menuId,
            label:menu.menuName,
            children:[]
          }
          if (menu.hasChild){
            item.children=this.toTreeSelect(menu.children)
          }else {
            delete item.children
          }
          treeSelectData.push(item)
        })
        return treeSelectData
      },
      showLoginModalCancel(){
        this.showLogin=false
      },
      loginSuccess(){
        this.showLogin=false
        this.getMenuList()
      },
      showAddCancel(){
        this.showAdd=false
      },
      showAddSuccess(){
        this.showAdd=false
        this.getMenuList()
      },
      handleAdd(){
        this.showAdd=true
      }
    },
    created() {
      this.getMenuList()
    }
  }
</script>
<style scoped>
  .action{
    margin: 40px 0;
    display: flex;
  }
  .action-but{
    margin-right: 20px;
  }
</style>

<template>
  <div>
    <div class="action">
      <Button type="primary" class="action-but" @click="handleAdd"><Icon type="md-add" size="15" />新增</Button>
    </div>
    <div class="main-content">
      <div class="table-content">
        <Card :bordered="false">
          <p slot="title">角色列表</p>
          <Table :columns="columns1" :data="roleList" :highlight-row="true" @on-current-change="roleColumChange">
            <template slot-scope="{ row, index }" slot="action">
              <Button type="primary" size="small" style="margin-right: 5px" @click="show(index)">编辑</Button>
              <Button type="error" size="small" @click="remove(index)">删除</Button>
            </template>
          </Table>
        </Card>
      </div>
      <div class="tree-content">
        <Card :bordered="true">
          <div slot="title" style="display: flex">
            <p>菜单分配</p>
            <Button type="primary" style="margin-left: 30px" @click="saveMenuTree" size="small" :disabled="disableSave"><Icon type="md-add" />save</Button>
          </div>
          <Tree :data="treeSelectData" show-checkbox multiple ref="menuTree"></Tree>
        </Card>
      </div>
    </div>
    <RoleAdd :showEdit="showAdd" @cancel="cancelAdd" @success="cancelAdd"></RoleAdd>
    <RoleAdd :showEdit="showEdit" type="edit" :item="roleItem" @cancel="cancelEdit" @success="cancelEdit"></RoleAdd>
  </div>
</template>

<script>
  import MenuApi from '@/api/menu-api'
  import RoleApi from '@/api/role-api'
  import RoleAdd from '@/form/add-role'
    export default {
      name: "role-manager",
      components:{
          RoleAdd
      },
      data () {
        return {
          columns1: [
            {
              title: '角色名称',
              key: 'roleName',
              width:150
            },
            {
              title: '角色描述',
              key: 'roleDes',
              width:150
            },
            {
              title: '创建时间',
              key: 'createdTime',
              width:150
            },
            {
              title: '更新时间',
              key:'updatedTime',
              width:150
            },
            {
              title: '操作',
              slot: 'action',
              width: 150,
              align: 'center',
              fixed: 'right'
            }
          ],
          roleList: [],
          treeSelectData: [],
          disableSave:true,
          curRoleMenuTree:[],
          roleId:-1,
          showAdd:false,
          roleItem:{},
          showEdit:false
        }
      },
      methods:{
        getMenuList(){
          MenuApi.getAllMenuList().then((res)=>{
            if (res.code===200){
              this.data=res.result
              let root={
                id:0,
                title:'顶级目录',
                expand: true,
                checked: false,
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
              title:menu.menuName,
              children:[],
              expand: false,
              checked: false,
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
        saveMenuTree(){
          this.updateMenuTree(this.roleId)
        },
        getRoleList(){
          RoleApi.getAllRoleList().then((res)=>{
            if (res.code===200){
              this.roleList=res.result
            }
          })
        },
        checkMenuTree(menuTree ,menuLeaf){
          menuTree.forEach((menuItem)=>{
            if (menuItem.id===menuLeaf.menuId){
              menuItem.checked =true
              return
            }else if (menuItem.children){
              this.checkMenuTree(menuItem.children,menuLeaf)
            }
          })
        },
        clearMenuCheck(){
          this.$refs.menuTree.getCheckedAndIndeterminateNodes().forEach(menuItem=>{
            menuItem.checked=false
            menuItem.indeterminate=false
          })
        },
        updateMenuTree(roleId){
          let checkMenu = this.$refs.menuTree.getCheckedAndIndeterminateNodes()
          let menuIdSet = []
          checkMenu.forEach(menuItem=>{
            if (menuItem.id!==0){
              menuIdSet.push(menuItem.id)
            }
          })

          let data={
            roleId:roleId,
            menuTree:menuIdSet
          }
          RoleApi.updateMenuTree(data).then((res)=>{
            if (res.code===200){
              this.$Message.success('success')
            }
          })
        },
        roleColumChange(curRow,oldCurRow){
          if (curRow){
            this.roleId = curRow.roleId
            this.disableSave=false
            RoleApi.getMenuTreeLeaf({roleId:curRow.roleId}).then((res)=>{
              if (res.code===200) {
                let menuLeaf = res.result
                this.clearMenuCheck()
                menuLeaf.forEach(leaf=>{
                  this.checkMenuTree(this.treeSelectData,leaf)
                })
              }
            })
          }
        },
        handleAdd(){
          this.showAdd=true
        },
        show(index){
          this.roleItem=this.roleList[index]
          this.showEdit=true
        },
        cancelEdit(){
          this.showEdit=false
        },
        cancelAdd(){
          this.showAdd=false
        },
        remove(index){
          let item = this.roleList[index]
          let data={
            roleId:item.roleId
          }
          RoleApi.deleteRole(data).then((res)=>{
            if (res.code===200){
              this.$Message.success('成功删除角色')
              this.getMenuList()
            }else {

            }
          })
        }
      },
      created() {
        this.getMenuList()
        this.getRoleList()
      }
    }
</script>

<style scoped>

  .action{
    margin: 40px 20px;
    display: flex;
  }
  .action-but{
    margin-right: 20px;
  }
  .table-content{
    width: 60%;
  }
  .main-content{
    display: flex;
  }
  .tree-content{
    margin-left: 30px;
  }
</style>

<template>
  <div>
    <div class="action">
      <Button type="primary" class="action-but" @click="handleAdd"><Icon type="md-add" size="15" />新增</Button>
    </div>
    <div class="table-content">
      <Table :columns="columns" :data="taskList">
        <template slot-scope="{ row, index }" slot="action">
              <Button type="primary" size="small" style="margin-right: 5px" @click="show(row,index)">查看</Button>
              <Button type="info" size="small" @click="startTask(row,index)">调度</Button>
              <Button type="success" size="small" @click="stopTask(row,index)">停止</Button>
              <Button type="error" size="small" @click="removeTask(row,index)">删除</Button>
            </template>
      </Table>
    </div>
    <AddTask :showAdd="showAddTask" type="add" @success="addTaskSuccess" @cancel="addTaskCancel"></AddTask>
    <AddTask :showAdd="showAddEdit" :item="task" @success="editTaskSuccess" @cancel="editTaskCancel"></AddTask>
  </div>
</template>

<script>
  import TaskManagerApi from '@/api/task-manager'
  import AddTask from '@/form/add-task'
    export default {
        name: "task-manager",
        components:{AddTask},
        data(){
          return {
            showAddTask:false,
            showAddEdit:false,
            task:{},
            columns:[
              {
                title: '任务名',
                key: 'systemTaskName',
                width: '100',
              },
              {
                title: '任务类型',
                key: 'systemTaskType',
                width: '100',
              },
              {
                title: '任务英文名',
                key: 'jobName',
                width: '100',
              },
              {
                title: '任务组英文名',
                key: 'jobGroupName',
                width: '130',
              },
              {
                title:'类名',
                key:'className',
                width: '150',
              },
              {
                title:'任务状态',
                key:'jobStatus',
                width: '150'
              },
              {
                title:'cron表达式',
                key:'cron',
                width: '100'
              },
              {
                title:'触发器名',
                key:'triggerName',
                width: '100'
              },
              {
                title:'触发器组名',
                key:'triggerGroupName',
                width: '100'
              },
              {
                title:'描述',
                key:'systemTaskDesc',
                width: '100'
              },
              {
                title:'参数',
                key:'params',
                width: '100'
              },
              {
                title:'创建时间',
                key:'createdTime',
                width: '100'
              },
              {
                title: '操作',
                slot: 'action',
                width: 250,
                align: 'center',
                fixed: 'right'
            }
            ],
            taskList:[]
          }
        },
        methods:{
          getTaskList(){
            TaskManagerApi.listTask().then(res=>{
              if (res.code===200) {
                this.taskList = res.result
              }
            })
          },
          handleAdd(){
            this.showAddTask=true
          },
          addTaskSuccess(){
            this.showAddTask=false
          },
          addTaskCancel(){
            this.showAddTask=false
          },
          editTaskSuccess(){
            this.showAddEdit=false
          },
          editTaskCancel(){
            this.showAddEdit=false
          },

          show(row,index){
            this.showAddEdit=true
            TaskManagerApi.getTask(row.systemTaskId).then((res)=>{
              if (res.code===200){
                this.task=res.result
                this.getTaskList()
              }
            })
          },
          startTask(row){
            TaskManagerApi.startTask(row.systemTaskId).then((res)=>{
              if (res.code===200){
                this.$Message.success('success')
                this.getTaskList()
              }
            })
          },
          stopTask(row){
            TaskManagerApi.stopTask(row.systemTaskId).then((res)=>{
              if (res.code===200){
                this.$Message.success('success')
                this.getTaskList()
              }
            })
          },
          removeTask(row){
            TaskManagerApi.deleteTask(row.systemTaskId).then((res)=>{
              if (res.code===200){
                this.$Message.success('success')
                this.getTaskList()
              }
            })
          }
        },
        created() {
          this.getTaskList()
        }
    }
</script>

<style scoped>
  .table-content{
    margin-top: 20px;
  }
</style>

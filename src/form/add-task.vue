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
          <FormItem label="任务名" prop="systemTaskName" style="width:230px">
            <Input v-model="formValidate.systemTaskName" placeholder="任务名" :disabled="type==='edit'"></Input>
          </FormItem>
          <FormItem label="任务类型" prop="systemTaskType">
            <Select v-model="formValidate.systemTaskType" style="width:150px" :disabled="type==='edit'">
              <Option value="java_task" key="java_task">java_task</Option>
            </Select>
          </FormItem>
          <FormItem label="英文名" prop="jobName" style="width:250px">
            <Input v-model="formValidate.jobName" placeholder="任务英文名" :disabled="type==='edit'"></Input>
          </FormItem>
          <FormItem label="任务组名" prop="jobGroupName" style="width:250px">
            <Input v-model="formValidate.jobGroupName" placeholder="任务组英文名" :disabled="type==='edit'"></Input>
          </FormItem>
          <FormItem label="类名" prop="className" style="width:250px">
            <Input v-model="formValidate.className" placeholder="类名" :disabled="type==='edit'"></Input>
          </FormItem>
          <FormItem label="触发器名" prop="triggerName" style="width:250px">
            <Input v-model="formValidate.triggerName" placeholder="触发器名" :disabled="type==='edit'"></Input>
          </FormItem>
          <FormItem label="触发器组" prop="triggerGroupName" style="width:250px">
            <Input v-model="formValidate.triggerGroupName" placeholder="触发器组名" :disabled="type==='edit'"></Input>
          </FormItem>
          <FormItem label="cron" prop="cron" style="width:250px" >
            <Input v-model="formValidate.cron" placeholder="cron表达式"></Input>
          </FormItem>
          <FormItem label="描述" prop="systemTaskDesc">
            <Input v-model="formValidate.systemTaskDesc" placeholder="描述" type="textarea"></Input>
          </FormItem>
          <FormItem label="参数" prop="params">
            <Input v-model="formValidate.params" placeholder="参数" type="textarea"></Input>
          </FormItem>
        </Form>
      </Modal>
    </div>
  </div>
</template>

<script>
  import TaskApi from '@/api/task-manager'


  export default {
    name: "login",
    props:{
      showAdd:{
        default:false
      },
      item:{
        required:false
      },
      type:{
        default:'edit'
      }
    },
    components:{},
    data(){
      return {
        loading:true,
        showModal:false,
        codeUrl:'',
        formValidate: {
          systemTaskName: '',
          systemTaskType: '',
          cron:'',
          jobName: '',
          jobGroupName:'',
          className:'',
          triggerName:'',
          triggerGroupName:'',
          systemTaskDesc:'',
          parmas:''
        },
        ruleValidate: {
          systemTaskName: [
            { required: true, message: '不能为空' }
          ],
          systemTaskType: [
            { required: true, message: '不能为空', trigger: 'blur' }
          ],
          cron: [
            { required: true, message: '不能为空', trigger: 'blur' }
          ],
          jobName: [
            { required: true, message: '不能为空', trigger: 'blur' }
          ],
          jobGroupName: [
            { required: true, message: '不能为空' }
          ],
          className: [
            { required: true, message: '不能为空' }
          ],
          triggerName: [
            { required: true, message: '不能为空' }
          ],
         triggerGroupName: [
            { required: true, message: '不能为空' }
          ],

        }
      }
    },
    methods: {
      submit(){
        this.$refs.formValidate.validate((valid => {
          if (valid){
            if (this.type==='add'){
              this.addTask()
            }
            if (this.type==='edit'){
              this.updateTask(this.item)
            }
          }
          this.loading = false
          this.$nextTick(() => {
            this.loading = true
          })
        }))
      },
      addTask(){
        TaskApi.addTask(this.formValidate).then((res)=>{
          if (res.code===200){
            this.$Message.success('success');
            this.$emit('success')
          }else {
            this.$Message.error(res.message)
          }
        })
      },
      updateTask(){

      },
      initData(){
        this.formValidate=this.item
      },
      cancel () {
        this.$emit('cancel')
      }
    },
    watch:{
      // 这里只能用function函数，不能用箭头函数
      showAdd(){
        this.showModal=this.showAdd
      },
      item(){
        if (this.type==='edit'){
          this.initData()
        }
      }
    },
    created() {
      if (this.type==='edit'){
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

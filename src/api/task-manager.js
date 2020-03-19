import { Service } from '../service'
import {config, jsonConfig } from './axiosConfig'



let service = new Service(config)

export default{
	listTask(){
		return service.get(`/task/listTask`)
	},
  addTask(data){
	  return service.post(`/task/addTask`,data,jsonConfig)
  },
  getTask(taskId){
	  return service.get(`/task/edit/${taskId}`)
  },
  stopTask(taskId){
	  return service.post(`/task/stopTask/${taskId}`)
  },
  startTask(taskId){
	  return service.post(`/task/scheduleTask/${taskId}`)
  },
  deleteTask(taskId){
	  return service.post(`/task/deleteTask/${taskId}`)
  }
}

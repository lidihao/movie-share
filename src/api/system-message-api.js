import { Service } from '../service'
import {config, jsonConfig } from './axiosConfig'


let service = new Service(config)

export default {
    getMessageTypeList(){
      return service.get(`/systemMessage/getMessageType`)
    },
  getMessageList(params){
      return service.get('/systemMessage/list',params)
  }
}

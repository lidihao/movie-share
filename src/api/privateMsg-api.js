import { Service } from '../service'
import {config, jsonConfig } from './axiosConfig'



let service = new Service(config)

export default {
  getPrivateMsgUserList(params){
    return service.get(`/privateMsg/userList`,params)
  },
  getMessageList(params){
    return service.get(`/privateMsg/messageList`,params)
  },
  sendMessage(message){
    return service.post(`/privateMsg/sendMessage`,message,jsonConfig)
  },
  getUserItemDetail(parmas){
    return service.get(`/privateMsg/userItemDetail`,parmas)
  }
}

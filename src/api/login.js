import { Service } from '../service'
import {config, jsonConfig } from './axiosConfig'
import user from "../store/modules/user";


let service = new Service(config)

//获取验证码
export default {
  getCodeImg(){
    return service.get(`/auth/code`)
  },
  register(user){
    return service.post(`/auth/register`,user,jsonConfig)
  },
  loginSys(authUser){
    return service.post(`/auth/login`,authUser,jsonConfig)
  },
  getInfo(){
    return service.get(`/auth/userInfo`)
  },
  getMenuInfo(){
    return service.get(`/auth/menuTree`)
  },
  logout(){
    return service.post(`/auth/logout`,[],jsonConfig)
  },
  activeUser(data){
    return service.post(`/auth/user/active`,data)
  },
  getUserInfoById(params){
    return service.get(`/auth/getUserInfoById`,params)
  },

  updateAvatarUrl(data){
    return service.post(`/auth/updateUserAvatarUrl`,data)
  },
  searchUser(data){
    return service.get(`/auth/searchUser`,data)
  }
}

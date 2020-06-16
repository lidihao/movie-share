import { Service } from '../service'
import {config, jsonConfig } from './axiosConfig'


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
  },
  sendResetPasswordEmail(data){
    return service.post(`/auth/sendResetPasswordEmail`,data)
  },
  resetPassword(data){
    return service.post('/auth/resetPassword',data)
  },
  changePassword(data){
    return service.post(`/auth/changePwd`,data,jsonConfig)
  },
  sendChangeEmail(data){
    return service.post('/auth/sendChangeEmail',data)
  },
  doChangeEmail(data){
    return service.post(`/auth/doChangeEmail`,data)
  },
  searchUserForManager(data){
    return service.get(`/auth/userManager/searchUser`,data)
  },
  updateRoleList(data){
    return service.post(`/auth/userManager/updateRoleList`,data,jsonConfig)
  },
  createUserFromManager(data){
    return service.post(`/auth/userManager/addUser`,data,jsonConfig)
  }
}
